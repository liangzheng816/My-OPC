# Automated Capture

> The capture layer's only job is to collect everything without asking anything of you — every friction point is a future gap in your knowledge base.

## Key Points
- **Articles + highlights → Readwise**: install the browser extension; highlight sentences as you read; Readwise stores them automatically. No summarizing, no tagging. Also aggregates Kindle, Twitter bookmarks, Instapaper, and Pocket.
- **Podcasts + audio → Airr** for clipping podcast moments by shaking the phone (transcript saves automatically). For longer recordings — meetings, lectures, voice notes — record and run through **Whisper** for clean transcripts.
- **Quick capture from anywhere → Telegram bot** routed via N8N. ~30 minutes to build with Claude Code. Send any message; it lands in the vault's `inbox` folder automatically.
- The N8N **Telegram → Obsidian** workflow is three nodes:
  - **Node 1**: Telegram Trigger (event: message, chat_id: your_bot_id)
  - **Node 2**: Code (format the note as `inbox/{{date}}-quick-capture.md` with `# Quick Capture`, message body, source = Telegram, date stamp)
  - **Node 3**: Write File to Obsidian vault (path: `/your-vault/inbox/`, operation: create)
- **Set this up once. Never touch it again.** Friction at capture time is the death of the habit.

## Details

The author's framing is uncompromising: "Every friction point in capture is a future gap in your knowledge base." The capture stack is selected accordingly — each tool has near-zero per-item effort.

**Readwise** is "the backbone of the capture layer for written content" because it inverts the typical workflow. Instead of bookmarking → categorizing → summarizing → forgetting, you just highlight. The category and summary stage is removed entirely; what survives is the actual sentence that mattered to you, plus its source URL and date.

**The Telegram bot** is the catch-all for everything that doesn't fit the other tools — "an idea that hits you in the car. A tweet you want to think about. A question that comes up in conversation." The 30-minute build cost is small enough that the author treats it as a one-time setup, not an ongoing maintenance commitment.

A subtle point: capture tools save raw, structured-but-not-curated. **Curation is Claude's job in Layer 4**, not the human's at capture time. Forcing curation early is what produces the "beautifully organized archive of information they have completely forgotten" failure mode from the previous chapter.

## Visuals
- A 4-cell capture-tool grid: **Readwise** (browser extension highlight icon) | **Airr** (phone-shake icon) | **Whisper** (waveform → transcript icon) | **Telegram bot** (chat bubble + bot avatar). Each cell shows "what it captures" + "what you do" (always 1 step).
- The N8N **3-node flow** rendered as a horizontal pipeline: Telegram Trigger → Code (format) → Write File. With node parameters as small annotations under each.
- A "friction stopwatch" gauge: 0–10 s green zone (works), >10 s red zone (habit dies). Each capture tool placed in the green zone with its actual per-item time.
- Pull-quote card: *"Set this up once. Never touch it again."*
