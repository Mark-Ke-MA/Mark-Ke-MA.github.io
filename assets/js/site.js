(function () {
  'use strict';

  const path = window.location.pathname;
  const isPersonal = path.startsWith('/personal');
  const isPersonalEnglish = path.startsWith('/personal/en');
  const isAcademicChinese = path.startsWith('/zh');
  const currentMode = isPersonal ? 'personal' : 'academic';
  const currentLanguage = isPersonalEnglish || (!isPersonal && !isAcademicChinese) ? 'en' : 'zh';
  const personalPage = path.includes('/poetry')
    ? 'poetry'
    : path.includes('/artwork')
      ? 'artwork'
      : path.includes('/copyright')
        ? 'copyright'
        : 'home';

  const routes = {
    academic: { en: '/', zh: '/zh/' },
    personal: {
      home: { en: '/personal/en/', zh: '/personal/' },
      poetry: { en: '/personal/en/poetry/', zh: '/personal/poetry/' },
      artwork: { en: '/personal/en/artwork/', zh: '/personal/artwork/' },
      copyright: { en: '/personal/en/copyright/', zh: '/personal/copyright/' }
    }
  };

  document.documentElement.dataset.mode = currentMode;
  document.documentElement.dataset.language = currentLanguage;

  const setActive = (id, active) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.classList.toggle('is-active', active);
    if (active) element.setAttribute('aria-current', 'page');
    else element.removeAttribute('aria-current');
  };

  setActive('mode-academic', currentMode === 'academic');
  setActive('mode-personal', currentMode === 'personal');
  setActive('language-en', currentLanguage === 'en');
  setActive('language-zh', currentLanguage === 'zh');

  const academicLink = document.getElementById('mode-academic');
  const personalLink = document.getElementById('mode-personal');
  const englishLink = document.getElementById('language-en');
  const chineseLink = document.getElementById('language-zh');

  const interfaceCopy = {
    en: {
      academic: 'Academic',
      personal: 'Personal',
      skip: 'Skip to content',
      rights: 'All rights reserved.',
      academicNote: 'Research, publications and professional profile.',
      personalNote: 'Original poetry, artwork and personal writing.'
    },
    zh: {
      academic: '学术',
      personal: '个人',
      skip: '跳转至正文',
      rights: '保留所有权利。',
      academicNote: '研究、论文与学术档案。',
      personalNote: '原创诗词、画作与个人书写。'
    }
  }[currentLanguage];

  if (academicLink) academicLink.href = routes.academic[currentLanguage];
  if (personalLink) personalLink.href = routes.personal.home[currentLanguage];
  if (englishLink) {
    englishLink.href = currentMode === 'personal'
      ? routes.personal[personalPage].en
      : routes.academic.en;
  }
  if (chineseLink) {
    chineseLink.href = currentMode === 'personal'
      ? routes.personal[personalPage].zh
      : routes.academic.zh;
  }

  if (academicLink) academicLink.textContent = interfaceCopy.academic;
  if (personalLink) personalLink.textContent = interfaceCopy.personal;

  const skipLink = document.querySelector('.skip-link');
  const rights = document.querySelector('.footer-rights');
  const academicNote = document.querySelector('.footer-mode-note.academic-only');
  const personalNote = document.querySelector('.footer-mode-note.personal-only');

  if (skipLink) skipLink.textContent = interfaceCopy.skip;
  if (rights) rights.textContent = interfaceCopy.rights;
  if (academicNote) academicNote.textContent = interfaceCopy.academicNote;
  if (personalNote) personalNote.textContent = interfaceCopy.personalNote;

  document.querySelectorAll('[data-language-choice]').forEach((link) => {
    link.addEventListener('click', () => {
      try { window.localStorage.setItem('preferred-language', link.dataset.languageChoice); }
      catch (_) { /* Preference storage is optional. */ }
    });
  });

  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = year;
  });
})();
