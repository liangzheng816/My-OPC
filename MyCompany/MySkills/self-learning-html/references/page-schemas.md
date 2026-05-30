# Page Schemas Reference

Four page types — each with an exact HTML structure to follow.

---

## 1. `index.html` — Library Home

**Layout order (top → bottom):**

1. Hero header (site title, kicker, dek, decorative SVG loop)
2. Stats strip — 4 numbers: guide count / concept count / question count / flashcard count
3. **Practice Hub** ← primary hero, shown before the guides
4. Curriculum section — reading guide cards (secondary)
5. How-to box
6. Footer

### Practice Hub HTML

```html
<div class="sec-label">Practice — test &amp; drill what you've learned</div>
<div class="practice-hub">

  <a class="hub-card quiz" href="quiz-index.html">
    <div class="hc-wm">?</div>
    <div class="hc-type">Multiple Choice · All Guides</div>
    <div class="hub-stat">
      <div class="hs"><span class="hv">{N}</span><span class="hl">Questions</span></div>
      <div class="hs"><span class="hv">{G}</span><span class="hl">Guides</span></div>
      <div class="hs"><span class="hv">Live</span><span class="hl">Score</span></div>
    </div>
    <h2>Full <em>Quiz</em></h2>
    <p>All {N} questions in one sitting — live score tracks as you go,
       with a per-guide breakdown at the end.</p>
    <span class="hub-cta">Start Quiz →</span>
  </a>

  <a class="hub-card flash" href="flashcards-index.html">
    <div class="hc-wm">🃏</div>
    <div class="hc-type">Flip Cards · All Guides</div>
    <div class="hub-stat">
      <div class="hs"><span class="hv">{N}</span><span class="hl">Cards</span></div>
      <div class="hs"><span class="hv">{G}</span><span class="hl">Guides</span></div>
      <div class="hs"><span class="hv">Shuffle</span><span class="hl">+ Filter</span></div>
    </div>
    <h2>All <em>Flashcards</em></h2>
    <p>{N} flip cards across all guides. Filter by topic,
       shuffle the deck, or flip everything at once.</p>
    <span class="hub-cta">Browse Cards →</span>
  </a>

</div>
```

### Stats strip HTML

```html
<div class="stats">
  <div class="s"><div class="v">{guides}</div><div class="l">Learning Guides</div></div>
  <div class="s"><div class="v">{concepts}+</div><div class="l">Concepts Covered</div></div>
  <div class="s"><div class="v">{questions}</div><div class="l">Quiz Questions</div></div>
  <div class="s"><div class="v">{cards}</div><div class="l">Flashcards</div></div>
</div>
```

### Guide card HTML (one per guide)

```html
<a class="card lvl-{N}" href="{filename}">
  <div class="wm">0{N}</div>
  <div class="lvl">0{N} · {level_label}</div>
  <h3>{title}<span class="en">{subtitle}</span></h3>
  <p class="d">{description}</p>
  <div class="tags">
    <span>{tag1}</span><span>{tag2}</span>…
    <span>{Q} questions · {C} cards</span>
  </div>
  <span class="open">Read guide <span class="arw">→</span></span>
</a>
```

---

## 2. Guide Page (`guide-0N-slug.html`)

**Layout order:**

1. Masthead (back button, kicker, H1, dek)
2. Sticky topic nav (`position:sticky; top:0`) with jump links to sections + #quiz + #flashcards
3. Meta takeaway grid (3 cards: the 3 most important framing points)
4. Content sections (one per concept cluster)
5. Quiz section (`id="quiz"`)
6. Flashcards section (`id="flashcards"`)
7. Footer with cross-links to quiz-index and flashcards-index

### Content section pattern

Each content section (`<section>`) renders as a **slide panel** — a card with a
colored header bar, auto slide number, and padded content body. The HTML structure
is plain; all visual treatment comes from CSS (see `references/design-system.md §
Slide Panels`). Do NOT add wrapper divs or extra markup — the CSS selects
`section:not(#quiz):not(#flashcards)` directly.

```html
<section id="{section-slug}">
  <h2>{Section Heading}</h2>

  <p>{Plain explanation paragraph — what it is and what problem it solves}</p>

  <div class="insight">
    {Key takeaway in 1–2 sentences. What the reader should walk away knowing.}
  </div>

  <p>{Mechanics — how it works, deeper detail}</p>

  <div class="misconception">
    {The most common wrong mental model people have about this concept.}
  </div>

  <!-- Optional: code block for technical concepts -->
  <pre><code>{example code}</code></pre>
</section>
```

**What the slide panel CSS does automatically:**
- Wraps the entire section in a card with border, shadow, and rounded corners
- Renders `<h2>` as a full-width colored header bar (guide color)
- Prepends an auto-incrementing slide number chip (`01`, `02` … `NN`) via CSS counter
- Adds horizontal inset padding (`36px`) to all direct child content elements
- Draws a subtle gradient bottom strip as a visual close
- Quiz (`#quiz`) and flashcard (`#flashcards`) sections are excluded from slide styling

**Rule:** Every content section in a guide page MUST use this pattern. Do not use
bare `<div>` wrappers instead of `<section>` — the CSS counter relies on the element
being a `<section>`.

**Section count guideline:** 4–8 sections per guide. Each section maps to one nav
entry and one numbered slide.

### Per-guide quiz (at bottom of guide page)

```html
<section id="quiz">
  <div class="sec-label">Quiz — {guide title}</div>

  <div class="q-item" id="q{N}_{n}">
    <div class="q-text">{n}. {Question text}</div>
    <div class="options">
      <label><input type="radio" name="q{N}_{n}" value="a"> {Option A}</label>
      <label><input type="radio" name="q{N}_{n}" value="b" data-correct="true"> {Option B}</label>
      <label><input type="radio" name="q{N}_{n}" value="c"> {Option C}</label>
      <label><input type="radio" name="q{N}_{n}" value="d"> {Option D}</label>
    </div>
    <button class="check-btn"
      onclick="checkQ('q{N}_{n}', 'g{N}', {total_questions_in_guide})">
      Check Answer
    </button>
    <div class="explanation" style="display:none">
      {1–2 sentence explanation of why the correct answer is right}
    </div>
  </div>

  <!-- repeat for each question -->

  <button class="score-btn" onclick="showScore()">See my score</button>
  <div id="score-panel" style="display:none">
    <div class="score-display">
      <span id="score-correct">0</span> / <span id="score-total">{N}</span>
    </div>
  </div>
</section>
```

### Per-guide flashcards (at bottom of guide page)

```html
<section id="flashcards">
  <div class="sec-label">Flashcards — {guide title}</div>
  <div class="fc-grid">
    <!-- One .fc div per concept — see page-schemas.md §4 for the full card HTML -->
  </div>
</section>
```

---

## 3. `quiz-index.html` — All Guides Combined

**Layout order:**

1. Masthead (back to index, kicker "Full Quiz · All Guides", H1, dek)
2. Live dashboard (3 stat boxes: Answered / Correct / Score% with progress bar)
3. Guide sections (questions grouped under colored guide badges)
4. Final score panel (hidden until all answered — overall % + per-guide breakdown)
5. Cross-link bar (link to flashcards-index)

### Live dashboard HTML

```html
<div class="dashboard">
  <div class="dash-stat">
    <div class="ds-v" id="d-answered">0</div>
    <div class="ds-l">Answered</div>
  </div>
  <div class="dash-stat">
    <div class="ds-v" id="d-correct">0</div>
    <div class="ds-l">Correct</div>
  </div>
  <div class="dash-stat">
    <div class="ds-v" id="d-pct">0%</div>
    <div class="ds-l">Score</div>
    <div class="dbar"><div class="dbar-fill" id="dbar-fill" style="width:0%"></div></div>
  </div>
</div>
```

### Guide section header HTML

```html
<div class="guide-section-head">
  <span class="gsec-badge g{N}">0{N} · {level_label}</span>
  <span class="gsec-title">{Guide Title}</span>
  <span class="gsec-score" id="score-g{N}">0 / {total} correct</span>
</div>
```

### Final score panel HTML

```html
<div id="final-panel" style="display:none">
  <div class="final-score">
    <div class="fs-pct" id="fs-pct">—%</div>
    <div class="fs-label">Final Score</div>
  </div>
  <div class="breakdown-grid">
    <div class="bk" id="bk1"><div class="bk-label">Guide 1</div><div class="bk-val" id="bk1-val">—</div></div>
    <div class="bk" id="bk2"><div class="bk-label">Guide 2</div><div class="bk-val" id="bk2-val">—</div></div>
    <div class="bk" id="bk3"><div class="bk-label">Guide 3</div><div class="bk-val" id="bk3-val">—</div></div>
  </div>
  <button onclick="resetAll()">↺ Try again</button>
</div>
```

---

## 4. `flashcards-index.html` — All Cards Combined

**Layout order:**

1. Masthead (back to index, kicker "Flashcard Deck · All Guides · N Unique Cards", H1, dek)
2. Controls bar (filter tabs + Shuffle / Flip All / Reset buttons)
3. Counter bar ("Showing N cards · M flipped")
4. **Single flat card grid** — ALL cards, alphabetically sorted, NO section dividers
5. Cross-link bar
6. Footer

### Controls bar HTML

```html
<div class="controls">
  <div class="filter-tabs">
    <button class="ftab active" data-f="all"  onclick="setFilter('all')">All {N}</button>
    <button class="ftab"        data-f="g1"   onclick="setFilter('g1')">01 · Foundations</button>
    <button class="ftab"        data-f="g2"   onclick="setFilter('g2')">02 · Applied</button>
    <button class="ftab"        data-f="g3"   onclick="setFilter('g3')">03 · Advanced</button>
  </div>
  <div class="ctrl-btns">
    <button class="cbtn" onclick="shuffleCards()">⇄ Shuffle</button>
    <button class="cbtn" id="flip-all-btn" onclick="flipAll()">↻ Flip All</button>
    <button class="cbtn" onclick="resetAll()">↺ Reset</button>
  </div>
</div>
```

### Flashcard HTML (one card)

```html
<div class="fc" data-g="g{N}" onclick="flip(this)">
  <div class="fc-inner">

    <div class="fc-front">
      <div class="fc-tags">
        <span class="gtag g{N}">0{N} · {level_label}</span>
        <!-- For multi-guide concepts, add more spans: -->
        <!-- <span class="gtag g{M}">0{M} · {level_label}</span> -->
      </div>
      <div class="fc-term">{Term}</div>
      <div class="fc-tap">tap to reveal →</div>
    </div>

    <div class="fc-back">
      <div class="fc-def">{Definition — ≤40 words, plain language}</div>
      <div class="fc-tap">← tap to flip back</div>
    </div>

  </div>
</div>
```

**Key rule:** `data-g` on `.fc` = the primary guide (where the concept first appeared).
All guide tags appear in `.fc-tags`. Alphabetical order in the grid.

### Flashcard CSS (3D flip — copy exactly)

```css
.fc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:18px; }
.fc      { perspective:900px; height:190px; cursor:pointer; }
.fc.hidden { display:none; }
.fc-inner  { position:relative; width:100%; height:100%;
             transform-style:preserve-3d;
             transition:transform .45s cubic-bezier(.4,0,.2,1); }
.fc.flipped .fc-inner { transform:rotateY(180deg); }

.fc-front, .fc-back {
  position:absolute; inset:0; border-radius:13px; padding:22px 22px 18px;
  backface-visibility:hidden; -webkit-backface-visibility:hidden;
  display:flex; flex-direction:column; justify-content:space-between;
}
.fc-front { background:var(--card); border:1.5px solid var(--rule); }
.fc-back  { transform:rotateY(180deg); }

/* Guide-specific borders and back colors */
.fc[data-g="g1"] .fc-front { border-left:4px solid var(--g1); }
.fc[data-g="g1"] .fc-back  { background:var(--g1); }
.fc[data-g="g2"] .fc-front { border-left:4px solid var(--g2); }
.fc[data-g="g2"] .fc-back  { background:#7a5400; }
.fc[data-g="g3"] .fc-front { border-left:4px solid var(--g3); }
.fc[data-g="g3"] .fc-back  { background:#3a1a10; }

/* Text colors on card faces */
.fc[data-g="g1"] .fc-term { color:var(--g1); }
.fc[data-g="g2"] .fc-term { color:var(--g2); }
.fc[data-g="g3"] .fc-term { color:var(--g3); }
.fc-term { font-family:"JetBrains Mono",monospace; font-weight:600; font-size:14px; }

.fc[data-g="g1"] .fc-def { color:#e8f0ef; }
.fc[data-g="g2"] .fc-def { color:#fff8e6; }
.fc[data-g="g3"] .fc-def { color:#f5d6ce; }
.fc-def { font-size:13.5px; line-height:1.45; }

.fc-tap { font-family:"JetBrains Mono",monospace; font-size:11px; color:var(--ink-soft); margin-top:auto; }
.fc-back .fc-tap { color:rgba(255,255,255,.45); }
```
