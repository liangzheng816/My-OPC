# youtube-video-finder

Standalone Claude/Codex skill for locating the exact, canonical YouTube watch URL when the user only has a fuzzy description of the video.

## What it does

- Converts vague descriptions into high-signal search anchors
- Handles transliteration and misspelling recovery
- Filters out non-canonical mirrors (podcast players, transcript reposts, summary pages)
- Returns the canonical YouTube watch link with lightweight verification notes

## Typical prompts

```text
find the youtube video where X said Y
what is the link to that YC talk about FDE
find this clip from a podcast interview with misspelled names
```

## Output contract

Primary output must be:

`https://www.youtube.com/watch?v=VIDEO_ID`

If confidence is uncertain, return top candidates with explicit confidence notes.

## Package

```bash
cd ~/.claude/skills/youtube-video-finder
./package.sh
# -> dist/youtube-video-finder.zip
```
