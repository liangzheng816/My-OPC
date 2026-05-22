import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import ytTranscriptPkg from "yt-transcript-api@1.0.8";

const { YouTubeTranscriptApi } = ytTranscriptPkg as { YouTubeTranscriptApi: new () => YtApi };

interface YtSnippet {
  text: string;
  start: number;
  duration?: number;
}

interface YtTranscriptObj {
  fetch: () => Promise<YtSnippet[]>;
}

interface YtTranscriptList {
  findTranscript: (langs: string[]) => YtTranscriptObj;
  [Symbol.iterator]: () => Iterator<YtTranscriptObj>;
}

interface YtApi {
  list: (videoId: string) => Promise<YtTranscriptList>;
}

export interface VideoMetadata {
  title: string;
  author: string;
  thumbnail: string | null;
}

export interface TranscriptResult {
  videoId: string;
  metadata: VideoMetadata;
  snippets: YtSnippet[];
  url: string;
  totalDurationSecs: number;
  slug: string;
}

export function extractVideoId(url: string): string {
  const pattern =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  if (match) return match[1];
  throw new Error(
    "Invalid YouTube URL. Supported: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID"
  );
}

export async function fetchVideoMetadata(videoId: string): Promise<VideoMetadata> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) throw new Error("oEmbed request failed");
    const data = (await res.json()) as { title?: string; author_name?: string; thumbnail_url?: string };
    return {
      title: data.title || `YouTube Video ${videoId}`,
      author: data.author_name || "Unknown",
      thumbnail: data.thumbnail_url || null,
    };
  } catch {
    return { title: `YouTube Video ${videoId}`, author: "Unknown", thumbnail: null };
  }
}

const ytApi: YtApi = new YouTubeTranscriptApi();

export async function fetchTranscript(videoId: string): Promise<YtSnippet[]> {
  let transcriptList: YtTranscriptList;
  try {
    transcriptList = await ytApi.list(videoId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const lower = msg.toLowerCase();
    if (lower.includes("age") && lower.includes("restrict")) {
      throw new VideoError("Video is age-restricted; transcripts are not retrievable without authentication.");
    }
    if (lower.includes("region") || lower.includes("unavailable in your")) {
      throw new VideoError("Video is region-locked or unavailable in this region.");
    }
    if (lower.includes("private") || lower.includes("not available")) {
      throw new VideoError("Video is private, removed, or otherwise unavailable.");
    }
    if (lower.includes("transcript") && lower.includes("disabled")) {
      throw new VideoError("Captions are disabled for this video.");
    }
    throw new VideoError(`Could not list transcripts: ${msg}`);
  }

  let transcriptObj: YtTranscriptObj;
  try {
    transcriptObj = transcriptList.findTranscript(["en", "en-US", "en-GB"]);
  } catch {
    const all = [...transcriptList];
    if (all.length === 0) {
      throw new VideoError("No captions are available for this video.");
    }
    transcriptObj = all[0];
  }

  try {
    return await transcriptObj.fetch();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new VideoError(`Could not fetch transcript: ${msg}`);
  }
}

export class VideoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VideoError";
  }
}

export function secondsToTimestamp(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function snippetsToPlainText(snippets: YtSnippet[]): string {
  return snippets.map((s) => s.text.trim()).join(" ");
}

export function snippetsToMarkdown(snippets: YtSnippet[]): string {
  return snippets.map((s) => `[${secondsToTimestamp(s.start)}] ${s.text.trim()}`).join("\n");
}

export function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40) || "video";
}

export function metaHeader(metadata: VideoMetadata, url: string): string {
  const date = new Date().toISOString().split("T")[0];
  return [
    `> **Channel:** ${metadata.author}`,
    `> **Source:** ${url}`,
    `> **Converted:** ${date}`,
  ].join("\n");
}

export function composeTranscriptMarkdown(
  metadata: VideoMetadata,
  snippets: YtSnippet[],
  url: string
): string {
  const totalSecs = snippets.length > 0 ? Math.floor(snippets[snippets.length - 1].start) : 0;
  const duration = secondsToTimestamp(totalSecs);
  return [
    `# ${metadata.title}`,
    "",
    metaHeader(metadata, url),
    `> **Duration:** ~${duration}`,
    `> **Snippets:** ${snippets.length}`,
    "",
    "---",
    "",
    "## Transcript",
    "",
    snippetsToMarkdown(snippets),
  ].join("\n");
}

export async function fetchTranscriptResult(url: string): Promise<TranscriptResult> {
  const videoId = extractVideoId(url);
  const [metadata, snippets] = await Promise.all([
    fetchVideoMetadata(videoId),
    fetchTranscript(videoId),
  ]);
  const last = snippets[snippets.length - 1];
  const totalDurationSecs = last
    ? Math.ceil(last.start + (last.duration || 0))
    : 0;
  return {
    videoId,
    metadata,
    snippets,
    url,
    totalDurationSecs,
    slug: makeSlug(metadata.title),
  };
}

export async function runTranscriptCommand(opts: { url: string; out: string }): Promise<void> {
  process.stderr.write(`Fetching transcript: ${opts.url}\n`);

  let result: TranscriptResult;
  try {
    result = await fetchTranscriptResult(opts.url);
  } catch (err) {
    if (err instanceof VideoError) {
      process.stderr.write(`Video error: ${err.message}\n`);
      process.exit(2);
    }
    throw err;
  }

  if (result.snippets.length === 0) {
    process.stderr.write("Video error: transcript was empty.\n");
    process.exit(2);
  }

  const markdown = composeTranscriptMarkdown(result.metadata, result.snippets, result.url);
  const outDir = path.resolve(opts.out);
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${result.slug}.transcript.md`);
  await writeFile(outPath, markdown, "utf-8");

  process.stderr.write(
    `Wrote ${outPath} (${result.snippets.length} snippets, ~${secondsToTimestamp(result.totalDurationSecs)})\n`
  );
  process.stdout.write(`${outPath}\n`);
}
