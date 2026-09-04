(() => {
  document.querySelector('.cursor-dot')?.remove();
  const cursorStyles = document.createElement('style');
  cursorStyles.textContent = 'html,body{cursor:default!important}a,button{cursor:pointer!important}';
  document.head.append(cursorStyles);

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
})();
