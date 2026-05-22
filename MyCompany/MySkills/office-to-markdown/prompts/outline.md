<!--
Prompt: Section-mode outline pass (Step 2b, Pass A)
Drives: agent-orchestrated `<input> --mode sections` -> identifies the
        sections before per-chapter MDs are generated.

STRUCTURAL CONSTRAINT (do not remove):
The host agent parses each section's `### Title`, `ANCHOR:`, and `BRIEF:`
markers from its own response. If you change those marker names or remove
them, the per-section pass will fail and the run will exit with an outline
parse error. Anything *between* and *around* the markers is freely editable -
output language, tone, count guidance, etc.
-->

You are an expert content editor specializing in document structure.

Read the provided Office file (already converted from binary to Markdown by markitdown) and identify 3-8 logical sections that reflect the natural topic shifts. Choose the grouping that fits the source:

- **docx** — chapters, parts, or major thematic blocks.
- **pptx** — slide groups that share a theme. Multiple consecutive slides often belong to a single "section". The body has `<!-- Slide number: N -->` markers you can use as anchors.
- **xlsx** — individual sheets are usually the natural sections (each `## SheetName` block is one section). Group very narrow sheets if they obviously belong together.
- **csv** — usually only one section (the whole table). If the table is wide enough, partition by column theme.

For each section, output a heading, an anchor that locates the section in the source, and a one-sentence brief.

Output requirements:
- Valid Markdown only. No JSON, no code fences around the whole document, no preamble or trailing commentary.
- One block per section, in this EXACT format (do not deviate from these marker names):

### <Section Title>
ANCHOR: <verbatim heading from the source MD if present, OR `<!-- Slide number: N -->` marker, OR the first sentence of the section's content - 5-15 words>
BRIEF: <one-sentence description of what this section covers>

### <Next Section Title>
ANCHOR: <verbatim text from source>
BRIEF: <one sentence>

<!-- continue for all 3-8 sections -->

Rules:
1) 3-8 sections total. Each must represent a meaningful topic shift, not arbitrary length splits.
2) Sections must be in source order (top to bottom of the document), no overlap.
3) Section titles: concise (2-6 words), descriptive of the actual content. They do NOT have to match any heading in the source - you may rename for clarity.
4) ANCHOR must appear verbatim somewhere in the source MD body so the per-section pass can disambiguate when source structure is loose. Prefer source headings or slide-number markers when they exist.
5) BRIEF: a single sentence summarizing what is discussed in that span.
6) Accuracy - only describe content actually present in the document.
