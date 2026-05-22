# Vault Structure and CLAUDE.md

> Five folders. One root `CLAUDE.md` instruction file. The "when in doubt, put it in inbox" rule keeps the structure from collapsing under its own weight.

## Key Points
- **Five folders. That is the entire structure.** No more. The folder structure determines how well Claude can navigate the vault — over-engineering it is the failure mode.
  - **Inbox** — everything lands here first. Unprocessed staging area for all automated captures.
  - **Notes** — processed highlights, articles, podcast clips. One file per source. Auto-formatted by N8N.
  - **Ideas** — your own thinking, quick captures, voice notes transcribed. Your brain's output, not other people's input.
  - **Projects** — active work, one folder per project. Claude reads these for project-specific context.
  - **CLAUDE.md** — root-level instruction file. Read first in every session.
- "When in doubt, put it in inbox." The single disambiguation rule that prevents the "which folder does this go in?" friction spiral that kills capture.
- **`CLAUDE.md` is the most important file in the entire system.** Without it Claude starts every session cold; with it, Claude is "a collaborator who has been reading your notes for months."
- The CLAUDE.md template specifies: Name, Work, Focus, Goals 2026, Active project, Stuck on, Next milestone, vault folder map, behavioral rules ("Surface connections I have not seen", "Challenge my assumptions before agreeing", "Answer from vault context, not generically", "Flag when something I believe contradicts something I saved earlier").
- **Update the "Current Projects" / "What I Am Reading" sections every Monday morning.** Five minutes. Stale CLAUDE.md produces stale answers.

## Details

The simplicity of five folders is intentional and counter-intuitive. The author's argument: "every complex folder structure eventually collapses under its own weight because you stop knowing which folder something belongs in and the capture friction rises until the system breaks." A small structure stays usable because the disambiguation cost stays small.

**`CLAUDE.md` lives at the root of the vault as plain Markdown.** Claude reads it automatically at the start of every session. The template is specific by design — vague entries produce vague answers. "The quality of Claude's output is directly proportional to the quality of the context you give it in this file."

Notable: behavioral rules are written as imperatives directed *at Claude*, not just descriptions of preferences. Examples include "Challenge my assumptions before agreeing with them" and "Flag when something I believe contradicts something I saved earlier." This is the lever that turns Claude from a yes-man assistant into the "earnest feedback" co-worker character (a quality also called out as core to Claude's design in the Cat Wu interview).

The Monday-morning update cadence is paired with the weekly synthesis ritual covered in the next chapter — both happen in the same time slot, building the muscle memory that keeps the system load-bearing.

## Visuals
- A vault tree mockup with **exactly 5 folders + 1 root file**: `inbox/` `notes/` `ideas/` `projects/` `CLAUDE.md`. A red ✗ overlay on a "complex 15-folder vault" alternative below it.
- A **CLAUDE.md template card** showing the structured fields: Name / Work / Focus / Goals / Active / Stuck on / Next milestone / vault map / behavioral rules. Highlight the 4 behavioral-rule bullets.
- A "weekly maintenance" 5-minute clock visual: Monday morning checkbox showing "Current Projects + What I Am Reading sections" with a "stale → stale answers" warning arrow.
- Decision flowchart: **"Where does this note go?"** → 4 specific decision points → fallback edge labeled "When in doubt → inbox."
