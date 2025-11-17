(function () {
  const navs = document.querySelectorAll('.nav');
  if (!navs.length) return;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  navs.forEach(nav => {
    if (nav.dataset.mouseScroll === 'ready') {
      return;
    }

    let rafId = null;
    let targetScroll = nav.scrollLeft;
    let currentScroll = nav.scrollLeft;

    const maxScroll = () => nav.scrollWidth - nav.clientWidth;

    const animate = () => {
      const difference = targetScroll - currentScroll;
      if (Math.abs(difference) < 0.5) {
        nav.scrollLeft = targetScroll;
        rafId = null;
        return;
      }
      currentScroll += difference * 0.15;
      nav.scrollLeft = currentScroll;
      rafId = requestAnimationFrame(animate);
    };

    const handlePointer = event => {
      if (maxScroll() <= 0) return;
      const rect = nav.getBoundingClientRect();
      const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      targetScroll = maxScroll() * ratio;
      if (!rafId) {
        currentScroll = nav.scrollLeft;
        rafId = requestAnimationFrame(animate);
      }
    };

    const cancelAnimation = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    nav.addEventListener('mousemove', handlePointer);
    nav.addEventListener('mouseenter', handlePointer);
    nav.addEventListener('mouseleave', cancelAnimation);

    nav.dataset.mouseScroll = 'ready';
  });
})();
