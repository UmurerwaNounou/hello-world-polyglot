// ── Filter Logic ──────────────────────────────────────────
const buttons = document.querySelectorAll('.btn');
const cards   = document.querySelectorAll('.card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.lang;

    // Update active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    cards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;

      if (match) {
        card.classList.remove('hidden');
        // Stagger re-entry animation
        card.style.animationDelay = `${i * 60}ms`;
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Copy code on click ────────────────────────────────────
cards.forEach(card => {
  const pre = card.querySelector('pre');
  if (!pre) return;

  pre.title = 'Click to copy';
  pre.style.cursor = 'pointer';

  pre.addEventListener('click', () => {
    const text = pre.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      const original = pre.style.color;
      pre.style.color = '#e8ff4a';
      setTimeout(() => { pre.style.color = original; }, 600);
    });
  });
});
