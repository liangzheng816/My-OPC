import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { access } from "node:fs/promises";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(SCRIPT_DIR, "..");

const HELP = [
  "youtube-to-markdown: fetch a YouTube transcript as timestamped Markdown.",
  "",
  "This script does NOT call any LLM. It only fetches transcripts.",
  "Summarization is performed by the host agent (Claude Code, Codex, etc.)",
  "using the prompt files in prompts/ - see SKILL.md for the workflow.",
  "",
  "Usage:",
  "  bun main.ts transcript <youtube-url> [--out <dir>]",
  "  bun main.ts --check",
  "  bun main.ts --help",
  "",
  "Subcommands:",
  "  transcript <url>   URL -> raw timestamped transcript MD",
  "                       --out <dir>   default: ./youtube-to-markdown",
  "                       output:       <out>/<slug>.transcript.md",
  "",
  "Exit codes:",
  "  0  success",
  "  1  tool / argument error (bad URL, missing flag value, etc.)",
  "  2  video-side error (no captions, region-locked, age-gated, removed)",
  "",
].join("\n");

interface Flags {
  positional: string[];
  out?: string;
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
  process.stdout.write(`youtube-to-markdown check\n`);
  process.stdout.write(`  skill dir:    ${SKILL_DIR}\n`);
  process.stdout.write(`  runtime:      ${bun ? `Bun ${bun.version}` : "non-Bun (this skill expects Bun)"}\n`);
  process.stdout.write(`  node version: ${process.version}\n`);

  const promptFiles = ["prompts/summary.md", "prompts/outline.md", "prompts/section.md"];
  for (const rel of promptFiles) {
    const exists = await fileExists(path.join(SKILL_DIR, rel));
    process.stdout.write(`  ${rel}: ${exists ? "ok" : "MISSING"}\n`);
    if (!exists) process.exitCode = 1;
  }

  process.stdout.write(`  llm: handled by the host agent (no API key required)\n`);
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

  const sub = flags.positional.shift();
  if (!sub) {
    process.stderr.write("Error: missing subcommand. Run with --help for usage.\n");
    process.exit(1);
  }

  if (sub === "transcript") {
    const url = flags.positional[0];
    if (!url) {
      process.stderr.write("Error: `transcript` requires a YouTube URL.\n");
      process.exit(1);
    }
    const { runTranscriptCommand } = await import("./transcript.js");
    await runTranscriptCommand({
      url,
      out: flags.out ?? "./youtube-to-markdown",
    });
    return;
  }

  process.stderr.write(`Error: unknown subcommand ${JSON.stringify(sub)}. Run with --help.\n`);
  process.exit(1);
}

main().catch((err) => {
  const msg = err instanceof Error ? err.message : String(err);
  process.stderr.write(`Error: ${msg}\n`);
  process.exit(1);
});
