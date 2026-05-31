---
name: youtube-video-finder
description: Find the exact, canonical YouTube watch link for a video the user can only describe (not name precisely). Use this whenever someone hands you a paraphrase, summary, partial quote, or second-hand account of video content and wants the real youtube.com/watch?v= URL.
---

# YouTube Video Finder

The job: turn a fuzzy human description of a video into the one correct, canonical YouTube link, then verify it actually matches before returning it.

Users often cannot provide exact titles. They provide approximate claims, translated names, rough dates, or a quote fragment. This skill recovers the right video from imperfect signals.

## Inputs You Can Work With

Any subset is acceptable:
- Video content description
- Speaker or guest name (possibly misspelled)
- Channel, show, or publisher
- Distinctive quote or phrase
- Rough date/time range
- Source language that differs from the video's language

If the prompt is underspecified (many possible matches), ask one targeted disambiguation question. Otherwise search first.

## Operating Procedure

### 1. Extract high-signal anchors

Prioritize:
1. Verbatim quote fragments
2. Proper nouns (people, orgs, products)
3. Channel/show name
4. Distinctive claim/topic phrasing

Ignore generic tokens like "interview" or "talk" when building queries.

### 2. Normalize names and terms

When transliteration or spelling looks wrong, generate likely alternatives and search both forms. If the name is unclear, search role plus organization.

### 3. Search broadly, reformulate quickly

Use search and page fetch iteratively:
- Start with strongest combined anchors.
- If no solid match, reformulate with corrected name, channel, year, or a quote-only query.
- Ensure each iteration changes signal quality, not just wording.

### 4. Resolve to the canonical YouTube URL

Accept only canonical watch links:

`https://www.youtube.com/watch?v=VIDEO_ID`

Rules:
- Prefer official upload over mirror/re-upload when possible.
- Ignore podcast mirrors, summary sites, transcript reposts, and social embeds.
- If you discover a youtu.be short link, normalize to watch?v form.

### 5. Verify the candidate before returning

Validate match confidence using available evidence:
- Speaker/guest identity
- Channel/show
- Topic alignment with the user description
- Date proximity when provided

If uncertain, return best candidates with a confidence note instead of claiming certainty.

### 6. Return concise output

Primary output is the canonical URL on its own line.
Optional short notes only when helpful:
- Why this matches
- Corrected spelling/name from user input
- Requested timestamp or chapter pointer

## Failure Modes to Avoid

- Returning non-YouTube mirrors as final answer
- Returning an unverified but plausible title match
- Failing on misspelled/transliterated names
- Asking too many questions before attempting search

## Example Pattern

Input: "Find the YC video where Bob from OpenAI and Palantir explains FDEs as a startup-like team model."

Expected behavior:
- Normalize person identity if needed
- Search with anchors (`Bob McGrew`, `YC`, `FDE`, `Palantir`)
- Confirm topic/speaker/channel
- Return canonical watch URL
