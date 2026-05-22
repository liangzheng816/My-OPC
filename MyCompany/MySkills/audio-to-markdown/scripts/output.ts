import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export type AudioFormat = "mp3" | "wav" | "m4a";

export interface FrontmatterFields {
  source: string;
  title: string;
  format: AudioFormat;
  duration?: string;
  captured_at: string;
  word_count: number;
}

export function makeSlug(source: string): string {
  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50) || "audio";
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
  const env = process.env.AUDIOMD_DATA_DIR?.trim();
  if (env) return path.resolve(env);
  return path.join(process.cwd(), "audio-to-markdown");
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
  if (fields.duration) lines.push(`duration: ${escapeYamlValue(fields.duration)}`);
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

export function detectFormat(inputPath: string): AudioFormat | null {
  const ext = path.extname(inputPath).toLowerCase();
  switch (ext) {
    case ".mp3":
      return "mp3";
    case ".wav":
      return "wav";
    case ".m4a":
      return "m4a";
    default:
      return null;
  }
}

// markitdown's audio converter emits an optional metadata block at the top
// (Title / Artist / Album / Duration / Bitrate / ...) followed by the
// transcript. Drop the metadata block if --ignore-metadata is set.
export function stripMetadataBlock(markdown: string): string {
  const lines = markdown.split("\n");
  if (lines.length === 0) return markdown;

  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;

  if (i >= lines.length) return markdown;

  // markitdown's audio metadata block usually starts with "# Audio metadata"
  // or just key:value lines. Detect either shape, then skip until the first
  // markdown-content boundary (a "# Transcript" header or a blank line
  // followed by transcript-like prose).
  const firstNonEmpty = lines[i].trim();
  const looksLikeMetadataHeader =
    /^#+\s*(audio\s*)?metadata\b/i.test(firstNonEmpty) ||
    /^(Title|Artist|Album|Year|Genre|Duration|Bitrate|Sample\s*rate|Channels)\s*:/i.test(firstNonEmpty);
  if (!looksLikeMetadataHeader) return markdown;

  // Find the transcript header, or fall back to the first blank-separated paragraph after metadata.
  let transcriptStart = -1;
  for (let j = i; j < lines.length; j++) {
    if (/^#+\s*transcript\b/i.test(lines[j].trim())) {
      transcriptStart = j + 1;
      break;
    }
  }
  if (transcriptStart === -1) {
    // Skip the metadata block (single contiguous run of non-empty lines) then any blank lines.
    let j = i;
    while (j < lines.length && lines[j].trim() !== "") j++;
    while (j < lines.length && lines[j].trim() === "") j++;
    transcriptStart = j;
  }
  return lines.slice(transcriptStart).join("\n").trimStart();
}

export function extractDuration(markdown: string): string | undefined {
  const m = markdown.match(/^[ \t]*Duration\s*:\s*([^\n]+?)\s*$/im);
  return m ? m[1] : undefined;
}
