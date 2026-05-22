# How Anthropic’s product team moves faster than anyone else | Cat Wu (Head of Product, Claude Code)

> **Channel:** Lenny's Podcast
> **Source:** https://www.youtube.com/watch?v=PplmzlgE0kg
> **Converted:** 2026-05-10
> **Duration:** ~85:30
> **Snippets:** 2356

---

## Transcript

[00:00] I think it is very hard to be the right
[00:02] amount of AGI pled. It's very easy to
[00:04] build the product for the super AGI
[00:07] strong model. The hard thing is figuring
[00:09] out for the current model, how do you
[00:11] elicit the maximum capability?
[00:13] >> I've never seen anything like the pace
[00:15] you folks at Anthropic are shipping at.
[00:17] >> We want to remove every single barrier
[00:19] to shipping things. The timelines for a
[00:21] lot of our product features have gone
[00:23] down from 6 month to 1 month and
[00:25] sometimes to even one day. You're
[00:27] interviewing hundreds of PMs and you
[00:29] just keep feeling like they're
[00:30] approaching it very incorrectly.
[00:32] >> The PM role is changing a lot. It's
[00:34] changing really quickly. The thing that
[00:36] is extremely important for building AI
[00:38] native products is iterating so quickly,
[00:41] figuring out a way for you to actually
[00:42] launch features every single week.
[00:44] >> What do you think are the emerging
[00:46] skills PMs need to develop?
[00:48] >> It comes back to product taste. As code
[00:50] becomes much cheaper to write, the thing
[00:52] that becomes more valuable is deciding
[00:54] what to write.
[00:56] Today my guest is Cat Woo, head of
[00:58] product for cloud code and co-work at
[01:00] Enthropic. Cat is at the center of
[01:02] everything that is changing in AI and
[01:05] product and building. And she and her
[01:07] team are building the product that is
[01:09] most changing the way that we all build
[01:11] our products. She is so full of insights
[01:14] and wisdom and lessons. This is an
[01:17] episode you cannot miss. Before we get
[01:19] into it, don't forget to check out
[01:20] lennisprobass.com
[01:22] for an insane set of deals available
[01:25] exclusively to Lenny's newsletter
[01:26] subscribers. With that, I bring you Cat
[01:29] Woo.
[01:33] Cat, welcome to the podcast.
[01:35] >> Thanks for having me.
[01:37] >> I have so many questions. I'm so excited
[01:39] to have you on this podcast. I want to
[01:41] start with giving people an
[01:42] understanding of your role alongside
[01:45] Boris. Uh, everybody knows Boris. This
[01:48] he's His episode is the number one most
[01:50] popular episode on this podcast. No
[01:51] pressure. He uh created Claude Code. He
[01:54] leads the team, ships uh a bazillion PRs
[01:57] a day from his phone. Just like I don't
[01:59] even know what the number is anymore. I
[02:01] think people don't give you enough
[02:03] credit for the success that Claude Code
[02:05] has had and co-work and all the things
[02:06] you all are building. help us understand
[02:09] your role on the team, how you work with
[02:11] Boris, how you split responsibilities,
[02:13] just like what does the PM role look
[02:14] like on on the CloudGo team?
[02:16] >> I feel very lucky to work with Boris.
[02:17] He's been an amazing thought partner.
[02:19] He's our tech lead. He's very much the
[02:22] product visionary and he is great at
[02:25] setting like this is what the product
[02:27] needs to be in like three months, six
[02:29] months from now. This is like what the
[02:30] AGI pill version of the product is. And
[02:34] a lot of my role is figuring out okay
[02:36] what is the path from where we are today
[02:37] to like that vision 3 to 6 months from
[02:41] now. And I I spend more of my time on
[02:44] the cross functional. So making sure
[02:46] that our marketing team, sales team,
[02:49] finance, capacity, etc. are like bought
[02:51] in on the plan and that we're all rowing
[02:54] the same direction and that once the
[02:56] feature is ready that there aren't any
[02:58] blockers to shipping it. I think in many
[03:00] ways it works well because we kind of
[03:02] like mindmeld but it is actually like
[03:04] remarkably blurry of a line. Like I
[03:07] think we're like 80% mind-l and then
[03:09] there's like this 20% of things that
[03:11] like maybe I care a lot more about them
[03:13] for us. So like I'll drive those and
[03:15] then like 20% where he cares a lot more
[03:17] than me and he just like drives those.
[03:20] >> This episode is brought to you by our
[03:21] season's presenting sponsor work OS.
[03:24] What do OpenAI, Anthropic, Cursor,
[03:27] Verscell, Replet, Sierra, Clay, and
[03:30] hundreds of other winning companies all
[03:31] have in common? They are all powered by
[03:33] work OS. If you're building a product
[03:36] for the enterprise, you've felt the pain
[03:37] of integrating single signon, skim,
[03:40] arbback, audit, logs, and other features
[03:42] required by large companies. Work OS
[03:45] turns those deal blockers into drop-in
[03:47] APIs with a modern developer platform
[03:49] built specifically for B2B SAS.
[03:52] Literally every startup that I'm an
[03:53] investor in that starts to expand up
[03:55] market ends up working with Work OS. And
[03:58] that's because they are the best.
[04:00] Whether you are seedstage startup trying
[04:01] to land your first enterprise customer
[04:03] or a unicorn expanding globally, work OS
[04:06] is the fastest path to becoming
[04:07] enterprise ready and unblocking growth.
[04:10] It's essentially Stripe for enterprise
[04:12] features. Visit works.com to get started
[04:15] or just hit up their Slack where they
[04:16] have actual engineers waiting to answer
[04:18] your questions. Work OS allows you to
[04:20] build faster with delightful APIs,
[04:23] comprehensive docs, and a smooth
[04:24] developer experience. Go to works.com to
[04:27] make your app enterprise ready today.
[04:30] Something that you shared actually
[04:31] before we started recording is the fact
[04:34] that you're interviewing hundreds of PMs
[04:36] all the time. Like if I had a nickel
[04:37] every time someone asked me for an intro
[04:39] to someone at Anthropic to go work at
[04:40] Anthropic as a PM, I'd be I'd be I'd
[04:42] have 30 billion in ARR.
[04:45] It's just like the number one place
[04:46] people want to go work at. So, I can
[04:48] only imagine how many PMs you're
[04:49] interviewing. You told me that you're
[04:51] just seeing people doing it, doing it
[04:53] wrong, the way they're approaching what
[04:56] they think it takes to be a successful
[04:57] AIP PM. Talk about what you're seeing
[04:59] and what people need to understand about
[05:01] what it is, what it takes to be
[05:02] successful these days.
[05:03] >> I think before AI, technology shifts
[05:06] were a lot slower. So, you could plan on
[05:08] the 6 to 12 month time horizons. And
[05:12] because you were shipping features at a
[05:14] bit of a slower rate, there was a lot
[05:16] more emphasis on coordinating with all
[05:18] the other partner teams to make sure
[05:20] that they're shipping features that
[05:22] unblock your features because code at
[05:24] that time was very expensive to make.
[05:26] Um, I think now with AI and with how
[05:29] much that has accelerated engineering
[05:32] and with how quickly the model
[05:34] capabilities are improving, the
[05:35] timelines for a lot of our product
[05:38] features have gone down from 6 months to
[05:40] one month and sometimes to one week or
[05:42] even one day. And with that, we actually
[05:45] need to make sure that products ship
[05:48] quite quickly. And what that means is as
[05:51] a PM, there should be less emphasis on
[05:55] making sure that you're aligning your
[05:58] like multi-quarter road maps with your
[05:59] partner teams and more emphasis on okay,
[06:02] how can we figure out the fastest way to
[06:05] get something out the door? How can we
[06:06] figure out how to make like a concept
[06:09] corner of our product suite where we can
[06:11] just an engineer has an idea or a PM has
[06:14] an idea and like by the end of the week
[06:17] we are able to get into our users hands.
[06:19] I I think the PMs who do the best on AI
[06:22] native products are are the ones who can
[06:25] figure out how can I like shorten the
[06:27] time from having this idea to actually
[06:29] getting the product in the hands of
[06:31] users and help define what are the most
[06:33] important tasks that need to work out of
[06:36] the box for my product. So, what I love
[06:38] about this is what you're saying is just
[06:39] like people haven't grasped how fast
[06:42] they need to move and what how much of
[06:45] the job now is just moving is helping
[06:47] the team move fast. What what helps do
[06:50] that? What do you what do you do? What
[06:52] does your PM team do to help them move
[06:54] this fast other than have access to the
[06:56] the most advanced models? I think the
[06:58] first thing is to set clear queer goals
[07:00] because LMS are so general that actually
[07:03] creates a lot of ambiguity in who we're
[07:05] building for, what problems we're trying
[07:07] to solve, what the top use cases are.
[07:09] And so I think a great PM is able to
[07:11] say, okay, our our key user is
[07:14] professional developers. Uh the main
[07:16] problem that we want to solve for this
[07:18] feature is maybe there's like too many
[07:20] permission prompts and people are
[07:22] feeling fatigue. And like the the use
[07:24] case is we we want professional
[07:28] developers at enterprises to safely get
[07:30] to zero permission prompts. And that
[07:32] actually sets a pretty clear goal
[07:33] because it it rules out a lot of
[07:35] potential approaches for reducing
[07:37] permission prompts so that people can uh
[07:40] get a lot more done with one prompt. And
[07:42] then I think the second thing that's
[07:44] very important is figuring out some
[07:47] repeatable process for getting these
[07:49] features shipped. So uh for cloud code
[07:52] what we do is we actually ship almost
[07:54] all of our features in research preview.
[07:56] We clearly brand this um when we ship
[07:59] something so that users know that this
[08:01] is an early product. This is just an
[08:03] idea. This is just something that we're
[08:05] trying to get feedback on and iterating
[08:06] on and that this might not be supported
[08:08] forever. And what this does is it
[08:10] reduces it reduces our commitment for
[08:13] shipping something. We can just get
[08:14] something out in a week or two. And then
[08:17] the third thing that a PM should do is
[08:19] help create the framework for the team
[08:21] so that they know when to pull in cross
[08:23] functional partners and what those
[08:25] crossunctional partners expectations
[08:26] are. So for example, we have a really
[08:29] tight process between engineering,
[08:31] marketing and docs. So when engineers
[08:34] have a feature that they feel is ready
[08:36] and that we've dog fooded internally,
[08:38] they post it in our evergreen launch
[08:40] room. And then Sarah who leads our docs
[08:43] and Alex who leads PMM and Tar and Lydia
[08:46] on Devril just like jump in and can turn
[08:48] around the the marketing announcement
[08:51] for it the very next day. And because we
[08:53] have this really tight process it lowers
[08:54] the friction for any engineer to ship
[08:56] something and PM is the role that should
[08:58] be setting this up.
[08:59] >> How do PRDs fit into this? The fact that
[09:01] you said that goals are a really
[09:03] important part just like being aligned
[09:04] on what does success look like? Who is
[09:05] this for? Who's this not for? Are you
[09:07] writing PRDs? Is it just like a couple
[09:08] bullet points? How does how's that
[09:10] evolved in the the world of a BM?
[09:12] >> So there's two two things that we do.
[09:14] One is we have very rigorous metrics and
[09:17] we do metrics readouts with the entire
[09:19] team every week. The goal of this is to
[09:21] make sure that everyone deeply
[09:23] understands all the facets of our
[09:24] business. What our key goals are, how
[09:26] they're trending, and what drives them.
[09:29] The second thing that we do is we have
[09:31] this list of team principles. And this
[09:34] includes who our key users are, why
[09:36] those are our key users. And the reason
[09:39] that we articulate all of this is so
[09:41] that everybody on the team feels like
[09:43] they understand how our business works.
[09:45] They understand what's important to us
[09:47] and what we're willing to trade off. And
[09:49] it lets people make decisions by
[09:51] themselves without feeling like they're
[09:52] blocked on PM or any other stakeholder.
[09:55] >> I love how so much of this is like,
[09:56] okay, we still need PMs in the future.
[09:58] There's so much talk of like why do we
[09:59] need PMs? We're just going to ship and
[10:01] build. We need engineers.
[10:03] >> Oh, we actually do PRD sometimes. So I I
[10:05] think for features that are like
[10:07] particularly ambiguous, it it does help
[10:09] to write out just a one-pager on what
[10:11] the goals are, uh what the delightful
[10:14] use cases are, what the failure modes
[10:17] currently are that we need to fix. And
[10:19] there are occasionally some projects,
[10:21] especially things that require heavy
[10:23] infrastructure that do take many months.
[10:26] And for those situations, we do write
[10:28] PRD still.
[10:29] >> I want to drill a little bit further
[10:31] into just how you're able to move so
[10:34] fast. I've never seen anything like the
[10:36] pace folks at Anthropic are shipping at
[10:39] like someone made this calendar of
[10:41] launches across Anthropic and it was
[10:43] literally every day there was like a
[10:45] major feature or product. So, one
[10:48] question people had online is uh you
[10:50] guys just launched this uh inc not
[10:52] launch but built this incredible model
[10:54] mythos that is still in preview because
[10:56] it's so powerful people are a little
[10:58] afraid of what it can do. Have you guys
[11:00] been using this? Is this part of the
[11:01] reason you've been able to move so fast?
[11:03] >> We've been moving pretty fast for
[11:06] several quarters now. So, I think it
[11:09] it's not fully mythos. Um mythos is an
[11:12] incredibly powerful model. But we do use
[11:13] the models internally and I think this
[11:16] has increased our rate of shipping a
[11:18] little bit but I don't think it explains
[11:20] the bulk bulk of the increase. I I think
[11:22] a lot of it is the process and the
[11:24] expectation on the team. So we're very
[11:26] low on process. We want to remove every
[11:29] single barrier to shipping things. We
[11:31] want to make sure every single person on
[11:32] the team feels empowered to take their
[11:35] idea from just an idea to like out in
[11:38] the world in less than a week, sometimes
[11:40] even in a day.
[11:41] >> Cool. Oh man, what a what an advantage
[11:43] to have the best model and also be
[11:45] building product. That's so cool.
[11:46] >> We are very lucky to be able to work
[11:48] with the Frontier models.
[11:49] >> Oh my god, what a what an awesome
[11:51] advantage. Just like build a thing and
[11:53] then use it and then accelerate faster.
[11:54] It's so interesting. There's a couple
[11:56] like these other side things I want to
[11:57] just kind of go on these like side
[11:58] quests on this conversation. There's so
[12:00] much happening with Anthropic and I just
[12:01] I'm so curious to get your insight. One
[12:03] is uh a week ago or so the whole source
[12:07] code of cloud code leaked. Somebody got
[12:08] it out there. I think it was a mistake
[12:10] someone made. Is there anything you
[12:11] comment there just like what happened?
[12:13] What went wrong? What should people
[12:14] know?
[12:15] >> So we immediately looked into this when
[12:17] we saw it. Um we realized that this was
[12:20] the result of human error. There was um
[12:23] a human working with claw to write uh
[12:25] PR. This was just an update to how we
[12:27] release our packages and it actually
[12:31] went through two layers of human review.
[12:33] And so th this was a result of human
[12:35] error and we've hardened our processes
[12:37] to make sure that it doesn't happen in
[12:39] the future. Is this person still at
[12:40] anthropic? Are they doing it right?
[12:42] >> Yes. Yes. It's it's a process failure
[12:44] and the most important thing is to just
[12:47] like learn from it and to add more
[12:48] safeguards so that doesn't happen again.
[12:50] And so that's that's what we've been
[12:52] focused on and most of those have
[12:53] shipped.
[12:54] >> Okay. Uh another question I had is open
[12:57] claw. Uh so recently there's been this
[13:00] move to keep people from using claude
[13:04] subscription with their open clause.
[13:06] People get got really upset. that
[13:08] they're confused why this is happening.
[13:09] It feels like you're there's like, you
[13:11] know, harm caused to the open source
[13:13] community. What what do people what do
[13:15] people need to understand about kind of
[13:17] what went into this decision?
[13:18] >> So, we've been seeing a lot of demand
[13:20] for quad and we've been working very
[13:22] hard to both scale our infrastructure
[13:25] and also to make our harness more token
[13:27] efficient so that you can get more usage
[13:28] out of it. It wasn't designed for third
[13:31] party products which have different uh
[13:34] usage patterns than our first party
[13:36] ones. We spent a bunch of time
[13:39] trying to figure out what is the most
[13:42] seamless transition that we can offer.
[13:44] And so I was very happy to be able to
[13:47] say that everyone gets some credits
[13:49] alongside their subscription. But yeah,
[13:51] we we did have to make the hard decision
[13:52] that we needed to prioritize our first
[13:55] party products and our API. And so this
[13:58] is this is a decision that resulted from
[14:00] that. Yeah, this like to me it makes so
[14:02] much sense. Like you guys are
[14:03] subsidizing this usage at like 200 bucks
[14:07] a month and there's like it's like
[14:09] basically unlimited use of this and like
[14:11] I think people don't understand
[14:12] businesses are trying to make money.
[14:14] We're trying to be profitable here. We
[14:15] can't just like give away compute when
[14:17] it's so in demand. So I get it. Coming
[14:20] back to the PM team, what is just like
[14:22] the PM team look like at Enthropic? How
[14:24] many PMs are there? How are they kind of
[14:25] organized?
[14:26] >> Yeah, so we have a few PM teams. Um I
[14:29] think we're maybe around 30 or 40 PMs
[14:31] right now. Uh so we have the research PM
[14:34] team uh who Diane leads and this team is
[14:38] responsible for understanding all of the
[14:40] feedback from our customers for our
[14:42] models and then feeding that to the best
[14:44] research team to act on it and they also
[14:46] shepherd the model launch. Um there's
[14:49] the cloud developer platform team that
[14:51] maintains the APIs that cloud code is
[14:53] built on top of and they also release
[14:57] things like managed agents which is a
[14:59] way for you to build your agents and we
[15:01] can host it on your behalf. And then
[15:03] there's cloud code that works on both
[15:06] cloud code and the co-work core
[15:07] products. There's enterprise that helps
[15:11] make cloud code and co-work easier to
[15:12] adopt for all of our enterprise
[15:14] customers. And so this is everything
[15:16] from like cost controls, arvback,
[15:19] security controls and just making sure
[15:21] that these enterprises feel very
[15:23] confident and comfortable uh using using
[15:25] our tools and then we also have our
[15:29] growth team that is responsible for
[15:30] growing across our entire product suite.
[15:32] So we work very closely with them on
[15:34] cloud code and co-work growth and I know
[15:36] they also work with um our other teams
[15:39] on C CDP growth. So growth of people who
[15:42] use the cloud API. So speaking of
[15:44] growth, so Amole was just on the
[15:45] podcast. He had this really interesting
[15:47] insight that most people haven't been
[15:48] sharing. There's always this sense that
[15:51] we need fewer PMs in the future. What's
[15:52] the why do we need PMs? Engineers can
[15:54] just ship. Uh his take is that because
[15:56] engineers are moving so fast, PMs and
[15:59] designers are squeezed. There's less
[16:01] time to stay on top of everything that
[16:02] is happening. Every there's a feature
[16:04] shipping every day. So his take is he
[16:06] needs more PMs because it's hard to keep
[16:08] up. What's your take there? Do you feel
[16:10] like there will be an increase in hiring
[16:11] of PMs? What do you think is going on
[16:13] with the PM profession long term?
[16:15] >> I think all of the roles are merging.
[16:17] PMs are doing some engineering work,
[16:20] engineers are doing PM work, designers
[16:22] are PMing and also landing code. You can
[16:26] either hire a lot more engineers who
[16:28] have great product taste or you can uh
[16:31] keep your engineering hiring the same
[16:32] and hire a lot more PMs to help guide
[16:36] some of their work. Um on our team we're
[16:40] pretty focused on hiring engineers with
[16:42] great product taste. This this way we
[16:45] can reduce the amount of overhead for
[16:47] shipping any product. Like there are
[16:49] many engineers on our team who are fully
[16:52] able to end to end go from see user
[16:55] feedback on Twitter through to like ship
[16:57] a product at the end of the week with
[16:59] almost no product involvement. And this
[17:01] I think is actually like the most
[17:02] efficient way to ship something. So I I
[17:06] think like engineer and PM are kind of
[17:09] overlapping and you will get a lot of
[17:12] benefit from having more of either. I
[17:14] think product taste is still a very rare
[17:18] skill to have and we'll pretty much hire
[17:21] anyone who we feel has demonstrated this
[17:24] strongly.
[17:25] >> And your background was in engineering,
[17:27] right?
[17:27] >> Yeah, I was an engineer for many years.
[17:30] I was then a VC very briefly uh before
[17:33] joining anthropic and actually almost
[17:36] all the PMs on our team have either been
[17:38] engineers or ship code uh here on cloud
[17:42] code and so that that's one of the
[17:44] things that I think helps build trust
[17:45] with the team and also just enables
[17:48] us to move a lot faster and then
[17:50] actually our designers also have been
[17:53] front-end engineers before
[17:54] >> wow because that's that's the big
[17:56] question like there's definitely this
[17:57] merging that's happening the ven
[17:59] diagrams you're combining. I think the
[18:00] big question for a lot of people is if
[18:02] you're coming from engineering or
[18:03] product or design, which of those core
[18:05] skills is going to be most valuable? I
[18:07] could see it anthropic and on cloud
[18:08] code, engineering is very valuable. I'm
[18:10] curious if other companies, if you have
[18:12] a design background, becoming a PM is
[18:14] more valuable or just a PMP.
[18:16] >> I still think it comes back to product
[18:18] taste. Like as code becomes much cheaper
[18:21] to write, the thing that becomes more
[18:23] valuable is deciding what to write. Like
[18:25] what is the right UX for this feature?
[18:28] What is the most delightful way that a
[18:30] user can experience it? What like we we
[18:33] get tens of thousands of GitHub issues
[18:36] asking for every single thing under the
[18:38] sun and it takes a lot of care and taste
[18:44] to figure out okay which of these is
[18:46] worth building and what is the right way
[18:47] to build it and I think that that skill
[18:50] set can come from any background but I
[18:52] think that's the most important thing. I
[18:53] think the reason why an engineering
[18:55] background is particularly useful at
[18:58] least for the next few months is if you
[19:02] have an engineering background, you have
[19:04] a better sense for how hard something
[19:05] should be. And that's often a factor in
[19:07] what you choose to build. So like if
[19:09] something is very easy to build, then
[19:11] maybe instead of debating it, you just
[19:13] spend an hour doing it. But if something
[19:15] is harder to build and you know that
[19:17] upfront that you know that okay uh this
[19:20] will just like cost a lot more for for
[19:23] our team to get this out the door. So it
[19:25] helps a bit with the prioritization.
[19:27] >> You said uh in the next for the next few
[19:29] months is that just like because the
[19:31] models will get so good potentially in
[19:34] the next few months. You may not even
[19:35] need to know that as much. I think the
[19:38] valued skill sets does change quite
[19:40] frequently and so it's really hard to
[19:43] predict more than a few months out. So
[19:45] it's less a commentary on what shift I
[19:49] think will happen and more of a
[19:50] commentary that I think large shifts
[19:52] will happen.
[19:53] >> So you're not saying that's when mythos
[19:54] comes out and we'll change everything
[19:56] and that we don't need to know anything
[19:58] about engineering. No, I'm just saying
[20:00] that every every few months it seems
[20:02] like there's a
[20:02] >> yeah,
[20:03] >> there's a large increase in coding
[20:06] capability which then changes what other
[20:08] roles are valuable. I think the
[20:12] >> the most important thing is to be able
[20:14] to
[20:16] to have this like first principles
[20:19] thinking where you can figure out how
[20:22] the tech landscape is changing what the
[20:25] team really needs from you and to like
[20:28] jump in and fix that hole because I
[20:32] think the work is becoming more
[20:34] amorphous which means that a great PM is
[20:38] able to understand what all the gaps are
[20:41] to figure out what the highest priority
[20:43] ones are and then to just like figure
[20:45] out okay how do I learn that skill set
[20:47] or what is like the skill set that I
[20:49] have that I can like apply to this
[20:51] challenge. So I I think the current
[20:54] environment values people who are who
[20:58] are able to wear a lot of hats are able
[21:00] to swap them and are like very low ego
[21:03] about what work they do to help the team
[21:05] move faster.
[21:06] >> I love this answer. There's this
[21:08] question I've been asking people in your
[21:10] in your shoes, folks that are kind of at
[21:11] the bleeding edge of what AI is capable
[21:13] of and building with the latest tools,
[21:14] which is just like where will human
[21:16] brains continue to be useful and
[21:18] necessary for a while until we get to
[21:21] super intelligence. What I'm hearing
[21:22] here is essentially
[21:25] picking the things to work on, knowing
[21:27] where the market's going and figuring
[21:29] out where what to prioritize
[21:30] essentially. And then it's knowing if
[21:32] the thing you've built is good and right
[21:34] and getting it out there in some early
[21:36] version at least. Does that sound right?
[21:38] Is there anything else of just like
[21:39] where human brains will continue to be
[21:41] useful for at least the next few months?
[21:43] >> I think humans still provide a level of
[21:46] common sense that the models don't.
[21:49] And there's like a thousand moving
[21:52] pieces to any product launch. Some of
[21:54] them are very small, but there's always
[21:56] a lot that could potentially go wrong.
[21:59] I think the model doesn't always have a
[22:01] great sense of who all the stakeholders
[22:04] are, how they relate to each other, what
[22:06] their preferences are, what are the
[22:07] right venues to communicate with them to
[22:09] keep them on board. I think a lot of
[22:11] this like more tacic common sense like
[22:14] EQ kind of knowledge is is still very
[22:17] valuable. Of course, we want the models
[22:19] to get better at this and I think they
[22:21] will be, but right now I think there's
[22:24] still gaps. How do you just kind of deal
[22:26] as a human going through so much
[22:28] constant change just like just being on
[22:30] the inside of the tornado? Maybe it's
[22:31] calm there, but just like how do you how
[22:34] do you stay on top of what's going on?
[22:35] How do you stay sane through all this
[22:37] craziness that we're moving through?
[22:39] >> I think our team is full of people who
[22:40] lean into the chaos. So, we try to face
[22:44] every challenge with a smile because
[22:46] there's always so much going on. There's
[22:48] all there's always so many risks and
[22:50] tricky situations that you know if you
[22:53] get too stressed about anything you'll
[22:54] burn out. And so we really look for
[22:57] people who
[22:58] can kind of like look at a challenge be
[23:01] like that's going to be hard but I'm
[23:03] excited to tackle it and I'm going to do
[23:05] the best that I possibly can and I know
[23:07] I won't be perfect but I'll be able to
[23:10] sleep at night knowing that I did my
[23:11] best. That's an interesting answer to
[23:13] just like what skills will be important
[23:16] in this future because it's I forget who
[23:17] said this, maybe Ben man that this is
[23:19] the most normal this is the world will
[23:21] ever be.
[23:23] >> Yeah, it definitely gets harder. Like I
[23:24] feel like there are a lot of weeks where
[23:28] maybe Sunday night there's some like P 0
[23:30] and then by Monday there's like a P 0
[23:32] and by Monday afternoon there's a P 0000
[23:35] and you're like wow, I can't believe I
[23:36] was so worried about that P 0 from
[23:38] Sunday.
[23:40] But I think you just have to acknowledge
[23:42] that there's only so much that you can
[23:43] do that you need to sleep well so that
[23:45] you can make good decisions next day and
[23:48] just like brutally prioritize where you
[23:50] spend your time. What's the most
[23:51] important thing to get right? And be
[23:53] okay letting things go. Like there's
[23:55] there's products that we ship that
[23:57] aren't as polished as I wish they were.
[24:00] But you know, our our top goal is to
[24:04] help empower professional developers.
[24:06] And if a product isn't successful, as
[24:09] long as it's not blocking the core use
[24:11] case, it's okay because we'll hear the
[24:15] feedback and we'll fix in the next
[24:16] release. Launching a feature that is
[24:18] buggy is the kind of thing that would
[24:20] have kept me up at night. But it is
[24:24] something that I am now able to like
[24:26] live with knowing that okay, we're going
[24:28] to get that quick feedback and we're
[24:29] going to fix it in the next release.
[24:31] What I'm imagining is there's that gift,
[24:33] I think it's maybe from Pirates of the
[24:34] Caribbean, where it's this guy walking
[24:36] down a pair of stairs on a ship and the
[24:38] whole ship is just being demolished
[24:40] around him and he's so chill, just
[24:42] strolling down the staircases,
[24:43] everything's falling apart. And that's
[24:45] interesting because everyone I've met
[24:46] through from Anthropic is just so chill
[24:48] and just so like optimistic.
[24:51] >> Yeah, that's I think that's a really
[24:52] interesting insight is just like having
[24:54] this calmness and optimism versus just
[24:57] like, oh my god, everything's crazy and
[24:58] going going nuts. Yeah, I think if you
[25:01] don't have it, you'll get pretty burnt
[25:03] out. I I think we also tend to hire
[25:05] people who have been in the industry for
[25:08] a while and have experienced lots of ups
[25:10] and downs and have a good sense for what
[25:14] gives them energy and how to maintain
[25:17] their energy over time and I think
[25:18] that's helped us a lot.
[25:20] >> So interesting. Something that I wanted
[25:22] to ask about is so there's these roles
[25:23] blurring. Engineers are becoming PMs,
[25:26] everyone's dogs are cats, everyone's
[25:27] everyone. What what do we lose in that
[25:29] in that world? Do we lose like career
[25:32] ladders and clear career paths? Do we
[25:34] lose design consistency, code quality?
[25:36] You know, there's probably some
[25:37] downsides. What are some things you find
[25:39] are just like, okay, that's something
[25:40] we're sacrificing for the greater good.
[25:42] >> We're sacrificing product consistency.
[25:45] Historically, when code was expensive to
[25:48] write, you would carefully plan out
[25:50] everything in your product suite, how
[25:52] every product relates to each other,
[25:54] what the use case for every single one
[25:56] is, how they integrate, and you would
[25:59] pretty much have one product for each
[26:01] use case. And now with AI moving so
[26:04] quickly and with so many ideas that we
[26:08] need to test out, we do sometimes have
[26:11] features that overlap with each other. A
[26:14] lot of the times it's because there's
[26:16] two form factors that we love internally
[26:18] and we want to we want the external
[26:19] audience to tell us which one is better.
[26:22] What that means for someone who's a new
[26:25] user though is a new user might not know
[26:29] okay what is the best path to accomplish
[26:32] X. There is more education we need to do
[26:36] to help people understand what the core
[26:38] features are and what the best practices
[26:40] are for using them. I I think this is
[26:42] the this is the cost of launching a lot
[26:46] of features. Um I think users also feel
[26:49] like it's hard to keep up with the
[26:51] latest.
[26:53] Usually in traditional PM you ship a
[26:56] feature every like month or quarter. And
[26:58] so it's really easy for a user to to
[27:01] understand okay I just need to check in
[27:03] on this once a month and I'll learn some
[27:04] new things and if I ignore it for six
[27:07] months it's fine. I don't feel like I'm
[27:09] missing out. I think with these agentic
[27:12] tools, not just called code and co-work,
[27:14] but like across the whole ecosystem,
[27:16] people feel this need to like check
[27:19] Twitter every single day to see what the
[27:21] absolute latest thing is.
[27:24] And I think there's more we can do to
[27:27] help people feel less like they're on
[27:30] this ever increasingly fast treadmill
[27:34] and that they feel like I I would love
[27:37] people to feel like they can just open
[27:38] these tools. The tools will educate them
[27:41] um or like teach them what they want to
[27:43] know and that they can just feel more
[27:47] bought along.
[27:48] >> Yeah, I saw you launch this really
[27:49] interesting feature the other day. I
[27:50] think it's / powerup where it basically
[27:52] walks you through all the cool ways and
[27:54] all basically all the best practices to
[27:55] use cloud code. Is that kind of along
[27:57] these lines?
[27:57] >> Yeah, exactly. So, in the past, we
[27:59] didn't actually want to do something
[28:01] like PowerUp because we felt like the
[28:02] product should be intuitive enough that
[28:05] you can that you don't actually need to
[28:08] go through any tutorial. And over time,
[28:11] we've just realized that there's just so
[28:13] many features and there's so much demand
[28:15] for a built-in onboarding experience
[28:18] that we we diverged a bit from our
[28:20] original principle saying no no
[28:22] onboarding flow and added this because
[28:25] there's just so many users who wanted to
[28:27] know there's 100 features. What are the
[28:29] 10 that I absolutely need to use? And so
[28:31] we put that together.
[28:32] >> Yeah, it's such a bizarre world. So
[28:34] Anthropic has been really successful
[28:35] with B2B enterprises where traditionally
[28:37] you don't launch a bunch of stuff. you
[28:39] just kind of have a quarterly release
[28:40] maybe and it's like the opposite of
[28:42] every day we got something new. So just
[28:43] maybe following that thread the run
[28:45] anthropic has been on is just
[28:48] otherworldly. Anthropic was way behind
[28:51] when it started. It was all shared this
[28:53] just like one of the least funded
[28:55] companies. Didn't have distribution.
[28:56] Wasn't the first to go. Openai was way
[28:58] ahead. It was just like no way Anthropic
[29:00] has any chance to compete significantly
[29:03] long term. Now it's just killing it.
[29:05] just beating the biggest companies teams
[29:08] with so much just like the growth is
[29:11] just uh like 11 billion dollars in ARR
[29:14] in one month% growth by the time this
[29:17] comes out it probably be even higher
[29:20] just being on the inside what what are
[29:22] some ingredients that have allowed
[29:24] Anthropic to be this successful and kind
[29:26] of come from behind and do this well
[29:29] >> the two most important things are one
[29:32] this unifying mission it's hard to state
[29:35] how important this is. We hire people
[29:39] who care most about bringing safe AGI to
[29:43] all of humanity. And this is actually
[29:46] something that we reference frequently
[29:49] in our decisions about what our entire
[29:52] product or should focus on shipping. And
[29:55] because we put this like mission above
[29:57] any individual product line, we're able
[29:59] to make very fast decisions that cut
[30:02] across the entire org and like execute
[30:04] on them in a unified way. So I think
[30:07] this is this is like something that I've
[30:09] never seen at a company of our scale.
[30:12] >> And so just to make sure that's clear.
[30:13] So essentially having the the number one
[30:15] mission is safety alignment, making sure
[30:18] AI is good for the world. And you're
[30:19] saying just having that as a clear
[30:22] mission makes decisions a lot easier to
[30:24] make.
[30:24] >> If there's two competing priorities,
[30:26] we'll talk about which one is more
[30:28] important for Anthropic's mission. And
[30:30] it makes it a lot easier to decide which
[30:32] of the two we prioritize. And then
[30:35] everyone will stand behind the one that
[30:38] we decide. And so sometimes that means
[30:40] that like, hey, we want to ship
[30:41] something on cloud code, but this other
[30:43] thing is more important. And so we depp
[30:44] prioritize shipping this and we just
[30:46] wait until later. What's really
[30:47] interesting about that is that explains
[30:48] I think versus another company maybe
[30:51] rhymes with bopen bi uh did a lot of
[30:54] different things and what I'm hearing
[30:56] here essentially is like okay we're not
[30:58] going to launch social network we're not
[30:59] going to launch uh a feed of interesting
[31:02] information because it's not aligned to
[31:04] this mission and and that has kept
[31:06] anthropic focused which is seems to be a
[31:08] core ingredient to the success
[31:10] >> well when when I think about mission I
[31:12] think about putting anthropics goals
[31:15] ahead of any individual or or any
[31:17] individual product. And so for me, it's
[31:22] I think the second thing that we're very
[31:24] good at is focus. I think mission to me
[31:26] is slightly different. Mission means
[31:29] that
[31:31] teams are willing to make sacrifices
[31:33] that hurt their own goals and their own
[31:36] KRs in service of anthropics goals and
[31:38] anthropics KRs. And
[31:41] people are very happy to make those
[31:43] trade-offs. So like an extreme example
[31:46] is if cloud code failed but enthropic
[31:49] succeeded I would be extremely happy and
[31:52] like we're like the whole team is very
[31:54] willing to make decisions that follow
[31:57] that chain of thought.
[31:58] >> I don't know if you can talk about this
[32:00] in depth but do you feel like the open
[32:02] claw decision is a part of this just
[32:03] like okay this is not furthering the
[32:05] mission of enthropic we need to stop
[32:08] this because it's not working in the way
[32:09] we want it to work. I think one of the
[32:11] most important things for Anthropic is
[32:13] to grow the number of users that we're
[32:16] able to reach. One of the ways that
[32:18] we're able to do this is with the cloud
[32:20] subscriptions with our first party
[32:21] products and so we just very much want
[32:24] to double down on that, but that does
[32:26] come at the expense of third party
[32:28] products sometimes.
[32:28] >> So we've been talking about cloud,
[32:30] co-work, all these things. Something
[32:31] that I want to make sure people get and
[32:33] I'm curious just how you use these
[32:34] tools. So there's cloud code, there's
[32:36] cloud desktop, there's co-work. What's
[32:40] the best way to understand when to use
[32:42] which? When do you use each of these
[32:44] three?
[32:44] >> So, I tend to use uh cloud code in the
[32:47] terminal when I'm just kicking off like
[32:50] a one-off coding task and I want all of
[32:53] the latest features. Uh the CLI is our
[32:56] initial product surface and it's also
[32:58] the one where our features often land
[33:00] first and so it's the it's the most
[33:03] powerful of all the tools. So that's
[33:06] that's what I tend to use when I'm just
[33:07] like trying to kick off one or like
[33:10] maybe like a handful of tasks at a time.
[33:12] I think desktop really shines when
[33:14] you're doing something that requires
[33:16] front-end work. And so one thing that I
[33:18] love to do is to use our preview
[33:21] feature. So if I'm building a web app,
[33:23] I'll often use Cloud Code and desktop.
[33:26] I'll have the preview pane open on the
[33:27] right hand side so that I can actually
[33:29] see the web app that I'm making in real
[33:31] time as I'm chatting with Claude. It's
[33:33] also really great for people who want
[33:35] something a bit more graphical. Uh, a
[33:37] terminal can feel very unfamiliar to
[33:39] someone who's nontechnical. Um, you get
[33:42] a bunch of these like scary popups on
[33:44] your machine and you can't click around
[33:46] the way that you're used to in pretty
[33:48] much every other product that you use.
[33:49] So, there's a lot of people who just
[33:51] like don't feel comfortable in terminal.
[33:53] And if that's you, I would highly
[33:55] recommend checking out cloud code on
[33:57] desktop. Desktop is also great for
[33:59] getting an at a glance view of
[34:01] everything that's happening. So you can
[34:03] see your CLI terminal sessions in
[34:05] desktop. You can see your other desktop
[34:07] sessions. You can see your sessions that
[34:09] you kicked off on web and mobile. So
[34:12] it's a one-stop control plane where you
[34:14] can see all of your tasks. I think the
[34:17] benefit of web and mobile is that it's
[34:19] really great for kicking things off on
[34:21] the go. So CLI and desktop both require
[34:24] you to be on your local laptop. And this
[34:27] is contravening because sometimes you're
[34:29] out and about, you're like touching
[34:30] grass, you're going on a walk and you
[34:32] don't have your laptop open and you
[34:33] don't I can't I can't count the number
[34:36] of people who I've seen like holding
[34:38] their laptop open like tethered to their
[34:39] phone while they're outside. And this
[34:41] just means that we're missing a product
[34:44] that solves that need. And so for for
[34:46] me, what mobile lets you do is kick off
[34:49] these tasks on the go so that you don't
[34:52] you don't need to bring your laptop
[34:53] everywhere and make sure that your
[34:55] laptop's open wherever you are.
[34:57] >> I love that. I've I've seen people on
[34:58] plane like it's just like such a meme
[35:00] now. Just I need to finish let this
[35:01] agent finish. I can't shut this down. I
[35:03] need Wi-Fi.
[35:04] >> And then I think for co-work the the
[35:06] role that this fills is there's a lot of
[35:08] work that everyone does where the output
[35:10] isn't code. So whether that's like
[35:13] getting to Slack zero or inbox zero or
[35:15] whether that's creating a slide deck for
[35:18] some customer meeting that's coming up
[35:20] or whether that's writing a quick doc on
[35:23] what the goals of a feature are or what
[35:25] the launch plan for a feature is. All
[35:28] these tasks produce outputs that are
[35:30] non-code and co-work is best positioned
[35:32] for that. So the way that I split the
[35:35] products in my mind is if I'm building
[35:38] something where the output is code, I'll
[35:40] use cloud code or desktop or cloud code
[35:43] on mobile. And if the output is anything
[35:45] that's not code, I'll use co-work for
[35:48] it.
[35:48] >> People are just like sleeping on the
[35:50] success that co-work. It's just like
[35:53] growing incredibly fast and I think
[35:56] people still don't understand maybe what
[35:58] it's for. And so what if you give us a
[36:00] couple use cases just in your work as a
[36:02] PM? What are some like really
[36:03] interesting maybe unexpected ways you
[36:05] use co-work to save you time, get more
[36:07] work done?
[36:08] >> If you're getting started on co-work,
[36:10] the first thing that you really need to
[36:13] do is connect all the data sources that
[36:15] are relevant to your role because
[36:17] co-work can only do a great job if it
[36:19] has access to all the context that it
[36:21] needs to be able to curate the output
[36:23] for you. So what that means for me is I
[36:26] connect it to my Google calendar. I
[36:28] connect it to my Slack, to my Gmail, to
[36:30] my Google Drive so that it just knows it
[36:33] has the flexibility to find relevant
[36:36] context to ask questions to pull in
[36:39] threads and this this like substantially
[36:42] improves the quality of the result. The
[36:45] kinds of things I use it for are um like
[36:48] last night I was work where we have this
[36:50] code with cloud conference coming up and
[36:52] there's a few talks that I'm giving
[36:54] there and one of the talks that we're
[36:56] doing talks about the the transition of
[36:59] cloud code from an assistant to like a
[37:02] full-on agent and one of the things that
[37:05] I wanted to do in this talk was to
[37:07] showcase all of the products that we've
[37:09] been shipping that enable this
[37:11] transition and also to figure out okay
[37:14] what are the what are the success
[37:16] stories that people have had internally
[37:17] that we can use as demos. And so I I
[37:21] have my Google Drive connected, I have
[37:24] Slack connected, um Alex, who's our
[37:28] product marketer, put together like a
[37:30] draft of what the points that we that he
[37:32] thinks we should cover are. And so I
[37:34] just like fed this all into Co-work. I
[37:36] told Co-work the narrative that I want
[37:37] to tell. And it actually just worked for
[37:39] an hour. It it walked through Twitter to
[37:42] see what we launched. It looked through
[37:44] our evergreen launch room. It looked in
[37:46] our Cloud Code announce channel, which
[37:48] is where our team posts demos of what
[37:51] how they've been getting the most value
[37:53] out of Cloud Code. And it synthesized
[37:55] all this together to this 20page deck
[37:57] that I woke up to this morning and I
[37:59] read through it and it was like pretty
[38:00] good. There were there were a few
[38:02] tweaks, so I did have to give it a round
[38:04] of feedback. I I like my slides to have
[38:07] extremely minimal words and it was a
[38:09] little too wordy, but you know, it it
[38:12] was far faster than like what I would be
[38:15] able to produce. And because Co-work has
[38:17] access to our whole design system, it
[38:19] actually looks like an anthropic
[38:22] designer put it together. Like it when
[38:24] you visually see it, you're like, "Oh,
[38:26] this is like incredibly polished." So,
[38:29] uh these are the kinds of things that
[38:32] are so much faster. like this making
[38:34] this slide deck would have taken me
[38:35] hours, but instead it like turns out a
[38:38] draft that is actually quite good so I
[38:41] could focus on making sure that the
[38:42] demos are amazing that we plug into it.
[38:45] >> This sounds like a dream come true to
[38:46] PMs that putting decks together so
[38:48] annoying.
[38:49] >> It's so slow.
[38:51] >> I and I love people will see this deck
[38:53] whenever you present this. This will be
[38:54] out in the world to like obviously it's
[38:56] not the the oneshotted version, but
[38:58] you've iterated on it. So just to help
[39:00] people try this for themselves. So step
[39:03] one is connect their what did you say?
[39:05] Slack. What else do you suggest they
[39:07] connect?
[39:07] >> Slack, Google calendar, Gmail, G drive.
[39:11] You should connect your communications
[39:13] tools and where you store your source of
[39:16] truth data for what your team cares
[39:18] about, what you care about, and what
[39:20] you're working on.
[39:21] >> Okay. And then what was the prompt
[39:22] roughly that you put in there to
[39:24] generate this deck?
[39:26] >> So I just wrote make me a slide deck for
[39:28] the code with cloud conference. This is
[39:30] what our PMM suggested it should cover.
[39:32] This is the current draft that I made
[39:34] that I don't like. This is one that I
[39:36] made manually that I don't like, but I
[39:37] linked it. Can you start by creating a
[39:39] proposed outline with details? Also,
[39:41] make sure it doesn't overlap too much
[39:42] with a keynote talk, which is more
[39:44] important. And then Claude read a bunch
[39:47] of the links that I sent to it and
[39:49] created a proposed outline. So then I
[39:52] read through its proposal and all the
[39:56] different ideas that it had generated
[39:57] for what we could cover and I just made
[40:00] a decision on what I wanted to actually
[40:02] be in the final deck. And I think this
[40:04] is like an example of what the role of
[40:05] the PM still is today. It's like quad is
[40:09] a great brainstorming partner. It's able
[40:11] to synthesize a massive amount of
[40:14] information really quickly and present
[40:17] all of the possibilities to you. But uh
[40:20] the role of the PM is still to make the
[40:21] end decision of okay what what should
[40:24] belong in the final product. So for this
[40:26] what I ended up deciding was that I
[40:28] wanted the talk to talk to cover the
[40:31] progression from making local tasks
[40:33] successful to making every PR green to
[40:36] like helping engineers land more PRs and
[40:39] for each of these which demo would be
[40:41] the most compelling and then after this
[40:45] decision about the outline co-work just
[40:47] like went off for a few hours and built
[40:49] the whole slide deck.
[40:50] >> This is so awesome. What a what an
[40:52] awesome part of the job to not have to
[40:54] do anymore. Uh, and it feels like you're
[40:57] talking to essentially a deck designer
[40:59] that also has like actual knowledge
[41:01] about what you've worked on and and can
[41:04] like make it actually the content what
[41:07] you want it to be, not just make it look
[41:08] really nice. How did you um how did you
[41:11] do the design system piece? How does
[41:12] that work? How does it know the design
[41:14] system of Anthropic? So what I did for
[41:16] this is we actually already have like a
[41:19] standardized deck that we use across all
[41:22] of our external engagements. And so I
[41:24] just gave Claude access to that. And so
[41:26] it's able to see like what colors we
[41:28] use, what fonts we use, the different
[41:30] kinds of
[41:31] >> what's it called? Like slide formats
[41:34] that are possible. And so it has like 20
[41:36] of these example slides.
[41:37] >> Give an example. Got it. So you like
[41:38] upload here's our template work from
[41:40] this.
[41:40] >> Yeah. You can also connect to like your
[41:42] Figma MCP if you if you have your slide
[41:45] format um saved there and it can pull
[41:48] that in.
[41:48] >> Along those lines, something I'm always
[41:50] curious about is what's kind of in your
[41:52] in your stack of tools as a PM and
[41:54] anthropic obviously cloud code and
[41:56] co-work and all the anthropic tools.
[41:58] What else are you using? What are the
[42:00] Slack you mentioned? Is there anything
[42:01] else?
[42:02] >> So my stack is pretty heavily cloud
[42:05] code, co-work.
[42:07] Anthropic largely runs on Slack. Um, I
[42:10] feel like it's like the core OS of our
[42:12] company and day-to-day like
[42:17] a a lot of I I would say maybe 30% of my
[42:20] time is
[42:23] pushing the boundaries of what co-work
[42:26] can do so that I have a very strong
[42:29] sense of what we're not good at. And
[42:34] I spent a lot of time talking with the
[42:35] model to understand why it makes
[42:38] mistakes that it does. We actually have
[42:40] a lot of internal tools that we make.
[42:42] Like I think one of the things that
[42:44] Cloud Code has really unlocked for our
[42:46] entire company is it really lowers the
[42:49] barrier to making any custom app that
[42:52] you want. And so we we've seen this like
[42:55] surge in personalized work software that
[42:58] people are building for like custom use
[43:00] cases instead of um using tools that
[43:04] don't perfectly fit the use case.
[43:06] >> I got to hear more. What are what are
[43:09] some examples? What are things you've
[43:10] built other people built that are really
[43:11] popular and useful?
[43:12] >> One of the sales folks on Cloud Code, he
[43:16] he realized he was making these like
[43:18] repetitive decks over and over and over
[43:20] again. And so he actually has this web
[43:23] app that he built with the examples of
[43:26] the core quad code decks that we know
[43:28] work well. So like a 101, 2011 and
[43:30] mastering quad code. And then he has a
[43:33] way to input specific customer context
[43:35] that pulls from Salesforce that pulls
[43:37] from gong that pulls from other notes so
[43:39] that we can customize the decks for
[43:41] specific customers. And so it'll pull
[43:43] out things like okay this customer is
[43:46] using like bedrock or cloud called for
[43:49] enterprise or console which affects what
[43:51] features are available to them. Um it
[43:53] will pull out things like okay this
[43:54] customer is concerned about like the
[43:57] code review stage of the SLC. And so
[44:00] we'll add a slide about our code review
[44:02] features there. Um it'll pull out things
[44:05] like okay this customer needs to be like
[44:06] HIPPA compliant or needs XYZ security
[44:09] controls. And so we'll make sure to add
[44:11] a slide or two in their deck about that.
[44:14] And then for example, if if this is a
[44:17] customer that's on vertex or bedrock and
[44:20] doesn't want to use cloud for
[44:22] enterprise, then we'll just take out
[44:23] some of the slides that are called for
[44:25] enterprise only features. And so
[44:27] normally this is like manual work that
[44:29] could take 20 30 minutes
[44:32] or and so people either like spend that
[44:34] time doing it or they'll just decide not
[44:36] to do it and use the general deck. Uh
[44:38] with this it takes like a few seconds
[44:40] and you get a tailored deck.
[44:42] >> What's interesting about it's like Slack
[44:44] is like the tool that nobody's it's just
[44:46] like nobody's trying to create their
[44:48] own. Slack just continues to win and
[44:50] it's just like the way you describe it
[44:51] is kind of the OS of so many companies.
[44:53] It's so interesting like people talk
[44:55] about Salesforce as just like SAS. We
[44:57] don't need SAS software anymore. We're
[44:58] going to build our own. It's like Slack
[44:59] is a durable tool that nobody wants to
[45:02] try to compete with and build a better
[45:04] version. I think it's pretty important
[45:06] communications infrastructure and I
[45:08] think they do the core task of helping
[45:10] everyone get real-time updates
[45:12] incredibly well.
[45:13] >> Yeah. Like people hate on Slack, but
[45:14] it's really great at what it's trying to
[45:16] do and like the most cutting edge teams
[45:19] are are hooked on it. So interesting.
[45:21] >> Yeah. And I also love how custom how
[45:23] easy they've made to customize it. And
[45:26] so it's we we love making Slack bots and
[45:30] th this kind of like hackability uh
[45:33] means that we're able to integrate with
[45:34] Slack the way that we want to. So really
[45:36] appreciate Slack's work on that.
[45:37] >> Time time to buy some CRM stock. I am so
[45:41] excited to tell you about this season's
[45:42] supporting sponsor, Vanta. Vanta helps
[45:45] over 15,000 companies like Cursor, Ramp,
[45:49] Dualingo, Snowflake, and Atlassian earn
[45:52] and prove trust with their customers.
[45:54] Teams are building and shipping products
[45:56] faster than ever thanks to AI. But as a
[45:59] result, the amount of risk being
[46:00] introduced into your product and your
[46:02] business is higher than it's ever been.
[46:04] Every security leader that I talk to is
[46:07] feeling the increasing weight of
[46:09] protecting their organization, their
[46:11] business, and not to mention their
[46:12] customer data. Because things are moving
[46:14] so fast, they are constantly reacting,
[46:17] having to guess at priorities, and
[46:19] having to make do with outdated
[46:20] solutions. Vanta automates compliance
[46:23] and risk management with over 35
[46:25] security and privacy frameworks
[46:27] including SOCK 2, ISO 27,0001 and HIPPA.
[46:31] This helps companies get compliant fast
[46:33] and stay compliant more than ever
[46:35] before. Trust has the power to make or
[46:38] break your business. Learn more at
[46:40] vanta.com/lenny.
[46:42] And as a listener of this podcast, you
[46:43] get $1,000 off Vanta. That's
[46:46] vanta.com/lenny.
[46:48] Okay. Uh so you talked about all these
[46:50] different teams that and how they use
[46:52] cloud code and co-work to operate. Which
[46:55] teams do you find other than
[46:56] engineering? I imagine engineering is
[46:57] the biggest token spender, but if not
[46:59] that'd be really interesting. What
[47:00] what's kind of like the second place
[47:02] function right now for tokens?
[47:04] >> Oh, applied AI is amazing at pushing the
[47:07] boundaries of what quad code and co-work
[47:09] can do. A a lot of our applied AI team
[47:14] spends time with our customers helping
[47:16] them adopt our API. And so sometimes our
[47:20] applied team will for example make
[47:21] prototypes on behalf of these customers
[47:23] which cloud code makes so much faster
[47:26] than it used to be. They they also have
[47:29] the dual goal of needing to manage a lot
[47:32] of customer coms, a lot of like customer
[47:35] inbound and historical context call
[47:38] notes. And so they're both extremely
[47:40] heavy on co-work and on cloud code.
[47:42] >> And just to understand applied AI, is
[47:44] that like is that like forward to play
[47:46] engineering sort of role? Like what do
[47:47] they how would you how would most people
[47:49] describe what applied the applied AI
[47:51] team is doing? Yeah, it's helping our
[47:53] customers adopt the latest API and uh
[47:57] model features um across their company
[47:59] both for powering their company's
[48:02] products and also for internal
[48:04] acceleration.
[48:05] >> Got it. So it's like customer success go
[48:07] to markety kind of like for deploy
[48:09] engineering sort of.
[48:10] >> Exactly. It's like a very technical go
[48:12] to market person.
[48:13] >> Got it. Okay. Awesome. So that's so
[48:14] you're saying that might be the second
[48:16] uh org that uses the most tokens.
[48:19] >> Yeah. And then we we also see them
[48:21] pushing the boundaries of what co-work
[48:23] can do. So for example, if so a lot of
[48:27] these folks cover multiple customers and
[48:30] in any given day can have like five to
[48:33] 10 customer engagements on a high day.
[48:36] And so what they often use co-work to do
[48:39] is the night before they'll ask it to
[48:41] summarize, okay, what are all my
[48:43] customer meetings that are coming up the
[48:44] next day?
[48:45] um what are all the what are all the
[48:47] things that this customer has asked me
[48:49] for uh what's top of mind for them what
[48:51] are the action items from the past
[48:53] meetings and co-work will just put
[48:55] together this like dossier this like
[48:57] brief of what they should be aware of
[48:59] going into the next meeting and co-work
[49:01] can also research answers so if if a
[49:04] customer asked okay when is feature X
[49:06] going to launch um co-work can help the
[49:09] pi person research through Slack to get
[49:12] the latest ETA add that to the add that
[49:15] to the notes so that during the customer
[49:17] call the pi person has the absolute
[49:19] latest and these are just workflows that
[49:21] people are building for themselves and
[49:23] sharing with other people on their team.
[49:25] >> So cool something that kind of this
[49:27] question this trend uh I don't know
[49:29] question topic comes up a lot recently
[49:31] which is um token spend exceeding
[49:34] people's salary where people just use AI
[49:38] and it costs more than how much they're
[49:39] making. Are there any numbers floating
[49:41] around anthropic of just like how much
[49:43] tokens spend say engineers
[49:46] uh spend I don't know a month a day PMs
[49:49] anything like that
[49:50] >> it is clear to us that as the models get
[49:52] better people delegate far more tasks to
[49:55] it and they spend a lot more hours in
[49:58] tools like quad code and co-work and so
[50:01] we do see the token cost per engineer or
[50:04] like per any knowledge worker increase
[50:07] every time that there's a model jump or
[50:10] like a substantial product improvement.
[50:12] I think it's still much lower than what
[50:16] the average engineer salary is, but we
[50:19] see the percentage increasing over time.
[50:21] >> It's such an interesting like we talked
[50:23] about how you have access to the most
[50:25] cutting edge models and other advantage
[50:26] of working anthropic. I I believe you
[50:28] guys have basically unlimited tokens.
[50:30] You don't you can use as much as you
[50:32] want. Is that right?
[50:33] >> We can use a lot of tokens. Some people
[50:35] do run into limits. So,
[50:36] >> okay, there's a limit. Okay, Baris, shut
[50:39] it down. H, okay. Like, it's so
[50:42] interesting how many advantages come
[50:43] from having the most advanced model.
[50:45] It's such an interesting like flywheel
[50:47] that starts to kick in. I think we also
[50:50] believe a lot in empowering our internal
[50:53] teams to build as fast as possible. And
[50:56] we also trust that everyone understands
[50:59] how much capacity that serving these
[51:02] models truly costs. and we trust our
[51:05] team to use the tokens responsibly. So,
[51:07] it's very frowned upon to waste tokens,
[51:11] but we do trust individuals to make that
[51:13] judgment call.
[51:14] >> Awesome. Coming back to the PM role, you
[51:17] talked we talked a little bit about
[51:18] this, but I think this will be really
[51:19] interesting for people to hear. Just
[51:22] what I want to understand is what do you
[51:24] think are the kind of the emerging
[51:25] skills that PMs need to develop slash
[51:30] you most look for AI companies most look
[51:32] for when they're hiring PMs these days?
[51:35] >> I think the hardest skill is
[51:38] being able to
[51:41] define what the product should look like
[51:43] a month from now. I think there's a lot
[51:46] of ambiguity and what models are capable
[51:48] of in that timeline and how user
[51:50] behavior will change.
[51:52] But I think there are patterns that the
[51:54] best PMs can see based on how users are
[51:58] abusing the limits of the existing
[52:00] product and the best PMS can sense that
[52:04] can set a direction and can steadily
[52:06] execute towards it and change the path
[52:09] if the model capabilities are much
[52:11] better than or worse than what they had
[52:14] originally expected. I think it is very
[52:16] hard to be the right amount of AGI
[52:18] pilled because I think everyone can see
[52:21] this like this future where the models
[52:24] are extremely smart and can do almost
[52:26] everything in which case you actually
[52:29] don't need that complicated a product.
[52:31] You can actually just have a text box
[52:33] again where you tell the model what you
[52:34] want. And it's so smart that it can add
[52:38] any tool or add any integration that it
[52:40] needs to like get the job done. It knows
[52:43] when it's uncertain. and they can ask
[52:44] clarifying questions like it's kind of
[52:47] very easy to build the product for the
[52:49] super AGI uh strong model. I think the
[52:53] hard thing is figuring out for the
[52:56] current model. How do you elicit the
[53:00] maximum capability? How do you help
[53:02] users
[53:04] go get onto the
[53:07] the golden path? How do you like guide
[53:09] users to interact with the model's
[53:12] strengths and like patch its weaknesses?
[53:15] Th this skill is like pretty rare.
[53:19] >> And how do you build that skill? Is it
[53:20] just using each like basically
[53:22] understanding the limits of each model
[53:24] having like you talked about taste,
[53:26] understanding having taste into what the
[53:28] model maybe is capable of, what it's
[53:30] great and not great at, where it's
[53:31] changed.
[53:32] >> I think it's spending a ton of time
[53:33] talking and using the model. One of the
[53:36] things I really like to do is to ask the
[53:39] model to introspect on its own
[53:41] behaviors. So sometimes when I notice
[53:44] that the model does something
[53:45] unexpected, like for example, there's
[53:48] like situations where the model will
[53:51] make a front-end change and run tests
[53:54] but not actually use the UI. It's
[53:56] actually pretty useful to ask the model
[53:59] to reflect on why it did this. And
[54:02] sometimes they'll say that hey there was
[54:04] like something confusing in the system
[54:05] prompt or I didn't realize that um the
[54:09] front-end verification was like part of
[54:11] this task or hey I delegated the
[54:13] verification to this sub agent and the
[54:15] sub agent didn't do the test and I
[54:17] didn't check its work. A lot of times
[54:19] just like being very curious about why
[54:22] the model made the decision that it did
[54:24] will show you
[54:26] what misled it so that you can fix the
[54:28] harness in order to close this gap. The
[54:31] other thing that helps is to figure out
[54:34] who the taste who are the users who you
[54:38] trust the most to give you accurate
[54:40] feedback about the model. Usually
[54:42] there's like a handful of people who are
[54:45] much better than others at articulating
[54:47] what makes a specific model or model
[54:49] harness combination good. And there's a
[54:53] lot of people who will give you
[54:54] feedback, but not everyone's feedback is
[54:56] as qualified. And so finding a group of
[54:59] those like five people you trust is
[55:01] really important for getting very fast
[55:03] feedback. I think the third thing that
[55:06] is useful but not everyone loves doing
[55:09] is building evals. You don't need to
[55:12] build hundreds of evals for them to be
[55:15] useful. Just building 10 great evals is
[55:19] important for helping the team quantify
[55:22] what the goal is and what their progress
[55:24] towards it is and what they're missing.
[55:27] And so I think eval is this like
[55:28] underappreciated thing that more more
[55:31] PMs more engineers should be working on.
[55:33] >> We've covered evals a bunch. There's
[55:35] this trend of just like that is the
[55:36] future of product management is writing
[55:38] evals because it and essentially it's
[55:40] what does success look like? Okay, cool.
[55:41] Let me actually concretely define it and
[55:43] then we'll know. How much of your time
[55:44] are you spending writing evals would you
[55:46] say?
[55:46] >> I I think the importance of evals varies
[55:48] a bit based on the feature that you're
[55:50] working on and or like what the problem
[55:54] you're trying to solve is. So there are
[55:56] a lot of folks on our team who do spend
[55:58] a lot of time working on eval. have a
[56:00] small pod of folks who collaborate very
[56:03] closely with research to more precisely
[56:06] understand our quad code behaviors and
[56:10] what the
[56:12] largest areas of improvement are and
[56:14] trying to measure those pretty
[56:15] concretely. I personally jump into evals
[56:18] when there's a feature that I think
[56:21] needs a bit more product definition and
[56:24] often the output of this is okay here
[56:27] are like five evas that I made um this
[56:30] is how you run them these are the ones
[56:32] that succeed and these are the ones that
[56:33] don't and this is like the prompt that
[56:35] I've used to increase the success rate
[56:39] it varies a lot though based on the
[56:41] exact feature uh not every feature needs
[56:43] it but I think features such as memory
[56:45] benefit a lot from this uh point you
[56:47] made about people being very good at
[56:49] evaluating models so interesting. It's
[56:50] almost like a human eval of just like
[56:53] okay they understand where it's spiking
[56:54] or it's maybe lacking. Uh is there
[56:57] anyone specific that you want to shout
[56:59] out that's very good at this?
[57:00] >> Uh two people who I think are incredible
[57:03] at this are um one Amanda who def who
[57:07] molds Claude's character. It's just like
[57:11] such a hard role because the task is so
[57:15] ambiguous. Even coding is easier because
[57:18] you can verify the success whereas
[57:20] crafting the character requires a very
[57:22] strong sense of conviction in what who
[57:26] Claude should be. And I think she has
[57:29] like an incredible ability to not only
[57:32] mold the character, but also to like
[57:33] articulate what the goals are, what the
[57:37] character, what's successful and what's
[57:39] not. The other group of people who I
[57:43] really trust is just like the Cloud Code
[57:44] team. Um, so we often have team lunches
[57:47] and whenever there's a new model we're
[57:49] testing. One of the fastest ways for us
[57:51] to get feedback is to just like at these
[57:54] team lunches just like go to every
[57:55] single person and just be like, "Hey,
[57:57] what is your vibe on the model?" And
[57:59] oftentimes
[58:01] we'll we'll get feedback like, "Okay,
[58:02] this model is like not fully explaining
[58:05] its thinking. It's like too abrupt." or
[58:08] like hey this model's like um just like
[58:12] loves writing a ton of memories but like
[58:14] we're not sure if the memories are high
[58:15] quality or not or like some people will
[58:18] notice that okay this this model loves
[58:20] to test itself which is great or like
[58:22] this model isn't testing itself enough.
[58:24] So that informs what data we look at to
[58:27] verify okay is this a larger pattern. So
[58:30] we we have a ton of data but it is very
[58:33] hard to extract insights and so the the
[58:36] feedback from this group helps us inform
[58:38] okay what are the hypotheses we want to
[58:40] test and then we're able to extract uh
[58:43] data to uh test that
[58:45] >> this point you made about the character
[58:47] of Claude I had Ben man on the podcast
[58:49] co-founder and he talked about this just
[58:51] like the character the constitution of
[58:53] Claude is such an important part of of
[58:55] of Claude and I I didn't realize until
[58:58] afterwards just Like like people like
[59:01] with open claw actually one of the examp
[59:02] one one of the reasons people are sad is
[59:03] like the personality of your claw is
[59:06] like because Claude's personality is so
[59:09] good and fun and and interesting unlike
[59:12] other models and there's and the way he
[59:14] put it is the personality is what makes
[59:16] Claude so good at so many things. It
[59:18] feels like this like trivial side thing.
[59:20] Okay, it's going to be funny and
[59:21] interesting and talk in a fun way but
[59:24] it's like so core to the success of
[59:26] Claude. Is there anything you get there
[59:28] about just like what people may not
[59:29] understand about why the character as
[59:31] you described and the personality is so
[59:33] key?
[59:34] >> When you reflect on everyone you've
[59:35] worked with, there's just some people
[59:37] where you're like, I really like their
[59:39] energy. Like, I really like their vibe.
[59:42] And when people think about Quad and
[59:44] Quad Code, this is one of the things
[59:47] that people bring up the most where they
[59:49] just really love that COD is like it's
[59:53] it's like lighthearted and fun. Um, but
[59:56] it also is extremely competent at your
[59:59] task. People really like that Claude's
[60:02] low ego. And so if you tell it, hey, you
[60:04] did this thing wrong. It's like truly
[60:05] sorry. It's like, oh shoot, like, thanks
[60:08] for telling me. Like, let me fix it.
[60:09] Let's work together. It's also very
[60:11] positive. So if you're feeling like, oh,
[60:14] this is like an insurmountable task. I
[60:16] don't know h how to get started. Quad is
[60:19] like, okay, it's okay. The these are
[60:22] like the steps that I think we should
[60:24] take. like, do you want me to get
[60:25] started on it for you? I think part of
[60:28] what makes a great co-orker is this
[60:31] positivity, this like bias towards
[60:33] action, this this ability to give you
[60:36] like earnest feedback, not just agreeing
[60:39] with every single thing that you say.
[60:40] And so we try to imbue this into cloud
[60:42] because we think it makes it a lot more
[60:44] enjoyable to work with.
[60:45] >> There's something I want to come back
[60:46] to. You talked about how when new models
[60:48] come out, you often have to kind of
[60:50] revisit things you've built. That's so
[60:52] interesting and so like frustrating
[60:53] maybe just like oh god damn it we
[60:55] shipped this thing now we have to
[60:56] rethink it. Talk about just like how
[60:57] often you have to come back with a new
[60:59] model and we're like okay we have to
[61:01] redo this product that we launched a few
[61:02] months ago.
[61:03] >> A lot of the changes that we make with a
[61:06] new model is removing features that are
[61:10] no longer needed. So a lot of times we
[61:13] add features to the product as a crutch
[61:16] for the model because it's not naturally
[61:18] doing itself. So the classic example for
[61:20] this is a to-do list. When we first
[61:22] launched Quad Code, people would ask it
[61:24] to do these large refactors and Quad
[61:26] Code would say, "Okay, cool. I need to
[61:28] change these like 20 call sites and it
[61:30] would go and change five of them and
[61:31] then stop." And then we were like,
[61:34] "Okay, how do we like force it to
[61:36] remember to get every single one of
[61:37] these 20?" And so Sid on our team was
[61:40] like, "Okay, what if we just like think
[61:42] about what a human would do? So a human
[61:43] would like make a list of everything
[61:45] that they need to change. Similar to how
[61:46] in VS Code you would look up all the
[61:48] call sites and it would be a list on the
[61:50] left side and you would like go through
[61:51] them one by one and replace all. How do
[61:53] we give this kind of like a tool to
[61:54] claude? And so he added a to-do list and
[61:57] we found that with that Claude was
[61:59] actually able to fix all these 20 call
[62:01] sites. But then with Opus 4 and later
[62:04] models we realized that we didn't need
[62:06] to force it to use this to-do list. It
[62:10] would like naturally use it itself. For
[62:12] the earlier models, we had to keep
[62:13] reminding it, hey, did you finish
[62:15] everything on the to-do list? You can't
[62:16] finish until you're done with everything
[62:17] on the to-do list. And for the later
[62:19] models, without prompting, it just like
[62:21] naturally thinks to do everything on the
[62:22] to-do list. Um, these days, the to-do
[62:26] list is still nice to have as like a
[62:28] user. Um, because then you can more
[62:31] clearly see what Claude is working on.
[62:33] But honestly, it's such a deemphasized
[62:35] part of the product right now that um,
[62:37] the model may use it, the model may not
[62:39] use it. it's like really not necessary
[62:41] for it to make thorough changes anymore.
[62:44] >> I forget who said this on the podcast um
[62:46] that the model will eat your harness for
[62:48] breakfast. And what I'm hearing here is
[62:50] essentially you you remove things over
[62:53] time that you've had to add on top of
[62:55] the model where it was not operating the
[62:58] way you wanted. And essentially as the
[62:59] models get smarter, you just it becomes
[63:01] simpler and simpler for it just to do
[63:02] the thing you want it to do.
[63:04] >> Yeah. Um, we can move remove a lot of
[63:06] prompting interventions every time the
[63:08] model gets smarter. And we actually do
[63:10] this every time we launch a model. We
[63:12] read through the entire system prompt
[63:14] and we reflect on, okay, for each of
[63:16] these sections, does the model really
[63:18] need this reminder anymore? And if not,
[63:20] we'll remove it. The most exciting thing
[63:22] that new models unlocks though is just
[63:24] like entirely new features. So there's a
[63:27] lot of features that we've been testing
[63:29] out with prior models and the accuracy
[63:32] wasn't high enough for us to want to
[63:33] launch them. And so one example of this
[63:36] is code review. We tried to build a code
[63:38] review product a few times and we've
[63:41] launched like simpler versions of code
[63:43] review which is the slashcode review
[63:45] command in the past and it was only with
[63:47] the most recent models that we felt like
[63:49] okay this code review is so good that
[63:53] our engineering team relies on this code
[63:55] review to pass before we merge PRs and
[63:59] we found that this was we've always
[64:02] dreamed of quad being able to be a
[64:05] reliable code reviewer that can actually
[64:07] that we can like confidently feel
[64:09] catches the majority of bugs. And it was
[64:12] only with like Opus 45 and 46 that we
[64:14] and uh Sonnet 4.6 that we felt like okay
[64:17] we are now able to like run multiple
[64:21] code review agents simultaneously to
[64:24] traverse traverse the entirety of the
[64:26] codebase and to synthesize a set of like
[64:31] real issues that an engineer needs to
[64:33] address before merge. And so this is
[64:35] like a new capability that the the
[64:37] newest models have unlocked.
[64:39] >> This is another trend that is very
[64:41] common on this podcast of build
[64:42] something that will possibly be possible
[64:45] in the next six months. Be kind of at
[64:47] the edge of what's working sort of and
[64:49] then it'll catch up and then it'll be an
[64:51] amazing product and you'll be ahead of
[64:52] everyone.
[64:52] >> Yeah, exactly. Um it's pretty important
[64:55] to build products that don't necessarily
[64:58] work yet so that you know okay what is
[65:01] missing um for this product to work and
[65:04] then with the newest model you can just
[65:06] swap it in to the prototype you've
[65:08] already made and see okay does this new
[65:10] model close that gap.
[65:12] >> How much are you able to speak to just
[65:13] kind of where things are going with
[65:15] claude and co-work as kind of the vision
[65:17] of it? I imagine you don't want to give
[65:19] away too much about the goal but it
[65:21] feels like you're there's all these
[65:22] awesome features being added on top
[65:24] dispatch control from phone and all
[65:26] these mobile app all these things what's
[65:28] kind of just like a way to understand
[65:30] the vision for all these things long
[65:32] term
[65:32] >> we think about this in terms of building
[65:34] blocks so for both quad code and co-work
[65:37] the core building block is making
[65:40] individual tasks successful so you you
[65:43] want to produce some output you give it
[65:46] a clear prompt description is it able to
[65:48] consistently produce acceptable output
[65:51] that you're able to either merge or
[65:53] share with your colleagues or external
[65:54] audience. So the task is the core
[65:56] building block. As the models get
[65:58] smarter, the task success rate gets a
[66:00] lot higher. And then we see people
[66:02] moving towards doing multiple tasks at
[66:04] the same time. So multi-coding was this
[66:06] big thing in towards the end of 2025 and
[66:09] it's only increased since then. And so
[66:11] we see this as okay great one task works
[66:15] and now you can do like six tasks at a
[66:17] time. As the models get even smarter the
[66:20] way that we are extrapolating this is
[66:21] okay next maybe you're going to run like
[66:25] 50 clouds at a time or hundreds of
[66:26] clouds at a time. And so what is the
[66:28] infrastructure we need to build to
[66:29] enable that? At that point you're
[66:32] probably not going to run everything
[66:33] locally on your machine anymore. There's
[66:35] just like not enough RAM to do it. And
[66:39] so we're we're thinking about h how do
[66:42] we make it easier for you to manage all
[66:44] these? These will probably run remotely.
[66:46] How do we build the interface so that
[66:48] you as a human know which tasks you need
[66:51] to look look into? How do we make sure
[66:54] that the agent is fully verifying work
[66:56] so that when you look at a task and it
[66:58] says it's done, you like can very
[67:01] quickly verify and fully trust that it
[67:03] is done to your spec. and how do we make
[67:05] sure that this like process is
[67:06] self-improving so that when you do see a
[67:09] task that isn't done to your liking, you
[67:12] can give it feedback and the model will
[67:14] know for every future run to incorporate
[67:16] that feedback so it never makes that
[67:18] mistake again. So this is the
[67:20] progression that we're we're bringing
[67:21] our users along for.
[67:23] >> There's a lot of people listening, a lot
[67:24] of product managers, a lot of maybe
[67:26] founders, a lot of other cross
[67:28] functional folks listening. There's a
[67:30] lot of worry about just how their role
[67:33] just the future of their careers. What
[67:36] advice would you have for just people to
[67:39] not just survive this transition to this
[67:41] very AIdriven world, but to be really
[67:43] successful to essentially just to thrive
[67:45] in this future? What are just like
[67:47] things people need to hear, need to be
[67:49] doing?
[67:49] >> I think AI gives everybody a ton more
[67:52] leverage than they used to. And so I
[67:55] would push you towards anytime you
[67:57] realize that you're doing some manual
[67:59] task multiple times, think about how you
[68:01] can use cloud code, co-work or other AI
[68:04] tools to automate that for you. Most
[68:07] people have like creative parts of their
[68:10] job that they absolutely love and then
[68:12] like tedious parts of their job that
[68:14] they really hate doing. I think the
[68:16] beauty of AI is that it can do those
[68:19] tedious parts for you. it can learn from
[68:21] every time that you've done that manual
[68:23] task and generalize and then run it
[68:26] automatically and so that you can focus
[68:28] on the creative parts and that means you
[68:30] can do a lot more than you used to be
[68:31] able to do. So I think my like immediate
[68:34] push for people is figure out the
[68:36] repetitive parts that you can pass to
[68:38] quad. Iterate on those automations until
[68:40] the success rate is very high and then
[68:43] focus on okay what more can you be doing
[68:46] for your team for your product for your
[68:48] company that like people haven't had the
[68:50] bandwidth to pick up so far or like what
[68:53] is that like pet project that you always
[68:55] thought the company should do that like
[68:57] you've never had bandwidth to do. If AI
[69:00] can take care of the like grunt work,
[69:03] then you have you have this extra 20%
[69:06] time now that you might not have before.
[69:08] So, so my push is to lean into these
[69:11] tools, hand off the work that you're not
[69:13] excited to do, figure out how it can
[69:15] accelerate you, and then as a result,
[69:17] you'll be able to do so much more.
[69:19] >> Something core to what you just shared,
[69:20] which I fully agree with, is find
[69:22] problems to solve with AI. There's all
[69:26] this potential what all these tools can
[69:28] do. some of the hard like for a lot of
[69:30] people hardest part is just like what
[69:31] should I actually do and what you're
[69:33] saying here is just pay attention to
[69:34] things that you are doing constantly you
[69:36] can automate pay attention to just like
[69:38] ideas that have been floating around
[69:39] that you haven't had time to do um it's
[69:42] basically it's like solve a problem for
[69:43] yourself is kind of the core advice
[69:44] there
[69:45] >> exactly I I would also push listeners
[69:47] towards focusing on bringing your
[69:50] automations from okay this is a cool
[69:53] concept to like hey this actually works
[69:54] 100% of the time like sometimes I see
[69:57] users trying trying to automate
[69:58] something, getting it to like 90 95%
[70:01] accuracy and then giving up on it. And
[70:05] this if an automation doesn't work 100%
[70:08] of the time, it's not really an
[70:09] automation. And that last 5 to 10% does
[70:13] take more time. Also, building the
[70:16] automation is often a lot slower than
[70:18] you doing it yourself. I would encourage
[70:21] listeners to put in that time to scope
[70:24] some automation that you really want to
[70:26] get to 100%. Put in the elbow grease to
[70:30] teach quality your preferences to like
[70:32] give it feedback so that it can improve
[70:35] its skill so that it can get to that
[70:36] 100%. And then like really then you'll
[70:39] be able to rely on it. There there's
[70:41] just not much value in a 95% there
[70:43] automation.
[70:44] >> I am super guilty of that. This is
[70:46] really good advice for me.
[70:48] >> I am guilty of this too. I've been
[70:50] teaching it I've been teaching co-work
[70:52] to try to get me to inbox zero for Gmail
[70:55] and it has not been it it has been very
[70:58] time consuming and it is definitely not
[71:00] there as you probably realized.
[71:02] >> Yeah, I funny enough that's exactly
[71:03] where my mind goes. I have this uh
[71:06] workflow I set up where every email I
[71:08] get, it looks for things that are
[71:10] spammy, which is just like all these
[71:11] like, "Hey, can I come on your podcast
[71:13] or what about this one?" Like all these
[71:15] things I'm just like, I don't have time
[71:16] for these sorts of things. And I have it
[71:18] categorized it into a folder called
[71:20] spammy. And it's just like it's 95%
[71:22] great, but then there's like, oh wow, I
[71:24] missed an email because it went in
[71:25] there. So this is a good push for me to
[71:26] like I'm going to work on this. I'm
[71:28] going to get it to perfect.
[71:29] >> Yeah. We also are working on making the
[71:31] flow for customizing these commands a
[71:34] lot easier because right now I think you
[71:35] have to like know too many concepts. You
[71:37] have to know to define a skill. You have
[71:39] to know to like use this skill and give
[71:40] it feedback. And then you have to know
[71:42] to tell co-work to update the skill
[71:45] based on all the feedback that you gave.
[71:47] And then you also have to know where to
[71:49] read the skill to like make sure that
[71:50] the feedback was incorporated the way
[71:51] that you want. The it's also our job to
[71:54] make this flow really seamless so that
[71:56] it doesn't feel painful to do.
[71:57] >> Amazing. Is there anything else, Cat,
[71:59] you wanted to share? Anything else you
[72:01] wanted to leave listeners with? Anything
[72:03] you wanted to double down on that we
[72:05] haven't already touched on before we get
[72:06] to our very exciting lightning round? I
[72:08] see a lot of people playing around with
[72:10] AI um and building like prototype apps
[72:13] and tinkering with building workflows. I
[72:17] would really push people towards
[72:20] building apps that you're actually using
[72:21] every single day because I think only
[72:23] through that usage are you actually
[72:25] getting the value. Like if you build a
[72:27] prototype app that
[72:30] isn't helping you get more done, then
[72:33] the the AI isn't really adding value to
[72:36] your
[72:37] >> to your day.
[72:38] >> And there's only so much you learn from
[72:39] that when it's like, okay, I just
[72:41] one-shoted something. Oh, that's cool.
[72:42] And then you never come back to it. Like
[72:44] you're not learning a lot
[72:45] >> and you're not getting like much
[72:46] leverage from it
[72:47] >> and actual leverage. Yeah, that's such a
[72:48] good point.
[72:49] >> I also think there's a lot of people who
[72:50] spend a lot of time like customizing
[72:52] their workflow. So there's like I think
[72:54] there's like two ends of the spectrum.
[72:55] One is like people who never customize
[72:57] or never build automations, but there's
[72:59] like this polar opposite end of people
[73:00] who like obsess around customizing their
[73:04] tool like adding a ton of skills and
[73:07] MCPs and um these like workflow
[73:10] improvements and I think sometimes that
[73:13] can even distract from your core goal of
[73:15] like launching some product or building
[73:17] some feature. I think there's a lot of
[73:19] fun in customizing and we definitely
[73:21] want to make our products very hackable
[73:23] so that you you can make it work really
[73:25] well for you, but there is a limit to
[73:29] how much it's useful. Um, and I think
[73:32] there there's a camp of people who maybe
[73:34] spend so much time customizing that
[73:36] they're like not sleeping and not doing
[73:38] the like core task that they originally
[73:40] set out to do.
[73:41] >> I see a lot of that on Twitter just like
[73:44] look at my setup. It's out of control.
[73:45] It's so optimized. Then what are you
[73:47] what what are you actually building? No,
[73:49] but my setup is so awesome. Like it gets
[73:51] so much done.
[73:52] >> I think the simple setups actually work
[73:54] better.
[73:56] >> Sl powerup getting take level up a
[73:58] little bit.
[73:58] >> Yeah. Yeah.
[73:59] >> There's this Karpathy tweet that just uh
[74:02] came out yesterday where he talked about
[74:03] this divide that's interesting between
[74:06] people that tried chatbt claw back in
[74:09] the day. it was like okay and they're
[74:10] like nah this is this is terrible and
[74:12] they kind of gave up on like what AI
[74:14] could do for them and they're just like
[74:15] so cynical of like no way it's not
[74:16] actually that big of a deal and then
[74:18] there's people that are using it to code
[74:20] essentially who see the full intense
[74:24] power of it and how good it is and
[74:27] people on both sides don't understand
[74:28] the other side and why they like how
[74:30] much they how they see the world and so
[74:32] your advice is really good here just
[74:34] like actually use it for real things and
[74:36] see how good it actually has gotten
[74:38] >> yeah I think The big shift is that the
[74:40] 2024 generation of products were
[74:43] chatbased and the quad code generation
[74:46] of products is action-based.
[74:49] And
[74:50] the like big aha moment people have is
[74:53] when quad can just like do things on
[74:54] your behalf. It is it is an amazing
[74:57] feeling to know that the agent is
[75:00] capable of doing so much more than
[75:02] telling you what to do. Like the agent
[75:04] can actually just do it itself. And when
[75:07] people feel that, I I think that's the
[75:08] eye opening moment.
[75:10] >> Shout out uh Chrome extension, the cloud
[75:12] called Chrome extension, which you can
[75:13] just watch it doing stuff and you'd be
[75:15] like, "Fill out this form for me and
[75:16] like, all right, here I go."
[75:18] >> Exactly.
[75:19] >> Okay. Uh anything else before we get to
[75:21] our very exciting lightning round?
[75:22] >> No, let's do it.
[75:24] >> Let's do it. Uh Kat, I've got five
[75:26] questions for you. Welcome to the
[75:28] lightning round. There's this animation
[75:29] that place. I have to make sure to say
[75:30] it. Uh are you ready?
[75:32] >> I'm ready.
[75:34] First question, what are two or three
[75:36] books that you find yourself
[75:37] recommending most to other people?
[75:38] >> I really like how Asia works. Um, it's a
[75:42] story about economic development and
[75:45] what are like the policies and uh
[75:48] governments that make um long lasting
[75:51] successful economies. The other books
[75:54] that I'm really into are the technology
[75:56] trap. So, this is actually about the
[75:59] past few technology revolutions. So the
[76:01] industrial revolution and the computer
[76:03] revolution and how this has affected uh
[76:06] workers. The the reason that I really
[76:08] like this is because I think we there's
[76:11] a lot we can learn from history to make
[76:13] sure that this transition goes well. And
[76:17] um maybe on like a fun note, I really
[76:18] like paper menagerie. Um it's just like
[76:21] a book of short stories about like
[76:24] coming of age and AI and um just like
[76:29] self-discovery. Favorite recent movie or
[76:32] TV show you have really enjoyed?
[76:34] >> I really like Drive to Survive.
[76:37] There's no like deeper meaning to it. I
[76:39] just
[76:41] there's just something very satisfying
[76:42] about people being so obsessed with like
[76:46] a singular engineering goal and just
[76:49] like the purity of their pursuit. Um,
[76:52] and I also really love Free Solo, which
[76:54] is about Alex Honold um, climbing El
[76:58] Capetan without a harness. And I think
[77:01] similarly, it's just such a pure
[77:04] achievement to be able to climb this
[77:07] extremely challenging, dangerous route
[77:10] and to be able to have the mental focus
[77:13] to do it knowing that if you make a
[77:16] single mistake, you die.
[77:17] >> It's insane. Yeah, that movie is out of
[77:19] control. And it's interesting how these
[77:20] relate in some way to the work you do.
[77:22] >> I actually am a rock climber. Um I first
[77:25] watched Free Solo before I climbed rocks
[77:27] and so I thought it was impressive. I
[77:29] didn't understand how impressive it was.
[77:31] It's one of the rare movies where like
[77:32] the more you know about it, the more
[77:33] you're you're blown away by how insane
[77:36] this is. Like the kinds the kinds of
[77:39] moves he's doing on the wall are things
[77:40] that like I don't think I will ever be
[77:42] able to do in my lifetime if it were set
[77:45] in a gym like one ft off the ground
[77:47] >> with a rope.
[77:48] >> With a rope.
[77:50] >> Did you see the documentary on that
[77:51] other guy, the younger one that went on
[77:53] like ice mountain?
[77:54] >> I did. That one was very sad.
[77:56] >> But that was that was wild. Okay. Uh
[77:58] favorite product you recently discovered
[77:59] that you really love? The product that
[78:01] is like most changed my life outside of
[78:04] cloud products is probably Whimo.
[78:07] Like I'm a diehard Whimo user. Um use it
[78:10] twice a day, get to and from work. So
[78:12] the two things that I really like about
[78:14] it are one, I don't feel bad if a Whimo
[78:17] is waiting for me. And so I feel like I
[78:20] feel less pressure to be right at the
[78:23] curbside the moment it arrives. And the
[78:25] second thing is I feel like it lets me
[78:28] be a bit more productive. Um, when when
[78:31] I'm in the car with another human, I I
[78:33] typically try not to like do any work
[78:35] calls. I I feel a little rude if I'm
[78:37] like on my laptop the whole time. But
[78:39] one thing I really appreciate about the
[78:40] Whimo is I can call into a work call.
[78:42] I'm not worried about someone
[78:44] overhearing me. I'm not worried about,
[78:46] hey, is this like rude? Am I talking too
[78:48] loud? Do I need to tell ask someone to
[78:50] like change the music? And so this has
[78:51] been like I feel like this has given me
[78:53] back like 30 minutes every day.
[78:55] >> All these second order effects of of
[78:57] technology. It's so interesting.
[78:59] >> Yeah. I always thought Whimo needed to
[79:00] be priced lower than Uber and Lyft to
[79:03] succeed, but actually I'm like very
[79:05] happy to pay a 2x premium for it.
[79:06] >> I love Whimo. It's just like like once
[79:09] you see it, you're just like, "Wow, this
[79:11] is insane." And and then you get used to
[79:13] it. Like you get in there, you're like,
[79:14] "This is crazy." And then you forget
[79:17] about it.
[79:17] >> Totally. And I think it's also changed
[79:19] the vernacular. Like a lot of people at
[79:21] Anthropic love Whimo. And I think in the
[79:24] past you would be like, "Hey, like let's
[79:26] call like blah blah ride share app." And
[79:28] now like everyone's just like, "Okay, is
[79:29] the way here?"
[79:30] >> Okay, two more questions. Do you have a
[79:32] favorite life motto that you often come
[79:33] back to in work or in life?
[79:35] >> Just do things.
[79:37] >> That's right.
[79:38] >> I think there's a lot of value in like
[79:40] first principles thinking and if if you
[79:43] like if you know what you're optimizing
[79:44] for and you have like strong first
[79:46] principles, then you can normally deduce
[79:48] what the right like course of action is
[79:49] and be able to clearly articulate that
[79:51] to all the stakeholders and then you
[79:54] should just like do it. Like I think
[79:56] jobs are fake. If you understand the
[79:58] constraints, you can figure out what you
[80:01] can do and then just like try to do it
[80:03] quickly, learn from the mistakes and
[80:05] apologize or fix them if you did
[80:07] something wrong.
[80:08] >> You you could just do things whoever
[80:10] said that.
[80:10] >> I think it's liberating actually to like
[80:12] tell people this. I think in a lot of
[80:13] companies like roles are very strictly
[80:16] defined like okay this is what the PM
[80:19] does, this is what the designer does,
[80:20] this is what engineer does and then even
[80:22] team scopes are very rigidly defined.
[80:24] So, hey, like this corner of the
[80:26] codebase we touch and this corner like
[80:28] we're not allowed to touch. And I think
[80:30] what just do things lets people do is
[80:32] they feel like empowered to make these
[80:33] decisions, empowered to operate across
[80:36] team boundaries just to like get
[80:37] something done.
[80:38] >> That feels like a big important skill to
[80:41] be good at. People call it agency. Just
[80:44] like do the things
[80:46] >> bias towards action. All these ways of
[80:48] describing just like you wait for
[80:50] permission.
[80:50] >> Yeah. I think this is my favorite reason
[80:52] to work at a startup at some point in
[80:54] your life because like one thing that
[80:56] was like very life-changing for me was
[80:58] actually working at scale when we were
[81:00] 20 people. And so there was just no
[81:02] process and we had like really big
[81:04] problems that we needed to solve. And it
[81:07] it was like I really appreciate Alex and
[81:09] the rest of the team for like empowering
[81:10] me and the rest of the team to just like
[81:13] figure things out without any boundaries
[81:15] for what sales supposed to do, what off
[81:17] supposed to do, what engineer is
[81:18] supposed to do. just like you have all
[81:20] the tools at your disposal. You have
[81:23] some like ambitious hairy problem
[81:25] statement and you can do whatever you
[81:26] need to like get to a good solution.
[81:28] >> Like you almost need that experience to
[81:30] build that skill to feel comfortable
[81:31] doing that because a lot of people, you
[81:33] know, they go through school or in
[81:34] college and all these like do the thing
[81:36] we tell you to do and then you will get
[81:38] a good grade. And you have to kind of
[81:39] unlearn that of like, okay, I'm just
[81:41] going to do the thing that needs to be
[81:42] done and even if people think it's dumb,
[81:44] I think it's the right thing to do.
[81:46] >> Yeah. Exactly.
[81:47] >> Okay. Okay, I actually have two more
[81:48] quick questions. Two more final
[81:49] questions. One is uh when Claude thinks,
[81:51] there's all these I don't know if you
[81:52] call them verbs. What's the term for
[81:54] these things?
[81:55] >> Uh thinking words.
[81:56] >> Thinking words. And interestingly, these
[81:58] all leaked in the source code. Uh is it
[82:00] Do you have a favorite thinking word?
[82:03] >> I really like manifesting. It's also
[82:06] like the sticker that I I have on my
[82:10] favorite.
[82:10] >> Clearly the winner. Okay, final
[82:12] question. Asked Boris this too. with AGI
[82:15] potentially arriving in our lifetime
[82:18] when you don't potentially have to work,
[82:21] what are you going to do? What are you
[82:22] going to do with all your time?
[82:23] >> I think it it will take a long time for
[82:26] AGI to diffuse across society. So, I
[82:28] think the immediate thing is actually
[82:30] just like helping bring the world along.
[82:32] I think my like non-serious answer for
[82:34] after this happens is I'll probably just
[82:38] do a lot of rock climbing. I'll probably
[82:40] just like live in some I'll probably
[82:42] move to like Fountain Blue and just like
[82:44] live amongst 10,000 boulders and climb
[82:48] for a bit. There's also so many books I
[82:50] want to read that my my goal is to be
[82:53] able to read one or two books a week and
[82:57] I'm currently at probably like 0.5.
[83:02] The backlog is pretty big. I think
[83:04] there's just like so much we can learn
[83:05] from history and so much that I don't
[83:07] understand as well as I would love to.
[83:09] Like I don't know anything about physics
[83:11] and or like robotics or like any
[83:15] hardware or like aerospace or there's
[83:18] just so many interesting topics. So I
[83:20] I'm excited to learn even even knowing
[83:22] that the AI will already know it.
[83:26] >> Cat, this was amazing. You're awesome.
[83:29] Two follow questions. Where can folks
[83:30] find you online if they want to reach
[83:32] out and just follow what you're up to?
[83:33] And how can listeners be useful to you?
[83:35] >> The best way to reach out is I am Catwoo
[83:39] on Twitter. Um, feel free to like tag me
[83:43] in things. Feel free to DM me. I read
[83:46] all all my DMs. I don't always respond
[83:48] to every single one, but I will read
[83:49] them all. And then the thing that is
[83:53] most helpful is tell us where cloud code
[83:56] and co-work aren't working well for you.
[83:58] We we are very grateful for the amount
[84:01] of positive feedback. But the things
[84:04] that we thrive on is edge cases, errors,
[84:08] like specific tasks that we can
[84:10] reproduce where quad code or co-work
[84:13] fail. Because if you're able to share
[84:16] that with us and we're able to reproduce
[84:18] it, then this is something that we're
[84:19] able to actively improve for our next
[84:21] generations of models and uh for our
[84:24] next harnesses.
[84:25] >> Extremely cool. everyone on people on
[84:27] Twitter are not shy with sharing this
[84:28] feedback. So, so keep it coming.
[84:30] >> Share us share, please, please share the
[84:33] problems that you're having with us.
[84:34] >> Yeah. And it's really cool to see all
[84:35] you your team being on so active on
[84:37] Twitter and responding to people and so
[84:40] so like what I'm hearing like this is
[84:41] actually stuff you guys actually see and
[84:43] react to. So
[84:44] >> yeah, we appreciate everyone being so
[84:45] engaged with us. Um it gives the team a
[84:48] ton of energy. We we have this channel
[84:50] of like user love and so whenever you
[84:52] guys share a success story we post it
[84:54] there and whenever you guys share like
[84:57] issues with our product we put it into
[84:59] our feedback channel. That way our
[85:00] broader team is able to act on it.
[85:02] >> That is so cool to know. Thanks for
[85:04] sharing that. Well C, thank you so much
[85:06] for being here.
[85:07] >> Thanks for having me.
[85:09] >> Bye everyone.
[85:11] Thank you so much for listening. If you
[85:13] found this valuable, you can subscribe
[85:14] to the show on Apple Podcasts, Spotify,
[85:17] or your favorite podcast app. Also,
[85:19] please consider giving us a rating or
[85:21] leaving a review as that really helps
[85:23] other listeners find the podcast. You
[85:25] can find all past episodes or learn more
[85:27] about the show at lennispodcast.com.
[85:30] See you in the next episode.