import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(SCRIPT_DIR, "..");

const HELP = [
  "office-to-markdown: convert a Word / PowerPoint / Excel / CSV file to clean Markdown.",
  "",
  "Wraps Microsoft's `markitdown` library via `uvx`. The script handles the",
  "deterministic conversion and writes a Markdown file with YAML frontmatter.",
  "Optional --summarize hands off to the host agent for an LLM summary step.",
  "",
  "Supported extensions: .docx .pptx .xlsx .csv",
  "",
  "Usage:",
  "  bun main.ts <input> [--out <dir>] [options]",
  "  bun main.ts --check",
  "  bun main.ts --help",
  "",
  "Options:",
  "  --out <dir>           output dir (default: ./office-to-markdown)",
  "  --summarize           after conversion, host agent applies prompts/summary.md",
  "  --prompt <path>       override prompts/summary.md (with --summarize)",
  "",
  "Output:",
  "  <out>/<parent-dir>/<slug>.md           extracted file + YAML frontmatter",
  "  <out>/<parent-dir>/<slug>.summary.md   only with --summarize (written by the agent)",
  "",
  "Exit codes:",
  "  0  success",
  "  1  tool / argument error (bad path, uv missing, unsupported extension)",
  "  2  conversion error (markitdown could not parse the file)",
  "",
  "Environment:",
  "  OFFICEMD_DATA_DIR     override default output root",
  "  MARKITDOWN_UVX        override the `uvx` binary path",
  "",
].join("\n");

interface Flags {
  positional: string[];
  out?: string;
  summarize?: boolean;
  prompt?: string;
  help?: boolean;
  check?: boolean;
}

function parseFlags(argv: string[]): Flags {
  const f: Flags = { positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--help":
      case "-h":
        f.help = true;
        break;
      case "--check":
        f.check = true;
        break;
      case "--out":
      case "-o":
        f.out = argv[++i];
        break;
      case "--summarize":
        f.summarize = true;
        break;
      case "--prompt":
        f.prompt = argv[++i];
        break;
      default:
        f.positional.push(a);
    }
  }
  return f;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function runCheck(): Promise<void> {
  const bun = (globalThis as { Bun?: { version: string } }).Bun;
  process.stdout.write("office-to-markdown check\n");
  process.stdout.write(`  skill dir:    ${SKILL_DIR}\n`);
  process.stdout.write(`  runtime:      ${bun ? `Bun ${bun.version}` : "non-Bun (this skill expects Bun)"}\n`);
  process.stdout.write(`  node version: ${process.version}\n`);

  const promptFiles = ["prompts/summary.md", "prompts/outline.md", "prompts/section.md"];
  for (const rel of promptFiles) {
    const exists = await fileExists(path.join(SKILL_DIR, rel));
    process.stdout.write(`  ${rel}: ${exists ? "ok" : "MISSING"}\n`);
    if (!exists) process.exitCode = 1;
  }

  const { findUvx, MARKITDOWN_VERSION } = await import("./markitdown.js");
  const uvx = await findUvx();
  if (uvx) {
    process.stdout.write(`  uvx:          ${uvx}\n`);
    process.stdout.write(`  markitdown:   pinned to ${MARKITDOWN_VERSION} (resolved on first run via uvx)\n`);
  } else {
    process.stdout.write("  uvx:          NOT FOUND — install uv (`pip install uv` or `brew install uv`)\n");
    process.exitCode = 1;
  }
  process.stdout.write("  supported:    .docx .pptx .xlsx .csv\n");
  process.stdout.write("  llm: handled by the host agent (no API key required for --summarize)\n");
}

async function runConvert(flags: Flags): Promise<void> {
  const input = flags.positional[0];
  if (!input) {
    process.stderr.write("Error: input file path is required (.docx / .pptx / .xlsx / .csv).\n");
    process.exit(1);
  }

  const absInput = path.resolve(input);
  if (!(await fileExists(absInput))) {
    process.stderr.write(`Error: input file not found: ${absInput}\n`);
    process.exit(1);
  }

  const { detectFormat, extrasForFormat } = await import("./output.js");
  const format = detectFormat(absInput);
  if (!format) {
    process.stderr.write(
      `Error: unsupported extension. Supported: .docx, .pptx, .xlsx, .csv. Got: ${path.extname(absInput) || "(no extension)"}\n`,
    );
    process.exit(1);
  }

  const { runMarkitdown, MarkitdownError } = await import("./markitdown.js");
  const {
    resolveOutDir,
    resolveOutPath,
    deriveSlug,
    deriveTitle,
    composeDocument,
    countWords,
    countSlides,
    countSheets,
  } = await import("./output.js");

  process.stderr.write(`Converting (${format}): ${absInput}\n`);

  let markdown: string;
  try {
    const run = await runMarkitdown({ input: absInput, extras: extrasForFormat(format) });
    markdown = run.markdown;
  } catch (err) {
    if (err instanceof MarkitdownError) {
      const code = err.category === "convert-failed" ? 2 : 1;
      process.stderr.write(`Error: ${err.message}\n`);
      if (err.stderr) process.stderr.write(err.stderr.endsWith("\n") ? err.stderr : `${err.stderr}\n`);
      process.exit(code);
    }
    throw err;
  }

  if (!markdown.trim()) {
    process.stderr.write("Error: markitdown produced no text. The file may be empty or corrupted.\n");
    process.exit(2);
  }

  const wordCount = countWords(markdown);
  const title = deriveTitle(absInput);
  const slug = deriveSlug(absInput);

  const outDir = resolveOutDir(flags.out);
  const outPath = await resolveOutPath(outDir, absInput, slug);
  await mkdir(path.dirname(outPath), { recursive: true });

  const document = composeDocument(
    {
      source: absInput,
      title,
      format,
      slide_count: format === "pptx" ? countSlides(markdown) : undefined,
      sheet_count: format === "xlsx" ? countSheets(markdown) : undefined,
      captured_at: new Date().toISOString(),
      word_count: wordCount,
    },
    markdown,
  );

  await writeFile(outPath, document, "utf-8");
  process.stderr.write(`Wrote ${outPath} (${wordCount} words, format=${format})\n`);
  if (flags.summarize) {
    process.stderr.write(
      "Note: --summarize is performed by the host agent (Claude Code / Codex) — see SKILL.md Step 2.\n" +
        "      The bare CLI cannot summarize; run this skill inside an agent session for the summary file.\n",
    );
  }
  process.stdout.write(`${outPath}\n`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const flags = parseFlags(argv);

  if (flags.help || argv.length === 0) {
    process.stdout.write(HELP);
    process.exit(flags.help ? 0 : 1);
  }
  if (flags.check) {
    await runCheck();
    return;
  }

  await runConvert(flags);
}

main().catch((err) => {
  const msg = err instanceof Error ? err.message : String(err);
  process.stderr.write(`Error: ${msg}\n`);
  process.exit(1);
});
