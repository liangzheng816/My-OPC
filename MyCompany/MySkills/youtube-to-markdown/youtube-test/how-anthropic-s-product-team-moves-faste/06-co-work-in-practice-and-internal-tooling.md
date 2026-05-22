# Co-work in Practice and Internal Tooling

> Concrete examples of how Cat and her team use Co-work day-to-day — an overnight slide-deck workflow, a Salesforce-aware sales-deck generator, why Slack remains the company OS, and which non-engineering team is the second-biggest token consumer.

## Key Points
- **Step zero with Co-work**: connect every relevant data source. For Cat that's **Google Calendar, Gmail, Google Drive, and Slack**. Output quality is bounded by context access.
- **Slide-deck case study**: Cat fed Co-work a brief for an upcoming "Code with Cloud" conference talk plus a draft outline; it spent ~1 hour traversing Twitter, the evergreen launch room, the Cloud Code announce channel, and Drive, and produced a **20-page polished draft by morning**. Cat: "It actually looks like an Anthropic designer put it together."
- The standard workflow Cat used: **"start by creating a proposed outline with details"** — let Claude propose options, then make the final decisions on outline, then let Co-work build the deck.
- The team has a **shared, design-system-aware deck template** with ~20 example slides. Co-work picks up colors, fonts, and slide layouts from it. **Figma MCP** is also a supported source.
- **Internal sales-deck generator**: a custom web app built by one of the Cloud Code sales team. It pulls from **Salesforce, Gong, and other notes** to customize a deck per customer (Bedrock vs Vertex vs Console; HIPAA needs; SDLC concerns). Cuts **20–30 minutes of manual work to seconds**.
- **Slack remains the company OS**. Anthropic builds Slack bots heavily; the hackability is the point. "People hate on Slack, but it's really great at what it's trying to do."
- **Applied AI is the second-biggest token consumer** after engineering — they make customer prototypes, run customer engagements (5–10 per high day), and use Co-work to assemble per-meeting **briefing dossiers** the night before, including ETAs they researched from Slack.
- **Token spend per knowledge worker increases at every model jump**. Still much lower than the average engineer salary, but rising. Internal tokens are not unlimited — there is a limit. Wasting tokens is "very frowned upon" but trusted to individual judgment.

## Details

**The deck workflow, narrated.** Cat had a Code-with-Cloud conference talk on the transition of Cloud Code from assistant → full agent. She wanted to showcase products that enable that transition and pull in internal demos. Alex (PMM) had drafted what he thought the talk should cover. Cat's prompt to Co-work was, paraphrased: "Make me a slide deck for the Code-with-Cloud conference. This is what our PMM suggested it cover. Here's a draft I made that I don't like. Start by creating a proposed outline with details. Make sure it doesn't overlap with the keynote." Co-work read the linked sources, returned an outline of options, Cat picked the narrative ("local task success → every PR green → engineers landing more PRs"), and Co-work then "went off for a few hours and built the whole slide deck." She did one round of feedback ("a little too wordy"), but: "it was far faster than what I would be able to produce."

**Why it looked Anthropic-designed.** They had already standardized a shared external-engagement deck template; Cat gave Claude access to it. From that, Co-work picked up colors, fonts, and ~20 example slide formats. Figma MCP works as an alternative source.

**The internal sales-deck generator.** A salesperson on Cloud Code built a custom web app encoding the team's known-good decks (101, 201, "Mastering Cloud Code"). The app accepts customer context — pulling Salesforce, Gong, internal notes — and produces a tailored deck. The customizations include:

- **Platform alignment** — if customer is on Bedrock or Vertex, drop slides about Cloud-for-Enterprise-only features.
- **Compliance/security needs** — HIPAA or specific security controls → add corresponding slides.
- **SDLC concerns** — if the customer is anxious about code-review stage, add the code-review feature slide.

Manual time per deck: 20–30 minutes. Generated time: seconds. People who previously skipped customization (and used the generic deck) now get tailored decks for every customer.

**Slack as company OS.** Anthropic largely runs on Slack. Cat: "It's like the core OS of our company." Lenny notes Slack is the rare SaaS no one tries to replace — companies build their own Salesforce, but they build *with* Slack, not against it. Cat agrees: "they do the core task of helping everyone get real-time updates incredibly well... easy to customize. It's we love making Slack bots."

**Internal tools surge.** Cloud Code lowered the barrier so far that there's "this surge in personalized work software that people are building for custom use cases instead of using tools that don't perfectly fit the use case." The sales-deck generator is one example among many.

**Applied AI is the surprise #2 token consumer.** Applied AI is "a very technical go-to-market" team — they help customers adopt the API and model features both for the customers' products and for internal acceleration. They are heavy Cloud Code users (prototyping for customers) and heavy Co-work users (managing customer comms, historical context, call notes). Their nightly Co-work workflow is the prototype of "agentic prep": ask Co-work to summarize tomorrow's customer meetings, what each customer asked for, top-of-mind concerns, action items from prior meetings, and current ETAs researched from Slack. Co-work assembles a per-meeting **dossier**.

**Tokens per worker.** Cat's framing: "as the models get better, people delegate far more tasks to it... we do see the token cost per engineer or per any knowledge worker increase every time there's a model jump or a substantial product improvement. I think it's still much lower than what the average engineer salary is, but we see the percentage increasing over time." She also confirms Anthropic-internal token use is *not* unlimited — there are limits, and the team trusts individuals to avoid waste.

## Visuals
- A **Co-work data sources** ring diagram around a central "Co-work" icon: Google Calendar / Gmail / Google Drive / Slack / Figma MCP, with Cat's quote "Co-work can only do a great job if it has access to all the context it needs."
- A workflow timeline of the **slide-deck case study**: prompt → outline proposal → human picks narrative → 1-hour traversal of Twitter / launch room / announce channel / Drive → 20-page polished draft → 1 round of feedback → done. Time labels: "evening prompt" → "morning draft."
- A **before/after** card for the sales-deck generator: "20–30 minutes manual" vs. "seconds generated"; subhead bullets list the per-customer customizations (Bedrock/Vertex/Console; HIPAA; SDLC concerns).
- A bar chart of **internal token consumption by team**: Engineering (largest) > Applied AI (close 2nd) > others, with Cat's caveat that token cost per worker rises with each model jump but is "still much lower than the average engineer salary."
- A **per-meeting dossier** template card: customer name / past asks / top-of-mind / action items / latest ETAs (Slack-researched).
