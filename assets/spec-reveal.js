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

  const normalizePath = path => {
    if (!path) return '/';
    return path
      .toLowerCase()
      .replace(/\\/g, '/')
      .replace(/index\.html$/, '')
      .replace(/\/+$/, '') || '/';
  };
  const currentPath = normalizePath(window.location.pathname);

  navs.forEach(nav => {
    const items = Array.from(nav.querySelectorAll('a'));
    if (!items.length) return;

    // ensure consistent class naming
    items.forEach(item => item.classList.add('nav-item'));

    // determine current page
    let matched = false;
    items.forEach(item => {
      const href = item.getAttribute('href') || '';
      const normalized = normalizePath(new URL(href, window.location.href).pathname);
      item.classList.remove('active');
      if (!matched && normalized === currentPath) {
        item.classList.add('active');
        matched = true;
      }
    });

    const defaultColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim() || '#03c75a';

    const focusNavOn = target => {
      if (!target) return;
      const navWidth = nav.clientWidth;
      const targetCenter = target.offsetLeft + target.offsetWidth / 2;
      const desiredScroll = Math.max(0, targetCenter - navWidth / 2);
      if (typeof nav.scrollTo === 'function') {
        nav.scrollTo({ left: desiredScroll, behavior: 'smooth' });
      } else {
        nav.scrollLeft = desiredScroll;
      }
    };

    const handleIndicator = target => {
      if (!target) return;
      items.forEach(item => {
        item.classList.remove('nav-is-active');
        item.style.removeProperty('color');
      });
      target.classList.add('nav-is-active');
      target.style.color = target.dataset.activeColor || defaultColor;
    };

    let baseActive = nav.querySelector('a.active') || items[0];
    const resetToBase = () => {
      if (!baseActive) return;
      handleIndicator(baseActive);
      focusNavOn(baseActive);
    };

    items.forEach(item => {
      if (!item.dataset.activeColor) {
        item.dataset.activeColor = defaultColor;
      }
      item.addEventListener('click', event => {
        event.preventDefault();
        baseActive = item;
        handleIndicator(item);
        const href = item.getAttribute('href');
        if (href) window.location.href = href;
      });
      item.addEventListener('mouseenter', () => handleIndicator(item));
      item.addEventListener('focus', () => handleIndicator(item));
      item.addEventListener('mouseleave', resetToBase);
      item.addEventListener('blur', resetToBase);
    });

    if (!baseActive) {
      baseActive = items[0];
    }

    resetToBase();
    nav.addEventListener('scroll', resetToBase);
    window.addEventListener('resize', resetToBase);
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
