import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export interface FrontmatterFields {
  source: string;
  title: string;
  format: string;
  page_count?: number;
  captured_at: string;
  word_count: number;
}

export function makeSlug(source: string): string {
  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50) || "document";
}

export function deriveTitle(inputPath: string): string {
  const base = path.basename(inputPath);
  const ext = path.extname(base);
  return ext ? base.slice(0, -ext.length) : base;
}

export function deriveSlug(inputPath: string): string {
  return makeSlug(deriveTitle(inputPath));
}

export function getSourceBucket(inputPath: string): string {
  const parent = path.basename(path.dirname(path.resolve(inputPath)));
  return parent ? makeSlug(parent) : "files";
}

export function resolveOutDir(outOverride?: string): string {
  if (outOverride) return path.resolve(outOverride);
  const env = process.env.PDFMD_DATA_DIR?.trim();
  if (env) return path.resolve(env);
  return path.join(process.cwd(), "pdf-to-markdown");
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

export async function resolveOutPath(outDir: string, inputPath: string, slug: string): Promise<string> {
  const bucket = getSourceBucket(inputPath);
  const dir = path.join(outDir, bucket);
  const base = path.join(dir, `${slug}.md`);
  if (!(await fileExists(base))) return base;
  return path.join(dir, `${slug}-${timestampSuffix()}.md`);
}

function escapeYamlValue(value: string): string {
  if (/^[a-zA-Z0-9 _.,:/\-+@()'?!]*$/.test(value) && !value.startsWith(" ") && !value.endsWith(" ")) {
    if (/^(true|false|null|yes|no|on|off)$/i.test(value)) return `"${value}"`;
    return value;
  }
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function formatFrontmatter(fields: FrontmatterFields): string {
  const lines: string[] = ["---"];
  lines.push(`source: ${escapeYamlValue(fields.source)}`);
  lines.push(`title: ${escapeYamlValue(fields.title || "")}`);
  lines.push(`format: ${fields.format}`);
  if (typeof fields.page_count === "number") lines.push(`page_count: ${fields.page_count}`);
  lines.push(`captured_at: ${escapeYamlValue(fields.captured_at)}`);
  lines.push(`word_count: ${fields.word_count}`);
  lines.push("---", "");
  return lines.join("\n");
}

export function composeDocument(frontmatter: FrontmatterFields, markdown: string): string {
  return formatFrontmatter(frontmatter) + "\n" + markdown.trimStart() + (markdown.endsWith("\n") ? "" : "\n");
}

export function countWords(markdown: string): number {
  const stripped = markdown.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`\[\]()-]/g, " ");
  return stripped.split(/\s+/).filter(Boolean).length;
}
