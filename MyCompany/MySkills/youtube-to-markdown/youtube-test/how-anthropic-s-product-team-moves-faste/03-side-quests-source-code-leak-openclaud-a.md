# Side Quests: Source-Code Leak, OpenClaud, and the PM Org

> Three rapid-fire topics — the leaked Cloud Code source code, the OpenClaud third-party-access decision, and a tour of Anthropic's ~30–40-PM org structure.

## Key Points
- The Cloud Code **source-code leak was human error**: a human-plus-Claude PR updating the package release pipeline went through **two layers of human review** and still slipped. Hardened processes have shipped; the engineer involved is still at Anthropic.
- The **OpenClaud restriction** was driven by capacity: third-party tools have different usage patterns than Anthropic's first-party products and weren't what the harness was designed for. Anthropic prioritized first-party product growth + the API.
- Subscribers got **credits alongside their subscription** as a partial migration path, but the strategic stance is: protect first-party scaling.
- Anthropic has roughly **30–40 PMs** organized into **5 teams**: Research PM, Cloud Developer Platform, Cloud Code, Enterprise, and Growth.
- The **Research PM team (led by Diane)** owns model-launch shepherding and feeds customer feedback to research.
- The **Cloud Developer Platform team** owns the APIs Cloud Code is built on, plus Managed Agents (host-on-your-behalf agents).
- The **Cloud Code team** ships both Cloud Code and Co-work core products.
- The **Enterprise team** handles cost controls, RBAC, security controls — adoption blockers for big customers.
- The **Growth team** owns growth across the entire product suite, including CDP API growth.

## Details

**The leak.** When the leak hit, the team investigated and traced it to a process failure: a human was working with Claude to write a PR — a routine update to how packages are released — and it cleared two human reviewers anyway. Cat is matter-of-fact: "this was a result of human error and we've hardened our processes to make sure that it doesn't happen in the future." Lenny asks if the engineer is still around; Cat: "Yes. It's a process failure and the most important thing is to just like learn from it and to add more safeguards."

**OpenClaud.** Cat frames it as a **demand-vs-design** problem: Claude has been seeing surging demand and the team has been "working very hard to both scale our infrastructure and also to make our harness more token efficient." The harness wasn't designed for third-party products with different usage patterns. The team spent meaningful time finding the most seamless transition — credits alongside the subscription — but the underlying call is to prioritize first-party products and the API. Lenny puts a finer point on it: "businesses are trying to make money. We're trying to be profitable here. We can't just like give away compute when it's so in demand."

**The PM org tour.** Cat lists five PM teams:

| Team | Owns |
|---|---|
| **Research PM** (Diane) | Customer feedback for models; model-launch shepherding |
| **Cloud Developer Platform** | API surface Cloud Code is built on; Managed Agents (Anthropic-hosted user agents) |
| **Cloud Code** | Cloud Code + Co-work core products |
| **Enterprise** | Cost controls, RBAC, security controls — making the products adoptable for big customers |
| **Growth** | Cross-product growth incl. CDP API growth |

Total headcount is "maybe around 30 or 40 PMs right now."

## Visuals
- An incident timeline showing **"human + Claude writes PR" → "two review gates pass" → "leak" → "process hardening shipped"**, with the punchline that two layers of review weren't enough.
- A capacity-allocation diagram for **OpenClaud**: a pie/bar split labeling "first-party Claude subscriptions + API" vs "third-party tools (OpenClaud)" with an arrow showing capacity being reallocated toward first-party.
- A 5-cell **PM org chart** with team name, lead (where named), and primary deliverable — useful as a "who does what" reference image.
- A "rough headcount" badge: **~30–40 PMs across 5 teams** to anchor the scale.
