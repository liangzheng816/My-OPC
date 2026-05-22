import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(SCRIPT_DIR, "..");

const HELP = [
  "url-to-markdown: convert any URL to clean Markdown.",
  "",
  "Default mode is auto: try a fast plain-fetch first; if that fails (HTTP",
  "error, bot block, near-empty SPA shell, etc.) escalate to headless Chrome.",
  "Both paths feed the same Readability + Turndown extractor, so output",
  "quality is consistent regardless of source.",
  "",
  "Usage:",
  "  bun main.ts <url> [--out <dir>] [options]",
  "  bun main.ts --check",
  "  bun main.ts --help",
  "",
  "Modes:",
  "  (default)        auto: fetch first, escalate to Chrome on failure",
  "  --fetch-only     never launch Chrome; exit 2 if fetch is insufficient",
  "  --chrome         skip the fetch attempt; go straight to Chrome",
  "  --chrome --wait  Chrome opens visibly; press Enter to capture (login mode)",
  "",
  "Other options:",
  "  --out <dir>           output dir (default: ./url-to-markdown)",
  "  --ignore-links        drop hyperlinks in the output",
  "  --summarize           after extraction, host agent applies prompts/summary.md",
  "  --prompt <path>       override prompts/summary.md (with --summarize)",
  "",
  "Output:",
  "  <out>/<domain>/<slug>.md           extracted article + YAML frontmatter",
  "  <out>/<domain>/<slug>.summary.md   only with --summarize (written by the agent)",
  "",
  "Exit codes:",
  "  0  success",
  "  1  tool / argument error (bad URL, missing flag value, etc.)",
  "  2  page-side error (best-effort extraction insufficient)",
  "",
  "Environment:",
  "  URLMD_DATA_DIR              override default output root",
  "  URLMD_CHROME_PATH           override Chrome executable",
  "  URLMD_CHROME_PROFILE_DIR    override Chrome profile directory",
  "",
].join("\n");

interface Flags {
  positional: string[];
  out?: string;
  fetchOnly?: boolean;
  chrome?: boolean;
  wait?: boolean;
  summarize?: boolean;
  prompt?: string;
  ignoreLinks?: boolean;
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
      case "--fetch-only":
        f.fetchOnly = true;
        break;
      case "--chrome":
        f.chrome = true;
        break;
      case "--wait":
        f.wait = true;
        break;
      case "--summarize":
        f.summarize = true;
        break;
      case "--prompt":
        f.prompt = argv[++i];
        break;
      case "--ignore-links":
        f.ignoreLinks = true;
        break;
      default:
        f.positional.push(a);
    }
  }
  return f;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function runCheck(): Promise<void> {
  const bun = (globalThis as { Bun?: { version: string } }).Bun;
  process.stdout.write("url-to-markdown check\n");
  process.stdout.write(`  skill dir:    ${SKILL_DIR}\n`);
  process.stdout.write(`  runtime:      ${bun ? `Bun ${bun.version}` : "non-Bun (this skill expects Bun)"}\n`);
  process.stdout.write(`  node version: ${process.version}\n`);

  const promptFiles = ["prompts/summary.md", "prompts/outline.md", "prompts/section.md"];
  for (const rel of promptFiles) {
    const exists = await fileExists(path.join(SKILL_DIR, rel));
    process.stdout.write(`  ${rel}: ${exists ? "ok" : "MISSING"}\n`);
    if (!exists) process.exitCode = 1;
  }

  const { findChromeExecutable } = await import("./cdp.js");
  const chrome = findChromeExecutable();
  process.stdout.write(`  chrome:       ${chrome ?? "not found (only needed for --chrome / auto-escalation)"}\n`);
  process.stdout.write("  llm: handled by the host agent (no API key required for --summarize)\n");
}

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function runConvert(flags: Flags): Promise<void> {
  const url = flags.positional[0];
  if (!url) {
    process.stderr.write("Error: URL is required.\n");
    process.exit(1);
  }
  if (!isValidUrl(url)) {
    process.stderr.write(`Error: Invalid URL: ${JSON.stringify(url)} (only http:// and https:// supported).\n`);
    process.exit(1);
  }
  if (flags.fetchOnly && flags.chrome) {
    process.stderr.write("Error: --fetch-only and --chrome are mutually exclusive.\n");
    process.exit(1);
  }
  if (flags.wait && !flags.chrome) {
    process.stderr.write("Error: --wait requires --chrome.\n");
    process.exit(1);
  }

  const { runFetchPath, describeReason } = await import("./fetch-path.js");
  const { runChromePath } = await import("./chrome-path.js");
  const { resolveOutDir, resolveOutPath, deriveSlug, composeDocument } = await import("./output.js");

  let extractResult: Awaited<ReturnType<typeof runChromePath>>["result"] | null = null;
  let mode: "fetch" | "chrome" | "chrome-wait" = "fetch";
  let finalUrl = url;

  if (!flags.chrome) {
    process.stderr.write(`Fetching: ${url}\n`);
    const fetched = await runFetchPath(url, { ignoreLinks: flags.ignoreLinks });
    if (fetched.ok) {
      extractResult = fetched.result;
      finalUrl = fetched.finalUrl;
      mode = "fetch";
    } else if (flags.fetchOnly) {
      process.stderr.write(
        `Fetch insufficient (${describeReason(fetched.reason)}). --fetch-only is set; not escalating.\n`
      );
      process.exit(2);
    } else {
      process.stderr.write(
        `Fetch insufficient (${describeReason(fetched.reason)}) — escalating to Chrome...\n`
      );
    }
  }

  if (!extractResult) {
    if (flags.fetchOnly) {
      // Only reachable if fetch threw before returning a structured outcome (already handled above),
      // but kept for completeness.
      process.exit(2);
    }
    process.stderr.write(
      flags.chrome ? `Launching Chrome: ${url}${flags.wait ? " (--wait)" : ""}\n` : "Launching Chrome (auto-escalation)...\n"
    );
    const chromed = await runChromePath(url, { wait: flags.wait, ignoreLinks: flags.ignoreLinks });
    extractResult = chromed.result;
    finalUrl = chromed.finalUrl;
    mode = chromed.mode;
  }

  if (!extractResult) {
    process.stderr.write("Error: extraction returned no result.\n");
    process.exit(2);
  }
  if (extractResult.wordCount < 10) {
    process.stderr.write(`Error: extracted document has only ${extractResult.wordCount} words; aborting.\n`);
    process.exit(2);
  }

  const outDir = resolveOutDir(flags.out);
  const slug = deriveSlug(extractResult.title, finalUrl);
  const outPath = await resolveOutPath(outDir, finalUrl, slug);

  await mkdir(path.dirname(outPath), { recursive: true });

  const document = composeDocument(
    {
      url: finalUrl,
      title: extractResult.title,
      description: extractResult.description,
      author: extractResult.author,
      published: extractResult.published,
      captured_at: new Date().toISOString(),
      mode,
      word_count: extractResult.wordCount,
    },
    extractResult.markdown
  );

  await writeFile(outPath, document, "utf-8");
  process.stderr.write(`Wrote ${outPath} (${extractResult.wordCount} words, mode=${mode})\n`);
  if (flags.summarize) {
    process.stderr.write(
      "Note: --summarize is performed by the host agent (Claude Code / Codex) — see SKILL.md Step 2.\n" +
        "      The bare CLI cannot summarize; run this skill inside an agent session for the summary file.\n"
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
