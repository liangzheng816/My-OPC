import { createInterface } from "node:readline";
import process from "node:process";

import {
  CdpConnection,
  autoScroll,
  evaluateScript,
  getFreePort,
  killChrome,
  launchChrome,
  waitForChromeDebugPort,
  waitForNetworkIdle,
  waitForPageLoad,
  CDP_CONNECT_TIMEOUT_MS,
  NETWORK_IDLE_TIMEOUT_MS,
  PAGE_LOAD_TIMEOUT_MS,
  POST_LOAD_DELAY_MS,
} from "./cdp.js";
import { extract, type ExtractResult } from "./extract.js";

export interface ChromeOptions {
  wait?: boolean;
  ignoreLinks?: boolean;
}

export interface ChromeOutcome {
  finalUrl: string;
  result: ExtractResult;
  mode: "chrome" | "chrome-wait";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForUserSignal(): Promise<void> {
  process.stderr.write("Page opened. Press Enter when ready to capture...\n");
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  await new Promise<void>((resolve) => {
    rl.once("line", () => {
      rl.close();
      resolve();
    });
  });
}

export async function runChromePath(url: string, opts: ChromeOptions = {}): Promise<ChromeOutcome> {
  const port = await getFreePort();
  // For --wait we want a visible window so the user can authenticate.
  const headless = !opts.wait;
  const chrome = await launchChrome(url, port, headless);

  let cdp: CdpConnection | null = null;
  try {
    const wsUrl = await waitForChromeDebugPort(port, 30_000);
    cdp = await CdpConnection.connect(wsUrl, CDP_CONNECT_TIMEOUT_MS);

    const targets = await cdp.send<{ targetInfos: Array<{ targetId: string; type: string; url: string }> }>("Target.getTargets");
    const pageTarget = targets.targetInfos.find((t) => t.type === "page" && t.url.startsWith("http"));
    if (!pageTarget) throw new Error("No page target found");

    const { sessionId } = await cdp.send<{ sessionId: string }>("Target.attachToTarget", {
      targetId: pageTarget.targetId,
      flatten: true,
    });
    await cdp.send("Network.enable", {}, { sessionId });
    await cdp.send("Page.enable", {}, { sessionId });

    if (opts.wait) {
      await waitForUserSignal();
    } else {
      await Promise.race([
        waitForPageLoad(cdp, sessionId, PAGE_LOAD_TIMEOUT_MS / 2),
        sleep(8_000),
      ]);
      await waitForNetworkIdle(cdp, sessionId, NETWORK_IDLE_TIMEOUT_MS);
      await sleep(POST_LOAD_DELAY_MS);
      await autoScroll(cdp, sessionId);
      await sleep(POST_LOAD_DELAY_MS);
    }

    const finalUrl = await evaluateScript<string>(cdp, sessionId, "location.href");
    const html = await evaluateScript<string>(cdp, sessionId, "document.documentElement.outerHTML");
    const result = extract(html, finalUrl || url, { ignoreLinks: opts.ignoreLinks });

    return {
      finalUrl: finalUrl || url,
      result,
      mode: opts.wait ? "chrome-wait" : "chrome",
    };
  } finally {
    if (cdp) {
      try {
        await cdp.send("Browser.close", {}, { timeoutMs: 5_000 });
      } catch {}
      cdp.close();
    }
    killChrome(chrome);
  }
}
