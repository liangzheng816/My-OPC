import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export type CaptureMode = "fetch" | "chrome" | "chrome-wait";

export interface FrontmatterFields {
  url: string;
  title: string;
  description?: string;
  author?: string;
  published?: string;
  captured_at: string;
  mode: CaptureMode;
  word_count: number;
}

export function makeSlug(source: string): string {
  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50) || "page";
}

export function deriveSlug(title: string, url: string): string {
  if (title && title.trim()) return makeSlug(title);
  try {
    const u = new URL(url);
    const pathPart = u.pathname.replace(/\/$/, "").split("/").filter(Boolean).pop() ?? u.hostname;
    return makeSlug(pathPart);
  } catch {
    return "page";
  }
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown-host";
  }
}

export function resolveOutDir(outOverride?: string): string {
  if (outOverride) return path.resolve(outOverride);
  const env = process.env.URLMD_DATA_DIR?.trim();
  if (env) return path.resolve(env);
  return path.join(process.cwd(), "url-to-markdown");
}

function timestampSuffix(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

export async function resolveOutPath(outDir: string, url: string, slug: string): Promise<string> {
  const domain = getDomain(url);
  const dir = path.join(outDir, domain);
  const base = path.join(dir, `${slug}.md`);
  if (!(await fileExists(base))) return base;
  return path.join(dir, `${slug}-${timestampSuffix()}.md`);
}

function escapeYamlValue(value: string): string {
  // Quote if contains characters that would break YAML parsing
  if (/^[a-zA-Z0-9 _.,:/\-+@()'?!]*$/.test(value) && !value.startsWith(" ") && !value.endsWith(" ")) {
    if (/^(true|false|null|yes|no|on|off)$/i.test(value)) return `"${value}"`;
    return value;
  }
  // YAML double-quoted string: escape backslashes and double quotes
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function formatFrontmatter(fields: FrontmatterFields): string {
  const lines: string[] = ["---"];
  lines.push(`url: ${escapeYamlValue(fields.url)}`);
  lines.push(`title: ${escapeYamlValue(fields.title || "")}`);
  if (fields.description) lines.push(`description: ${escapeYamlValue(fields.description)}`);
  if (fields.author) lines.push(`author: ${escapeYamlValue(fields.author)}`);
  if (fields.published) lines.push(`published: ${escapeYamlValue(fields.published)}`);
  lines.push(`captured_at: ${escapeYamlValue(fields.captured_at)}`);
  lines.push(`mode: ${fields.mode}`);
  lines.push(`word_count: ${fields.word_count}`);
  lines.push("---", "");
  return lines.join("\n");
}

export function composeDocument(frontmatter: FrontmatterFields, markdown: string): string {
  return formatFrontmatter(frontmatter) + "\n" + markdown.trimStart() + (markdown.endsWith("\n") ? "" : "\n");
}
