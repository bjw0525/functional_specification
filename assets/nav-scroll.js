(function () {
  const navs = document.querySelectorAll('.nav');
  if (!navs.length) return;

  const isScrollable = element => element.scrollWidth > element.clientWidth;

  navs.forEach(nav => {
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const stopDragging = () => {
      if (!dragging) return;
      dragging = false;
      nav.classList.remove('is-dragging');
    };

    nav.addEventListener('pointerdown', event => {
      if (!isScrollable(nav)) return;
      dragging = true;
      startX = event.clientX;
      startScroll = nav.scrollLeft;
      nav.classList.add('is-dragging');
      nav.setPointerCapture?.(event.pointerId);
    });

    nav.addEventListener('pointermove', event => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      nav.scrollLeft = startScroll - delta;
    });

    nav.addEventListener('pointerup', stopDragging);
    nav.addEventListener('pointerleave', stopDragging);
    nav.addEventListener('pointercancel', stopDragging);

    nav.addEventListener('wheel', event => {
      if (!isScrollable(nav)) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      nav.scrollLeft += event.deltaY;
      event.preventDefault();
    }, { passive: false });
  });
})();
