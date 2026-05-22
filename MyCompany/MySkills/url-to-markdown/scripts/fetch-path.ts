import { extract, type ExtractResult } from "./extract.js";
import { DEFAULT_USER_AGENT } from "./cdp.js";

const FETCH_TIMEOUT_MS = 15_000;

export type EscalateReason =
  | { kind: "http-error"; status: number; statusText: string }
  | { kind: "non-html"; contentType: string }
  | { kind: "low-word-count"; wordCount: number }
  | { kind: "bot-block"; marker: string }
  | { kind: "spa-shell"; rootId: string };

export interface FetchOk {
  ok: true;
  finalUrl: string;
  result: ExtractResult;
}

export interface FetchEscalate {
  ok: false;
  reason: EscalateReason;
  finalUrl?: string;
}

export type FetchOutcome = FetchOk | FetchEscalate;

const BOT_BLOCK_MARKERS: string[] = [
  "Just a moment...",
  "Just a moment&hellip;",
  "Just a moment…",
  "Verifying you are human",
  "checking your browser",
  "<title>Access Denied",
  "enable JavaScript and cookies to continue",
  "Please enable JavaScript",
  "captcha-delivery.com",
  "Cloudflare Ray ID",
];

const SPA_SHELL_RE = /<div[^>]+id=["'](root|app|__next)["'][^>]*>\s*<\/div>/i;
const MIN_WORD_COUNT = 50;

export interface FetchOptions {
  ignoreLinks?: boolean;
}

export async function runFetchPath(url: string, opts: FetchOptions = {}): Promise<FetchOutcome> {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent": DEFAULT_USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      reason: { kind: "http-error", status: 0, statusText: msg },
    };
  }

  const finalUrl = response.url || url;

  if (!response.ok) {
    return {
      ok: false,
      finalUrl,
      reason: { kind: "http-error", status: response.status, statusText: response.statusText || "" },
    };
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!/text\/html|application\/xhtml|text\/xml/.test(contentType)) {
    return {
      ok: false,
      finalUrl,
      reason: { kind: "non-html", contentType },
    };
  }

  const html = await response.text();

  for (const marker of BOT_BLOCK_MARKERS) {
    if (html.includes(marker)) {
      return { ok: false, finalUrl, reason: { kind: "bot-block", marker } };
    }
  }

  const result = extract(html, finalUrl, { ignoreLinks: opts.ignoreLinks });

  if (result.wordCount < MIN_WORD_COUNT) {
    const spaMatch = html.match(SPA_SHELL_RE);
    if (spaMatch) {
      return {
        ok: false,
        finalUrl,
        reason: { kind: "spa-shell", rootId: spaMatch[1] },
      };
    }
    return {
      ok: false,
      finalUrl,
      reason: { kind: "low-word-count", wordCount: result.wordCount },
    };
  }

  return { ok: true, finalUrl, result };
}

export function describeReason(reason: EscalateReason): string {
  switch (reason.kind) {
    case "http-error":
      return reason.status === 0
        ? `network error: ${reason.statusText}`
        : `HTTP ${reason.status} ${reason.statusText}`.trim();
    case "non-html":
      return `non-HTML content-type: ${reason.contentType || "(unset)"}`;
    case "low-word-count":
      return `wordCount=${reason.wordCount} below ${MIN_WORD_COUNT}`;
    case "bot-block":
      return `bot-block marker matched: "${reason.marker}"`;
    case "spa-shell":
      return `SPA shell detected (#${reason.rootId} is empty)`;
  }
}
