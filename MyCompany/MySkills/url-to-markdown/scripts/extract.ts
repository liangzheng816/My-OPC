import { JSDOM } from "jsdom@25.0.1";
import { Readability } from "@mozilla/readability@0.5.0";
import TurndownService from "turndown@7.2.0";
import turndownPluginGfm from "turndown-plugin-gfm@1.0.2";

const { gfm } = turndownPluginGfm as { gfm: TurndownService.Plugin };

export interface ExtractOptions {
  ignoreLinks?: boolean;
}

export interface ExtractResult {
  title: string;
  description?: string;
  author?: string;
  published?: string;
  markdown: string;
  wordCount: number;
}

export function extract(html: string, sourceUrl: string, opts: ExtractOptions = {}): ExtractResult {
  const dom = new JSDOM(html, { url: sourceUrl });
  const document = dom.window.document;

  const docTitle = document.querySelector("title")?.textContent?.trim() ?? "";
  const meta = readMetaTags(document);

  // Run Readability against a clone so the source DOM stays intact for fallback metadata reads.
  let articleHtml = "";
  let articleTitle = docTitle;
  let articleByline: string | undefined;
  let articleSiteName: string | undefined;
  let articlePublished: string | undefined;
  let articleExcerpt: string | undefined;

  try {
    const cloneDoc = dom.window.document.cloneNode(true) as Document;
    const reader = new Readability(cloneDoc, { charThreshold: 100 });
    const article = reader.parse();
    if (article) {
      articleHtml = article.content ?? "";
      if (article.title) articleTitle = article.title;
      if (article.byline) articleByline = article.byline;
      if ((article as { siteName?: string }).siteName) articleSiteName = (article as { siteName?: string }).siteName;
      if ((article as { publishedTime?: string }).publishedTime) articlePublished = (article as { publishedTime?: string }).publishedTime;
      if (article.excerpt) articleExcerpt = article.excerpt;
    }
  } catch {
    // fall through to body fallback
  }

  if (!articleHtml.trim()) {
    articleHtml = document.body?.innerHTML ?? html;
  }

  const turndown = createTurndownService(opts);
  let markdown = turndown.turndown(articleHtml);
  markdown = cleanMarkdown(markdown);

  const description = articleExcerpt ?? meta.description;
  const author = articleByline ?? meta.author;
  const published = articlePublished ?? meta.published;

  return {
    title: articleTitle || meta.ogTitle || articleSiteName || "Untitled",
    description: description?.trim() || undefined,
    author: author?.trim() || undefined,
    published: published?.trim() || undefined,
    markdown,
    wordCount: countWords(markdown),
  };
}

interface MetaFields {
  description?: string;
  author?: string;
  published?: string;
  ogTitle?: string;
}

function readMetaTags(document: Document): MetaFields {
  const get = (sel: string): string | undefined => {
    const el = document.querySelector(sel) as HTMLMetaElement | null;
    const content = el?.getAttribute("content")?.trim();
    return content || undefined;
  };
  return {
    description: get('meta[name="description"]') ?? get('meta[property="og:description"]'),
    author:
      get('meta[name="author"]') ??
      get('meta[property="article:author"]') ??
      get('meta[name="twitter:creator"]'),
    published:
      get('meta[property="article:published_time"]') ??
      get('meta[name="date"]') ??
      get('meta[name="dc.date.issued"]') ??
      get('meta[itemprop="datePublished"]'),
    ogTitle: get('meta[property="og:title"]'),
  };
}

function createTurndownService(opts: ExtractOptions): TurndownService {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
    linkStyle: opts.ignoreLinks ? "referenced" : "inlined",
  });

  turndown.use(gfm);
  turndown.remove(["script", "style", "nav", "footer", "noscript", "iframe"]);

  turndown.addRule("images", {
    filter: "img",
    replacement: (_content, node) => {
      const el = node as HTMLImageElement;
      const alt = el.getAttribute("alt") ?? "";
      const src = el.getAttribute("src") ?? "";
      if (!src || src.startsWith("data:")) return "";
      return `![${alt}](${src})`;
    },
  });

  if (opts.ignoreLinks) {
    turndown.addRule("ignoreLinks", {
      filter: "a",
      replacement: (content) => content,
    });
  }

  return turndown;
}

function cleanMarkdown(md: string): string {
  return md
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
