# Daily Brief and Weekly Synthesis

> Two scheduled rituals — a 6am daily brief and a 15-minute Monday synthesis — drive the compounding by pushing the vault back to you instead of waiting for you to pull from it.

## Key Points
- **Daily brief runs automatically through N8N** every weekday at 6am. By the time you sit down to work it's already in `/inbox` waiting. **Read it before you open anything else.**
- The brief prompt has Claude read everything in `/inbox` from the **last 24 hours** and `/notes` from the **last 7 days**, then return:
  - **CONNECTIONS** — 3 most interesting connections between recent captures and older notes "I probably have not noticed." Specific. Quote relevant passages.
  - **PATTERN** — one pattern across the week's captures. "What is my brain clearly working on even if I have not said it explicitly?"
  - **QUESTION** — one question worth sitting with today. **Not a task. A question.**
- Output: a clean Markdown file at `/inbox/brief-{{date}}.md`.
- **Weekly synthesis is 15 minutes every Monday.** Schedule it on the calendar. "Do not skip it in week two because the vault feels too empty. The vault is never too empty to find something worth thinking about."
- The synthesis prompt asks Claude to read the **entire vault**, focusing on the last 7 days, and return:
  - **EMERGING THESIS** — what idea you are building toward without having stated it explicitly.
  - **CONTRADICTIONS** — what you've saved recently that contradicts something you believed before. Both sides shown from your own notes.
  - **KNOWLEDGE GAPS** — what you are clearly not reading that you should be.
  - **ONE ACTION** — the single highest-leverage thing you could do or think about this week.
- The synthesis prompt explicitly instructs Claude: **"Be direct. Challenge me. Do not summarize what I already know."**

## Details

The daily brief and weekly synthesis are structurally **identical patterns** — both are scheduled prompts that have Claude read the vault and return to the human — but they operate on different time horizons and produce different outputs. The daily brief is connection-density at 24h–7d; the synthesis is thesis-formation at 7d (with full-vault context).

A specific design choice: the brief asks for **a question, not a task**. This is anti-productivity-theater — the brief isn't a TODO list. The author wants the daily output to seed thinking, not work. The synthesis goes further by demanding contradictions and knowledge gaps, both of which require Claude to disagree with the user.

The synthesis cadence (Monday + 15 minutes) is paired with the CLAUDE.md update cadence from the previous chapter. Both happen in the same calendar block, building a single weekly "vault maintenance + synthesis" ritual that keeps both the context (CLAUDE.md) and the outputs (synthesis log) fresh.

The compounding mechanism the author keeps emphasizing only works because the synthesis is captured: **"Over six months of weekly sessions you will have a record of how your thinking evolved — every assumption you held and changed, every idea that started small and grew into something you act on."** Without the synthesis ritual, the vault is just storage; with it, the vault has its own change log.

## Visuals
- A weekly calendar grid with two highlighted slots: **Mon-Fri 6:00am** = daily brief auto-runs; **Monday 15-min block** = synthesis session.
- A side-by-side comparison card: **Daily brief** (24h captures + 7d notes → 3 connections + 1 pattern + 1 question) vs **Weekly synthesis** (full vault, 7d focus → emerging thesis + contradictions + gaps + 1 action).
- A flowchart showing the brief: input arrows from `/inbox` (24h) and `/notes` (7d) → Claude → output `/inbox/brief-{{date}}.md`.
- A pull-quote card: *"Be direct. Challenge me. Do not summarize what I already know."* — formatted as the imperative addressed to Claude.
- A "question vs. task" contrast graphic: the brief outputs a question mark (☞), not a checkbox (☐).
