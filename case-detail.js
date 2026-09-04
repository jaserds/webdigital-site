(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reduced) reveals.forEach((item) => item.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .1 });
    reveals.forEach((item) => observer.observe(item));
  }
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    let frame = 0;
    addEventListener('pointermove', (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
        frame = 0;
      });
    });
    document.querySelectorAll('a,button').forEach((item) => {
      item.addEventListener('mouseenter', () => dot.classList.add('active'));
      item.addEventListener('mouseleave', () => dot.classList.remove('active'));
    });
  }
})();
