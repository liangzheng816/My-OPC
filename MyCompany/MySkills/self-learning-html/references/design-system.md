# Design System Reference

Copy the CSS in this file verbatim into every generated HTML file.

---

## CSS Variables — paste into every `:root`

```css
:root {
  --paper:       #f4f1ea;   /* warm off-white background */
  --ink:         #1b1a17;   /* near-black body text */
  --ink-soft:    #4a463d;   /* secondary text, labels */
  --rule:        #d8d2c4;   /* borders, dividers */
  --accent:      #cc3b1d;   /* red — kicker labels, Guide 3 color */
  --accent-soft: #f3ddd4;   /* light red backgrounds */
  --slate:       #2f5d62;   /* teal — Guide 1 color */
  --slate-soft:  #dde7e6;
  --amber:       #9a6a00;   /* amber — Guide 2 color */
  --amber-soft:  #f4e9cf;
  --card:        #fbf9f4;   /* card backgrounds, slightly lighter than --paper */

  /* Multi-guide shorthand vars (add to files that reference guides by ID) */
  --g1: #2f5d62;   /* = --slate */
  --g2: #9a6a00;   /* = --amber */
  --g3: #cc3b1d;   /* = --accent */
  /* g4+ if needed: pick a new dark desaturated hue */
}
```

### Guide color assignment

| Guide | Foreground | Card back bg | Soft bg |
|-------|-----------|-------------|---------|
| g1 (Foundations) | `#2f5d62` (slate) | `#2f5d62` | `#dde7e6` |
| g2 (Applied) | `#9a6a00` (amber) | `#7a5400` (darker) | `#f4e9cf` |
| g3 (Advanced) | `#cc3b1d` (accent/red) | `#3a1a10` (very dark) | `#f3ddd4` |
| g4+ | New hue | Darken by ~30% | Desaturate + lighten |

---

## Typography

```css
/* Google Fonts link — include in every <head> */
/*
https://fonts.googleapis.com/css2?
  family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900
  &family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400
  &family=JetBrains+Mono:wght@400;600
  &display=swap
*/

/* Roles */
Fraunces      → h1, h2, h3, card titles, large watermarks (weight 400/600/900)
Newsreader    → body text (18px, line-height 1.55)
JetBrains Mono → labels, tags, kickers, monospace terms, buttons (11–14px)
```

---

## Base Layout

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Newsreader", Georgia, serif;
  font-size: 18px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 1040px; margin: 0 auto; padding: 0 28px 120px; }

/* Section label — uppercase mono kicker above sections */
.sec-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--ink-soft); margin: 48px 0 6px; font-weight: 600;
}

/* Inline code */
code, .mono {
  font-family: "JetBrains Mono", monospace;
  font-size: .82em; background: #ece7db;
  padding: .08em .38em; border-radius: 4px; color: #3a382f;
}
```

---

## Insight / Misconception Boxes

```css
/* Used in guide body to flag key takeaways and wrong assumptions */
.insight, .misconception {
  border-radius: 10px;
  padding: 18px 22px;
  margin: 22px 0;
  font-size: 17px;
  line-height: 1.5;
}
.insight {
  border-left: 4px solid var(--slate);
  background: var(--slate-soft);
}
.misconception {
  border-left: 4px solid var(--accent);
  background: var(--accent-soft);
}
/* Label pattern inside the box */
.insight::before       { content: "✦ Key insight — "; font-weight: 600; color: var(--slate); }
.misconception::before { content: "✕ Common misconception — "; font-weight: 600; color: var(--accent); }
```

---

## Guide Cards (index page)

```css
.card {
  display: block; text-decoration: none; color: inherit;
  background: var(--card);
  border: 1px solid var(--rule);
  border-left: 5px solid var(--c, var(--slate));
  border-radius: 12px; padding: 26px 30px 28px; margin: 18px 0;
  position: relative; overflow: hidden;
  transition: transform .16s ease, box-shadow .16s ease;
}
.card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px -12px rgba(27,26,23,.28); }

/* Watermark number */
.card .wm {
  position: absolute; top: -22px; right: 6px;
  font-family: "Fraunces", serif; font-weight: 900;
  font-size: 150px; line-height: 1;
  color: var(--c, var(--slate)); opacity: .06; pointer-events: none;
}

/* Color variants — set --c and --cs per guide */
.lvl-1 { --c: var(--slate);  --cs: var(--slate-soft); }
.lvl-2 { --c: var(--amber);  --cs: var(--amber-soft); }
.lvl-3 { --c: var(--accent); --cs: var(--accent-soft); }
```

---

## Practice Hub Cards (index page hero)

```css
.practice-hub { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0 0; }
@media (max-width: 680px) { .practice-hub { grid-template-columns: 1fr; } }

.hub-card {
  display: block; text-decoration: none; color: inherit;
  border-radius: 16px; padding: 34px 32px; position: relative; overflow: hidden;
  transition: transform .18s ease, box-shadow .18s ease;
}
.hub-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px -14px rgba(27,26,23,.32); }
.hub-card.quiz  { background: var(--slate); color: #fff; }
.hub-card.flash { background: #1b1a17;      color: #fff; }

/* Large watermark character inside hub card */
.hub-card .hc-wm {
  position: absolute; top: -30px; right: -10px;
  font-family: "Fraunces", serif; font-weight: 900;
  font-size: 180px; line-height: 1; opacity: .07; pointer-events: none; color: #fff;
}

/* CTA button inside hub card */
.hub-cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 600;
  padding: 10px 20px; border-radius: 8px; transition: all .15s;
}
.hub-card.quiz  .hub-cta { background: #fff; color: var(--slate); }
.hub-card.flash .hub-cta { background: var(--accent); color: #fff; }
```

---

## Stats Strip

```css
.stats {
  display: flex; flex-wrap: wrap;
  margin: 34px 0 6px; border: 1px solid var(--rule);
  border-radius: 11px; overflow: hidden; background: var(--card);
}
.stats .s {
  flex: 1 1 140px; padding: 18px 22px; border-right: 1px solid var(--rule);
}
.stats .s:last-child { border-right: none; }
.stats .s .v {
  font-family: "Fraunces", serif; font-weight: 900;
  font-size: 30px; color: var(--accent); line-height: 1;
}
.stats .s .l {
  font-family: "JetBrains Mono", monospace; font-size: 11px;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--ink-soft); margin-top: 7px;
}
```

---

## Back Button & Masthead (guide pages)

```css
.back {
  font-family: "JetBrains Mono", monospace; font-size: 12px;
  text-decoration: none; color: var(--ink-soft);
  display: inline-flex; align-items: center; gap: 6px;
  margin-bottom: 22px; border: 1px solid var(--rule);
  border-radius: 6px; padding: 5px 12px; transition: all .14s;
}
.back:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); }

.kicker {
  font-family: "JetBrains Mono", monospace; font-size: 12px;
  letter-spacing: .28em; text-transform: uppercase;
  color: var(--accent); font-weight: 600; margin-bottom: 18px;
}
```

---

## Guide Tag Pills (flashcard fronts)

```css
.fc-tags  { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
.gtag {
  font-family: "JetBrains Mono", monospace; font-size: 10px;
  font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
  padding: 2px 8px; border-radius: 4px; border: 1.5px solid; line-height: 1.6;
}
.gtag.g1 { color: var(--g1); border-color: color-mix(in srgb,var(--g1) 40%,transparent); background: color-mix(in srgb,var(--g1) 10%,transparent); }
.gtag.g2 { color: var(--g2); border-color: color-mix(in srgb,var(--g2) 40%,transparent); background: color-mix(in srgb,var(--g2) 10%,transparent); }
.gtag.g3 { color: var(--g3); border-color: color-mix(in srgb,var(--g3) 40%,transparent); background: color-mix(in srgb,var(--g3) 10%,transparent); }
```

---

## Responsive & Print

```css
@media (max-width: 760px) {
  .card { padding: 22px 22px 24px; }
  .card h3 { font-size: 24px; }
  .fc-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 420px) {
  .fc-grid { grid-template-columns: 1fr; }
}
@media print {
  .card { break-inside: avoid; box-shadow: none; }
  body { background: #fff; }
}
```
