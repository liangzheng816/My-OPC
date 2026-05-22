# Vision, Advice, and Lightning Round

> Where Cloud Code and Co-work are going (single-task → multi-task → 50–100 parallel agents), how non-engineers should think about thriving in this transition (automate to 100% — never 95%), and Cat's lightning-round picks.

## Key Points
- Cloud Code / Co-work roadmap is a **building-block hierarchy**: single task → multi-task ("multi-coding" was the late-2025 trend) → **50–100 agents per user running remotely**.
- At that scale you can't run everything locally — "there's just not enough RAM." Future infrastructure has to be **remote agents with a control-plane UI** for inspection, verification, and self-improvement.
- Four open problems for the multi-agent future: (1) which tasks need human review, (2) the agent fully verifying its own work, (3) the user trusting that "done" really means done, (4) feedback making the next run better — never repeating a mistake.
- **Advice for thriving**: anytime you do a manual task more than once, ask whether Cloud Code or Co-work could automate it. Pick repetitive grunt work; iterate the automation until it's bulletproof; reclaim ~20% of your time.
- **The 95% trap**: an automation that works 95% of the time is **not an automation** — and that last 5–10% takes more time than you expect. If you stop at 95%, you have a fragile thing you can't rely on.
- Building the automation is often slower than doing the task once. Cat: "I would encourage listeners to put in that time to scope some automation that you really want to get to 100%. Put in the elbow grease to teach Claude your preferences, give it feedback so it can improve."
- **Two opposite anti-patterns**: (a) people who never automate; (b) people who **over-customize** — endless skills, MCPs, workflow tweaks — to the point of not shipping the actual thing. "Simple setups actually work better."
- **Build apps you actually use every day**, not one-shot prototypes. "If you build a prototype that isn't helping you get more done, the AI isn't really adding value to your day."
- **The 2024 vs. 2025+ shift**: 2024 generation was **chat-based**; the Cloud-Code generation is **action-based**. The aha moment is when Claude can just *do things*, not tell you what to do.
- **Lightning round picks**: books — *How Asia Works*, *The Technology Trap*, *The Paper Menagerie*. Movies/shows — *Drive to Survive*, *Free Solo*. Product — **Waymo** (saves Cat ~30 minutes/day by enabling productive work calls in transit). Motto — **"Just do things."** Favorite Claude thinking word — **"manifesting."** Best contact: `@catwoo` on Twitter; the most useful feedback is reproducible failure cases.

## Details

**The roadmap is a sequence of building blocks.** Cat: "We think about this in terms of building blocks. For both Cloud Code and Co-work, the core building block is making individual tasks successful." As models improve, the success rate climbs and users naturally start running multiple tasks at once. "Multi-coding was this big thing toward the end of 2025 and it's only increased since then." The next jump is **50–100 parallel Claudes**. That's not a UI change — it's an infrastructure change. "At that point you're probably not going to run everything locally on your machine anymore. There's just not enough RAM. So we're thinking about: how do we make it easier for you to manage all these? These will probably run remotely. How do we build the interface so that you as a human know which tasks you need to look into?"

The four open problems Cat surfaces are themselves the agenda for future product work:

1. **Triage** — "How do we make sure the agent is fully verifying work so that when you look at a task and it says it's done, you can very quickly verify and fully trust it is done to your spec?"
2. **Verification** — agent self-verifies; human only spot-checks.
3. **Trust** — UI gives a confident "done" signal grounded in verification, not in the agent's word.
4. **Self-improvement** — "When you do see a task that isn't done to your liking, you can give it feedback and the model will know for every future run to incorporate that feedback so it never makes that mistake again."

**Cat's advice to listeners worried about their roles.** "AI gives everybody a ton more leverage than they used to. Anytime you realize that you're doing some manual task multiple times, think about how you can use Cloud Code, Co-work, or other AI tools to automate that for you. Most people have creative parts of their job that they absolutely love and tedious parts they really hate. The beauty of AI is that it can do those tedious parts for you... so you can focus on the creative parts and that means you can do a lot more than you used to be able to do."

She suggests a two-step workflow: **(1)** find your repetitive tasks, hand them to Claude; **(2)** iterate the automation until success rate is very high — then redirect the freed time to things "you've never had bandwidth to do" or that "pet project that you always thought the company should do."

**The 95% trap is the hard part.** Cat is direct that 90–95% accuracy is where most automation efforts die: "If an automation doesn't work 100% of the time, it's not really an automation. And that last 5 to 10% does take more time. Also, building the automation is often a lot slower than you doing it yourself. I would encourage listeners to put in that time to scope some automation that you really want to get to 100%." She self-reports failure on this: she's been trying to teach Co-work to deliver inbox-zero on her Gmail and "it has been very time consuming and it is definitely not there."

Lenny relates: he set up an email rule for "spammy" inbound that's "95% great" but occasionally hides a real email — and resolves to push it to 100%.

**Two opposite anti-patterns.** Cat names them: never automate, or **over-customize**. "There's like this polar opposite end of people who obsess around customizing their tool, like adding a ton of skills and MCPs and these workflow improvements... that can even distract from your core goal of launching some product or building some feature... there's a camp of people who maybe spend so much time customizing that they're not sleeping and not doing the core task they originally set out to do." Lenny: "Look at my setup, it's so optimized — but what are you actually building?" Cat's punchline: **"the simple setups actually work better."**

**Build for daily use.** "I would really push people towards building apps that you're actually using every single day because I think only through that usage are you actually getting the value." A demo-only app teaches you almost nothing.

**Chat-based to action-based.** Cat names the shift directly: "The 2024 generation of products were chat-based and the Cloud Code generation of products is action-based. The big aha moment people have is when Claude can just do things on your behalf. It is an amazing feeling to know that the agent is capable of doing so much more than telling you what to do — the agent can actually just do it itself." Lenny calls out the **Cloud Code Chrome extension** as the canonical demo: "Fill out this form for me — alright, here I go."

**Lightning round.**

| Question | Answer |
|---|---|
| Books to recommend | *How Asia Works* (economic development & policy); *The Technology Trap* (industrial & computer revolutions and how they affected workers — "we can learn from history to make sure this transition goes well"); *The Paper Menagerie* (short stories on coming-of-age, AI, self-discovery) |
| Movie / show | *Drive to Survive* — "the purity of pursuing a singular engineering goal"; *Free Solo* — Cat is a rock climber and re-watching it after climbing made her appreciate "the kinds of moves he's doing… things I don't think I will ever be able to do in my lifetime if it were set in a gym one foot off the ground with a rope." |
| Product | **Waymo** — Cat is a "diehard Whymo user," uses it twice a day commuting. Two reasons: (1) zero guilt if it waits for her at curbside, (2) productivity — "I can call into a work call. I'm not worried about someone overhearing me… this has given me back like 30 minutes every day." She'd happily pay a 2× premium over Uber/Lyft. |
| Life motto | **"Just do things."** "Jobs are fake. If you understand the constraints, you can figure out what you can do and then just like try to do it quickly, learn from the mistakes, and apologize or fix them if you did something wrong." Lenny re-frames it as **agency / bias to action**. |
| Favorite Claude thinking word | **"manifesting"** (also her sticker) |
| Where to find Cat | `@catwoo` on Twitter — DMs open. Most useful contribution: send reproducible **edge cases / failures** for Cloud Code or Co-work. The team has an internal "user love" Slack channel for success stories and a feedback channel for issues — your bug report will end up there. |

**Closing.** Lenny on Anthropic's culture: "everyone I've met from Anthropic is so chill and so optimistic." Cat: "if you don't have it, you'll get pretty burnt out. We tend to hire people who have been in the industry for a while and have experienced lots of ups and downs and have a good sense for what gives them energy and how to maintain it over time."

## Visuals
- A **building-blocks tower**: bottom block = "single task succeeds" → "multi-task" → "50–100 parallel agents (remote)" with the four open-problem labels (triage, verification, trust, self-improvement) attached as side annotations.
- A **95% trap chart**: X-axis = effort, Y-axis = automation accuracy. Curve climbs steeply to ~90%, plateaus at 95%, with a sharp warning marker — "stops here = fragile / not actually an automation." Final 5–10% labeled "elbow grease" with Cat's quote.
- A **anti-patterns spectrum**: leftmost = "never automate"; rightmost = "over-customize / endless skills + MCPs"; middle = "simple setups that work." Above the line: "build apps you actually use daily."
- A **chat-based vs action-based** before/after card: 2024 generation ("tells you what to do") vs Cloud-Code generation ("does it itself"). Worked example: Chrome extension filling out a form.
- A **lightning-round dashboard**: 6 small cards — Books / Show / Product (Waymo, "+30 min/day") / Motto ("Just do things") / Thinking word ("manifesting") / Contact (`@catwoo`). Useful as a closing recap visual.
