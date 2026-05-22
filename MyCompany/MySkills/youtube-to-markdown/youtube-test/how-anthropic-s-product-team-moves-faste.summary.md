# How Anthropic's product team moves faster than anyone else | Cat Wu (Head of Product, Claude Code)

## Summary
Cat Wu, Head of Product for Claude Code and Co-work at Anthropic, explains how her team has compressed feature timelines from six months to one week — sometimes a single day — by stripping process, hiring engineers with strong product taste, shipping under a "research preview" brand to lower commitment, and ruthlessly aligning around Anthropic's mission rather than individual product KPIs. She argues that the AI-native PM role is converging with engineering and design: product taste, eval-writing, and the ability to define what the product should look like one month out are now the rare skills. The conversation closes with concrete advice for thriving in this transition: automate your own repetitive work to 100% (not 95%) reliability, build apps you actually use daily, and stop over-customizing setups in lieu of shipping.

## Sections
### Cat's role and partnership with Boris
Cat works alongside Boris (creator of Claude Code, tech lead) in an "80% mind-meld, 20% specialization" split. Boris owns the 3–6-month product vision; Cat owns translating that vision into the path-from-today, plus cross-functional alignment with marketing, sales, finance, and capacity teams. PM at Anthropic is less about gatekeeping and more about removing blockers so engineers can ship in a week.

### Why traditional PM is broken for AI-native products
Pre-AI tech shifts allowed 6–12-month roadmaps and tight inter-team coordination because code was expensive. Now feature timelines are 1 week to 1 day, so PMs who insist on multi-quarter coordination block their own teams. The new core PM job is shortening idea-to-user time and defining which one or two tasks must work out-of-the-box for a feature.

### The Cloud Code shipping engine
Three concrete mechanics enable the velocity: (1) weekly metrics readouts for the whole team plus a written list of team principles — so anyone can decide without escalation; (2) shipping almost everything as a "research preview" so the org's commitment is low and feedback comes fast; (3) a tight evergreen launch room where engineers post a ready feature and PMM, docs, and DevRel turn around the announcement next-day. PRDs still happen, but only for ambiguous or infrastructure-heavy projects.

### How roles are merging
PMs do engineering work; engineers do PM work; designers PM and ship code. Cloud Code prefers hiring engineers with strong product taste over hiring more PMs — many engineers go from Twitter feedback to shipped feature end-to-end in a week with no PM involvement. Engineering-background PMs have an edge for the next few months because effort estimation feeds prioritization, but the durable skill is product taste itself.

### Why Anthropic moves faster than the rest
Two ingredients: (1) a unifying mission ("safe AGI for humanity") that is invoked above any individual product line, so cross-org tradeoffs resolve in minutes; and (2) extreme focus — teams are willing to sink their own KRs in service of Anthropic's KRs. The decline in OpenClaud third-party access traces back to the same logic: prioritize first-party products that grow Anthropic's reachable user base.

### When to use Claude Code, desktop, web/mobile, and Co-work
Terminal CLI is the most powerful surface (features land there first). Desktop wins for front-end work (preview pane), non-terminal users, and an at-a-glance control plane across CLI/desktop/web/mobile. Web and mobile let you kick off tasks away from your laptop. Co-work is for tasks whose output isn't code — slide decks, customer briefs, inbox-zero, doc drafts. Cat's split: code → Claude Code; everything else → Co-work.

### Co-work in practice and internal tooling
Cat fed a slide-deck task into Co-work overnight: Slack + Drive + the design-system template, plus a written brief. It produced a 20-page polished draft by morning. Inside Anthropic, sales has built a Salesforce/Gong-aware deck generator that shrinks 20–30 minutes of manual customization to seconds. Slack remains the company OS — easy to extend, no real challenger.

### Emerging skills: product taste, evals, model intuition
The hardest skill is defining what the product should look like a month from now under model-capability uncertainty — being "the right amount of AGI-pilled." Build it by (1) using the model heavily and asking it to introspect on its own mistakes; (2) cultivating a small set of trusted "taste" reviewers (Cat names Amanda, who shapes Claude's character, and the Cloud Code team); (3) writing ~10 great evals — not hundreds. Each new model release prompts a system-prompt audit: which crutches can now be deleted.

### Vision for Claude/Co-work and advice for everyone else
The product roadmap maps to building blocks: single task → multi-task → 50–100 parallel agents running remotely with a UI for inspection, verification, and self-improving feedback loops. Cat's advice for thriving: automate your repetitive work to 100% reliability (95% is not automation), build apps you use every day rather than one-shot prototypes, resist over-customizing your setup, and treat 2024 chat-based products vs. 2025+ action-based agents as fundamentally different categories.

## Key Takeaways
- Anthropic feature timelines have collapsed from 6 months to 1 month and often to 1 day; the lever is removing process, not (just) better models.
- Almost every Cloud Code feature ships as a branded "research preview" — the framing itself lowers commitment and unlocks weekly cadence.
- Anthropic is hiring "engineers with great product taste" over hiring more PMs; the team is ~30–40 PMs across research, CDP, Cloud Code, enterprise, and growth.
- 95%-reliable automations are not automations — get to 100% by giving Claude feedback until it's bulletproof, or don't bother building it.
- Each new model release triggers a system-prompt audit: delete every crutch (e.g., to-do list nudges) the older model required and that the new one no longer needs.
- Code review is the canonical "build for the next model" example — early Cloud Code code-review attempts failed; Opus 4.5/4.6 + Sonnet 4.6 finally crossed the reliability bar.
- "Just do things" — Cat's guiding rule. Roles, scopes, and codebase boundaries should be permeable when the team understands first principles and constraints.

## Tags
- claude code
- product management
- ai-native development
- shipping velocity
- evals
- product taste
- anthropic culture
