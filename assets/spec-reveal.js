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

(function () {
  const navs = document.querySelectorAll('.nav');
  if (!navs.length) return;

  navs.forEach(nav => {
    const items = Array.from(nav.querySelectorAll('a'));
    if (!items.length) return;

    let indicator = nav.querySelector('.nav-indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'nav-indicator';
      nav.appendChild(indicator);
    }

    const defaultColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim() || '#03c75a';

    let currentTarget = null;
    const updatePosition = () => {
      if (!currentTarget) return;
      const color = currentTarget.dataset.activeColor || defaultColor;
      indicator.style.width = `${currentTarget.offsetWidth}px`;
      indicator.style.left = `${currentTarget.offsetLeft - nav.scrollLeft}px`;
      indicator.style.backgroundColor = color;
    };

    const handleIndicator = target => {
      if (!target) return;
      currentTarget = target;
      items.forEach(item => {
        item.classList.remove('nav-is-active');
        item.style.removeProperty('color');
      });
      const color = target.dataset.activeColor || defaultColor;
      updatePosition();
      target.classList.add('nav-is-active');
      target.style.color = color;
    };

    nav.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    items.forEach(item => {
      if (!item.dataset.activeColor) {
        item.dataset.activeColor = defaultColor;
      }
      item.addEventListener('mouseenter', () => handleIndicator(item));
      item.addEventListener('focus', () => handleIndicator(item));
      if (item.classList.contains('active')) {
        handleIndicator(item);
      }
    });

    if (!nav.querySelector('a.active')) {
      handleIndicator(items[0]);
    }
  });
})();

(function () {
  const hero = document.querySelector('.hero-with-image');
  if (!hero) return;

  const reveal = () => hero.classList.add('hero-visible');
  if (!('IntersectionObserver' in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      reveal();
      observer.disconnect();
    });
  }, { threshold: 0.3 });

  observer.observe(hero);
})();

(function () {
  const figures = document.querySelectorAll('.hero-figure.image-cycle');
  figures.forEach(figure => {
    const images = Array.from(figure.querySelectorAll('.hero-image'));
    if (images.length <= 1) return;

    let current = 0;
    const show = index => {
      images.forEach((img, i) => {
        img.classList.toggle('is-active', i === index);
      });
    };

    figure.addEventListener('click', () => {
      current = (current + 1) % images.length;
      show(current);
    });
  });
})();
