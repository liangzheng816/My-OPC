import { spawn } from "node:child_process";
import { access, constants } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import os from "node:os";

export const MARKITDOWN_VERSION = "0.1.5";

export interface MarkitdownRun {
  markdown: string;
  stderr: string;
  exitCode: number;
}

export class MarkitdownError extends Error {
  readonly stderr: string;
  readonly exitCode: number;
  readonly category: "uv-missing" | "convert-failed" | "spawn-error";
  constructor(message: string, category: MarkitdownError["category"], exitCode: number, stderr: string) {
    super(message);
    this.category = category;
    this.exitCode = exitCode;
    this.stderr = stderr;
  }
}

async function isExecutable(p: string): Promise<boolean> {
  try {
    await access(p, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export async function findUvx(): Promise<string | null> {
  const envOverride = process.env.MARKITDOWN_UVX?.trim();
  if (envOverride && (await isExecutable(envOverride))) return envOverride;

  const home = os.homedir();
  const candidates = [
    path.join(home, ".local", "bin", "uvx"),
    path.join(home, ".cargo", "bin", "uvx"),
    "/opt/homebrew/bin/uvx",
    "/usr/local/bin/uvx",
    "/usr/bin/uvx",
  ];
  for (const c of candidates) {
    if (await isExecutable(c)) return c;
  }

  const pathEnv = process.env.PATH ?? "";
  const sep = process.platform === "win32" ? ";" : ":";
  const exts = process.platform === "win32" ? [".exe", ".cmd", ""] : [""];
  for (const dir of pathEnv.split(sep)) {
    if (!dir) continue;
    for (const ext of exts) {
      const full = path.join(dir, `uvx${ext}`);
      if (await isExecutable(full)) return full;
    }
  }
  return null;
}

export interface RunMarkitdownOpts {
  input: string;
  extras: string[];
  version?: string;
  extraEnv?: Record<string, string>;
}

export async function runMarkitdown(opts: RunMarkitdownOpts): Promise<MarkitdownRun> {
  const uvx = await findUvx();
  if (!uvx) {
    throw new MarkitdownError(
      "uv not found on PATH. Install via `pip install uv` or `brew install uv`, " +
        "or set MARKITDOWN_UVX to point at the uvx binary.",
      "uv-missing",
      1,
      "",
    );
  }

  const version = opts.version ?? MARKITDOWN_VERSION;
  const extrasSegment = opts.extras.length > 0 ? `[${opts.extras.join(",")}]` : "";
  const spec = `markitdown${extrasSegment}==${version}`;

  const args = [
    "--quiet",
    "--from",
    spec,
    "markitdown",
    opts.input,
  ];

  return await new Promise<MarkitdownRun>((resolve, reject) => {
    const child = spawn(uvx, args, {
      env: { ...process.env, ...(opts.extraEnv ?? {}) },
      stdio: ["ignore", "pipe", "pipe"],
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    child.stdout.on("data", (c) => stdoutChunks.push(c));
    child.stderr.on("data", (c) => stderrChunks.push(c));

    child.on("error", (err) => {
      reject(
        new MarkitdownError(
          `Failed to spawn uvx: ${err.message}`,
          "spawn-error",
          1,
          Buffer.concat(stderrChunks).toString("utf-8"),
        ),
      );
    });

    child.on("close", (code) => {
      const markdown = Buffer.concat(stdoutChunks).toString("utf-8");
      const stderr = Buffer.concat(stderrChunks).toString("utf-8");
      const exitCode = code ?? 1;
      if (exitCode !== 0) {
        reject(
          new MarkitdownError(
            `markitdown failed (exit ${exitCode}). ${firstLine(stderr) || "see stderr for details"}`,
            "convert-failed",
            exitCode,
            stderr,
          ),
        );
        return;
      }
      resolve({ markdown, stderr, exitCode });
    });
  });
}

function firstLine(s: string): string {
  return s.split("\n").map((l) => l.trim()).find(Boolean) ?? "";
}
