# The Cloud Code Shipping Engine

> The mechanics behind Cloud Code's weekly cadence — clear team principles, weekly metrics readouts, "research preview" branding, and a tight launch pipeline that lets engineers turn ideas into shipped product without PM gatekeeping.

## Key Points
- **Three concrete mechanics drive the velocity**: (1) clear, written team principles + weekly metrics readouts, (2) shipping almost everything as a branded **"research preview"**, (3) a tight engineering ↔ marketing/docs/DevRel handoff via the **evergreen launch room**.
- **Rigorous metrics readouts run every week** for the entire team — so anyone understands the business and can act without escalation.
- The team principles document includes **who the key users are and why** — explicitly, "professional developers" — which lets people decide tradeoffs themselves.
- **PRDs still exist** but only for ambiguous features and infrastructure-heavy projects that take many months. For everything else, a one-pager (or nothing) suffices.
- The marketing pipeline turns around announcements **the day after** an engineer says a feature is ready. Sarah leads docs; Alex leads PMM; Tar and Lydia handle DevRel.
- The Frontier model (Mythos, in research preview) helps but does **not explain the bulk of the speedup** — process and team expectations do. "We've been moving pretty fast for several quarters."

## Details

**Goal-setting comes first because LLMs are too general.** Cat: "LMs are so general that actually creates a lot of ambiguity in who we're building for, what problems we're trying to solve, what the top use cases are." A great PM names the user (e.g., "professional developers"), the problem (e.g., "too many permission prompts → fatigue"), and the use case (e.g., "professional developers at enterprises safely get to zero permission prompts"). That single sentence rules out approaches and unblocks the team.

**Research-preview branding is a commitment-reduction device.** "We clearly brand this when we ship something so that users know that this is an early product. This is just an idea. This is just something that we're trying to get feedback on... it might not be supported forever. And what this does is it reduces our commitment for shipping something. We can just get something out in a week or two." This framing is psychological as much as operational: it gives the org permission to ship before the feature is fully baked, then iterate.

**The evergreen launch room is the cross-functional template.** The PM's job is to "create the framework for the team so that they know when to pull in cross-functional partners and what those cross-functional partners' expectations are." Concretely: when an engineer believes a feature is ready and dog-fooded, they post in the evergreen launch room. Sarah (docs), Alex (PMM), Tar and Lydia (DevRel) jump in and turn around the marketing announcement the next day. The friction for any engineer to ship something is now small because PM has done the institutional plumbing once.

**PRDs aren't dead, just narrowly scoped.** "We do PRDs sometimes... for features that are particularly ambiguous, it does help to write out just a one-pager on what the goals are, what the delightful use cases are, what the failure modes currently are that we need to fix. There are occasionally some projects, especially things that require heavy infrastructure, that do take many months. And for those situations, we do write PRDs still."

**Mythos is not the secret.** When Lenny asks if the unreleased Frontier model explains the velocity, Cat is direct: "We've been moving pretty fast for several quarters now. So I think it's not fully Mythos. Mythos is an incredibly powerful model... I don't think it explains the bulk of the increase. A lot of it is the process and the expectation on the team."

## Visuals
- A pipeline diagram: **Engineer Idea → Dog-food → Evergreen Launch Room → next-day marketing/docs/DevRel announcement → Ship**, with handoff times labeled (e.g., "1 day").
- A tradeoff card on **"Research Preview" as a commitment knob**: Y-axis = commitment, X-axis = time-to-user. Research preview occupies the low-commitment / fast-ship corner; "GA / supported forever" sits at the opposite extreme.
- A 3-row table of "Goal artifacts" used at Cloud Code: **Team principles** (always-on, written) / **Weekly metrics readout** (recurring) / **PRD** (rare, ambiguous or infra projects).
- A debunk panel labeled **"Mythos isn't the reason"**: simple bar chart showing two contributions to speed — "Process & expectations" (large) vs. "Frontier model access" (small) — with Cat's quote underneath.
