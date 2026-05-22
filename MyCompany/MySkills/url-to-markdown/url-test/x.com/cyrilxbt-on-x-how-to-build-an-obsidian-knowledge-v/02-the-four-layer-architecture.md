# The Four-Layer Architecture

> Four distinct, single-purpose layers — capture, pipeline, Obsidian, Claude — flow strictly in one direction so nothing overlaps and the system stays simple.

## Key Points
- Every piece of software in the system serves **exactly one function**. Nothing overlaps. Everything flows in one direction.
- **Layer 1 — Capture**: tools that bring information in without manual typing. Readwise (articles + highlights), Airr (podcasts), Whisper (voice), a Telegram bot (quick saves). No categorizing, tagging, or summarizing here. Raw info in.
- **Layer 2 — Pipeline (N8N)**: watches each capture source and routes new content to the correct location in the Obsidian vault. No manual filing. A Readwise highlight appears and within minutes it's in the vault as a formatted markdown file.
- **Layer 3 — Obsidian**: the vault itself — a folder of markdown files on the local machine. **Permanent storage. Nothing gets deleted.** The ground truth of everything you've ever consumed.
- **Layer 4 — Claude**: the intelligence layer that runs across everything else. Reads the vault, finds connections, surfaces patterns, writes the daily briefing, answers questions about your own thinking. The layer that turns the archive into a thinking partner.

## Details

The four-layer structure is **architectural before tooling** — the author insists on understanding it before touching any specific software. The discipline of "no overlap" matters because most over-engineered second brains break exactly when two tools try to do the same job (capture + storage in the same app, or storage + intelligence muddled together).

The directionality is also explicit: **capture → pipeline → Obsidian → Claude**. Information never travels backwards. Claude reads the vault but doesn't capture into it directly; the pipeline writes to the vault but doesn't categorize content beyond filename and folder.

The N8N pipeline layer is the glue that lets the capture-layer tools (designed for their own use cases) feed the storage layer (which knows nothing about Readwise / Airr / etc.) without manual intervention. This is the "no manual filing" promise that keeps capture friction below the 10-second breaking point established in the previous chapter.

## Visuals
- A 4-tier vertical stack: **Capture** (tool icons fanning out: Readwise, Airr, Whisper, Telegram) → **Pipeline (N8N)** (single horizontal connector node) → **Obsidian** (folder icon, "permanent storage, nothing deleted") → **Claude** (brain icon with multi-arrows reading from Obsidian and writing back to it).
- A directionality arrow on the side: top-to-bottom one-way flow, with a red ✗ over any backwards/sideways arrows.
- A side-by-side comparison: **monolithic app** (one tool tries to do everything, breaks) vs **four-layer separation** (each layer single-purpose, durable).
- An icon strip showing the **layer-1 capture sources**: Readwise (articles), Airr (podcasts), Whisper (voice), Telegram (quick saves) — each with a one-word "what it captures" caption.
