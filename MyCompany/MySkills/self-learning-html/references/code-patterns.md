# Code Patterns Reference

Copy these JS patterns into the relevant HTML files. Each section is self-contained.

---

## Quiz — State Machine (quiz-index.html and per-guide quiz sections)

### Core state

```javascript
const answers = {};
// Keys: question IDs like "q1_3", "q2_7"
// Values: true (correct) | false (wrong)
```

### checkQ — called by each question's Check Answer button

```javascript
function checkQ(id, group, total) {
  const item = document.getElementById(id);
  const selected = item.querySelector('input[type=radio]:checked');

  if (!selected) { alert('Please select an answer first.'); return; }

  const isCorrect = selected.hasAttribute('data-correct');
  item.classList.remove('correct', 'wrong');
  item.classList.add(isCorrect ? 'correct' : 'wrong');

  // Lock the question
  item.querySelector('.check-btn').disabled = true;
  item.querySelectorAll('input[type=radio]').forEach(r => r.disabled = true);

  // Show explanation
  const exp = item.querySelector('.explanation');
  if (exp) exp.style.display = 'block';

  // Record answer
  answers[id] = isCorrect;

  // Update all displays
  updateDashboard();
  updateSectionScore(group, total);

  // Show final panel if all questions answered
  const totalQuestions = document.querySelectorAll('.q-item').length;
  if (Object.keys(answers).length === totalQuestions) {
    setTimeout(showFinal, 400);
  }
}
```

### updateDashboard — live stats at top of quiz-index.html

```javascript
function updateDashboard() {
  const vals = Object.values(answers);
  const answered = vals.length;
  const correct  = vals.filter(Boolean).length;
  const pct      = answered ? Math.round(correct / answered * 100) : 0;

  document.getElementById('d-answered').textContent = answered;
  document.getElementById('d-correct').textContent  = correct;
  document.getElementById('d-pct').textContent      = pct + '%';

  const fill = document.getElementById('dbar-fill');
  if (fill) fill.style.width = pct + '%';
}
```

### updateSectionScore — per-guide running score

```javascript
function updateSectionScore(group, total) {
  const prefix = group.replace('g', 'q');   // "g1" → "q1"
  const keys   = Object.keys(answers).filter(k => k.startsWith(prefix + '_'));
  const correct = keys.filter(k => answers[k]).length;
  const el = document.getElementById('score-' + group);
  if (el) el.textContent = correct + ' / ' + keys.length + ' correct';
}
```

### countGroup — used by showFinal

```javascript
function countGroup(group) {
  const prefix = group.replace('g', 'q');
  const keys = Object.keys(answers).filter(k => k.startsWith(prefix + '_'));
  return {
    answered: keys.length,
    correct:  keys.filter(k => answers[k]).length
  };
}
```

### showFinal — final score panel

```javascript
function showFinal() {
  const panel = document.getElementById('final-panel');
  if (!panel) return;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const vals = Object.values(answers);
  const pct  = Math.round(vals.filter(Boolean).length / vals.length * 100);
  const pctEl = document.getElementById('fs-pct');
  if (pctEl) pctEl.textContent = pct + '%';

  // Per-guide breakdown — adapt group IDs to your actual guides
  ['g1', 'g2', 'g3'].forEach(g => {
    const { answered, correct } = countGroup(g);
    const el = document.getElementById('bk' + g.slice(1) + '-val');
    if (el) el.textContent = answered ? correct + ' / ' + answered : '—';
  });
}
```

### resetAll — reset entire quiz

```javascript
function resetAll() {
  Object.keys(answers).forEach(k => delete answers[k]);

  document.querySelectorAll('.q-item').forEach(item => {
    item.classList.remove('correct', 'wrong');
    item.querySelectorAll('input[type=radio]').forEach(r => {
      r.checked = false;
      r.disabled = false;
    });
    const btn = item.querySelector('.check-btn');
    if (btn) btn.disabled = false;
    const exp = item.querySelector('.explanation');
    if (exp) exp.style.display = 'none';
  });

  document.getElementById('d-answered').textContent = '0';
  document.getElementById('d-correct').textContent  = '0';
  document.getElementById('d-pct').textContent      = '0%';
  const fill = document.getElementById('dbar-fill');
  if (fill) fill.style.width = '0%';

  const panel = document.getElementById('final-panel');
  if (panel) panel.style.display = 'none';

  // Reset section scores
  ['g1', 'g2', 'g3'].forEach(g => {
    const el = document.getElementById('score-' + g);
    if (el) el.textContent = '0 / 0 correct';
  });
}
```

### Quiz CSS — question states

```css
.q-item { margin:24px 0; padding:22px 26px; background:var(--card);
          border:1.5px solid var(--rule); border-radius:12px; }
.q-item.correct { border-color:#2f5d62; background:#f0f6f5; }
.q-item.wrong   { border-color:#cc3b1d; background:#fdf3f0; }

.q-text { font-size:17px; font-weight:600; margin-bottom:14px; }

.options { display:flex; flex-direction:column; gap:9px; margin-bottom:16px; }
.options label { display:flex; align-items:flex-start; gap:10px;
                 font-size:16px; cursor:pointer; padding:8px 12px;
                 border-radius:7px; border:1.5px solid var(--rule);
                 background:var(--paper); transition:background .12s; }
.options label:hover { background:#ede9e0; }

/* Highlight correct/wrong options after checking */
.q-item.correct input[data-correct] + span,
.q-item.correct label:has(input[data-correct]) { background:#dde7e6; border-color:#2f5d62; }
.q-item.wrong   label:has(input:checked:not([data-correct])) { background:#fde8e3; border-color:#cc3b1d; }

.check-btn { font-family:"JetBrains Mono",monospace; font-size:12px; font-weight:600;
             padding:8px 18px; border-radius:7px; border:1.5px solid var(--slate);
             background:transparent; color:var(--slate); cursor:pointer; transition:all .14s; }
.check-btn:hover:not(:disabled) { background:var(--slate); color:#fff; }
.check-btn:disabled { opacity:.4; cursor:not-allowed; }

.explanation { margin-top:14px; padding:12px 16px; background:#f0f6f5;
               border-left:3px solid var(--slate); border-radius:6px;
               font-size:15px; color:var(--ink-soft); }
```

---

## Flashcards — Flip, Shuffle, Filter (flashcards-index.html)

```javascript
let currentFilter = 'all';
let allFlipped    = false;

const allCards     = () => document.querySelectorAll('#card-grid .fc');
const visibleCards = () => document.querySelectorAll('#card-grid .fc:not(.hidden)');

// --- Flip a single card ---
function flip(card) {
  card.classList.toggle('flipped');
  updateCounters();
}

// --- Filter by guide ---
function setFilter(f) {
  currentFilter = f;
  document.querySelectorAll('.ftab').forEach(t =>
    t.classList.toggle('active', t.dataset.f === f));
  allCards().forEach(c =>
    c.classList.toggle('hidden', f !== 'all' && c.dataset.g !== f));
  updateCounters();
}

// --- Flip all visible cards ---
function flipAll() {
  allFlipped = !allFlipped;
  [...visibleCards()].forEach(c => c.classList.toggle('flipped', allFlipped));
  document.getElementById('flip-all-btn').textContent =
    allFlipped ? '↺ Unflip All' : '↻ Flip All';
  updateCounters();
}

// --- Shuffle visible cards (Fisher-Yates, preserves hidden cards at end) ---
function shuffleCards() {
  allFlipped = false;
  document.getElementById('flip-all-btn').textContent = '↻ Flip All';

  const grid    = document.getElementById('card-grid');
  const visible = [...grid.querySelectorAll('.fc:not(.hidden)')];
  const hidden  = [...grid.querySelectorAll('.fc.hidden')];

  visible.forEach(c => c.classList.remove('flipped'));

  for (let i = visible.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [visible[i], visible[j]] = [visible[j], visible[i]];
  }

  [...visible, ...hidden].forEach(c => grid.appendChild(c));
  updateCounters();
}

// --- Reset all cards to unflipped ---
function resetAll() {
  allCards().forEach(c => c.classList.remove('flipped'));
  allFlipped = false;
  document.getElementById('flip-all-btn').textContent = '↻ Flip All';
  updateCounters();
}

// --- Update counter bar ---
function updateCounters() {
  const vis     = [...visibleCards()];
  const flipped = vis.filter(c => c.classList.contains('flipped'));
  document.getElementById('visible-count').textContent = vis.length;
  document.getElementById('flipped-count').textContent = flipped.length;
}

// Init on load
updateCounters();
```

### Filter tab CSS

```css
.ftab { font-family:"JetBrains Mono",monospace; font-size:12px; font-weight:600;
        padding:6px 14px; border-radius:6px; border:2px solid transparent;
        cursor:pointer; background:transparent; color:var(--ink-soft); transition:all .14s; }
.ftab:hover { background:#ece7db; }
.ftab.active { color:#fff; border-color:transparent; }
.ftab[data-f="all"].active { background:var(--ink); }
.ftab[data-f="g1"].active  { background:var(--g1); }
.ftab[data-f="g2"].active  { background:var(--g2); }
.ftab[data-f="g3"].active  { background:var(--g3); }
```

---

## Shared Utilities

### Smooth scroll to section (for sticky nav links)

```javascript
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

### Print trigger button (optional, add to any guide page footer)

```html
<button onclick="window.print()"
  style="font-family:'JetBrains Mono',monospace;font-size:12px;
         padding:6px 14px;border:1.5px solid var(--rule);
         border-radius:6px;background:transparent;cursor:pointer;">
  🖨 Print / Save PDF
</button>
```
