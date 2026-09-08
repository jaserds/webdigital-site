(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');

  if (reduced) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    reveals.forEach((item) => observer.observe(item));
  }

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', `${(pointerX / innerWidth - .5) * 18}px`);
        document.documentElement.style.setProperty('--my', `${(pointerY / innerHeight - .5) * 18}px`);
        pointerFrame = 0;
      });
    });
  }

  const projects = {
    aho: {
      meta: 'Web-приложение · закупки и расходы',
      title: 'АХО',
      description: 'Заявки, каталоги, бюджеты филиалов и складов. Подробный разбор 18 страниц приложения.',
      image: 'assets/portfolio/aho/dashboard.webp',
      alt: 'Главная АХО с демонстрационными данными',
      url: 'case-aho.html',
      link: 'Разобрать все экраны',
      mark: 'WEB APP / 04'
    },
    palitra: {
      meta: 'Лендинг услуг · 2026',
      title: 'ПА<br>ЛИТРА',
      description: 'Ремонт техники, преимущества и быстрый переход к заявке в WhatsApp.',
      image: 'assets/portfolio/palitra.png',
      alt: 'Первый экран сайта сервисного центра «Палитра»',
      url: 'case-palitra.html',
      link: 'Смотреть кейс',
      mark: 'LIVE / 02'
    },
    dkmoto: {
      meta: 'Интернет-магазин · эндуро',
      title: 'DK<br>MOTO',
      description: 'Эндуро-мотоциклы и экипировка: каталог, характеристики и обращение к специалисту.',
      image: 'assets/portfolio/dkmoto-home.png',
      alt: 'Первый экран интернет-магазина DKMoto',
      url: 'case-dkmoto.html',
      link: 'Смотреть кейс',
      mark: 'LIVE / 01'
    },
    pride: {
      meta: 'Корпоративный сайт · реклама',
      title: 'AGENCY<br>PRIDE',
      description: 'Имиджевый сайт рекламного агентства: направления, ценности, география и заявки.',
      image: 'assets/portfolio/pride.png',
      alt: 'Первый экран сайта рекламного агентства Agency Pride',
      url: 'case-pride.html',
      link: 'Смотреть кейс',
      mark: 'LIVE / 03'
    }
  };
  const projectStage = document.querySelector('#projectStage');
  const projectTabs = document.querySelectorAll('[data-project]');
  const projectMeta = projectStage?.querySelector('[data-project-meta]');
  const projectTitle = projectStage?.querySelector('[data-project-title]');
  const projectDescription = projectStage?.querySelector('[data-project-description]');
  const projectLink = projectStage?.querySelector('[data-project-link]');
  const projectVisual = projectStage?.querySelector('[data-project-visual]');
  const projectImage = projectStage?.querySelector('[data-project-image]');
  const projectMark = projectStage?.querySelector('.project-image-mark');

  const showProject = (key) => {
    const project = projects[key];
    if (!project || !projectStage) return;
    projectStage.classList.add('is-switching');
    const render = () => {
      projectMeta.textContent = project.meta;
      projectTitle.innerHTML = project.title;
      projectDescription.textContent = project.description;
      projectLink.href = project.url;
      projectLink.innerHTML = `${project.link} <span>↗</span>`;
      projectVisual.href = project.url;
      projectVisual.setAttribute('aria-label', project.alt);
      projectImage.src = project.image;
      projectImage.alt = project.alt;
      projectMark.textContent = project.mark;
      projectTabs.forEach((tab) => {
        const active = tab.dataset.project === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      projectStage.classList.remove('is-switching');
    };
    if (reduced) render(); else setTimeout(render, 170);
  };
  projectTabs.forEach((tab) => tab.addEventListener('click', () => showProject(tab.dataset.project)));

  const stack = document.querySelector('[data-stack-transition]');
  const stackFront = stack?.querySelector('.contact');
  if (stack && stackFront && !reduced) {
    let stackFrame = 0;
    const updateStack = () => {
      const frontTop = stackFront.getBoundingClientRect().top;
      const mobile = innerWidth <= 640;
      const activationLine = innerHeight * (mobile ? .64 : 1);
      const progress = Math.min(1, Math.max(0, (activationLine - frontTop) / activationLine));
      stack.style.setProperty('--stack-progress', progress.toFixed(3));
      stackFrame = 0;
    };
    const requestStackUpdate = () => {
      if (!stackFrame) stackFrame = requestAnimationFrame(updateStack);
    };
    addEventListener('scroll', requestStackUpdate, { passive: true });
    addEventListener('resize', requestStackUpdate);
    updateStack();
  }

  const navLinks = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
  const navSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (navLinks.length && navSections.length) {
    const updateNavigation = () => {
      const activeSection = [...navSections].reverse().find((section) => section.getBoundingClientRect().top <= innerHeight * .35);
      navLinks.forEach((link) => {
        const active = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
        link.classList.toggle('is-current', Boolean(active));
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    };
    addEventListener('scroll', updateNavigation, { passive: true });
    updateNavigation();
  }

  const form = document.querySelector('[data-lead-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('.form-status').textContent = 'Форма готова. Подключите почту или CRM перед публикацией.';
  });
})();
