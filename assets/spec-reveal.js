(function () {
  const cards = document.querySelectorAll('.spec-card');
  if (!cards.length) return;

  const showAll = () => cards.forEach(card => card.classList.add('visible'));
  if (!('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
})();
