(() => {
  'use strict';
  const languages = [
    ['en', 'English'], ['sw', 'Kiswahili'], ['luo', 'Dholuo'],
    ['fr', 'French'], ['ar', 'Arabic'], ['es', 'Spanish'],
    ['de', 'German'], ['pt', 'Portuguese'], ['hi', 'Hindi'], ['zh-CN', 'Chinese']
  ];

  const translatorHost = document.createElement('div');
  translatorHost.id = 'google_translate_element';
  translatorHost.setAttribute('aria-hidden', 'true');
  document.body.append(translatorHost);

  const control = document.createElement('div');
  control.className = 'language-control notranslate';
  control.setAttribute('translate', 'no');
  const label = document.createElement('label');
  label.htmlFor = 'site-language';
  label.textContent = 'Language';
  const select = document.createElement('select');
  select.id = 'site-language';
  select.setAttribute('aria-label', 'Translate this page without leaving the website');
  const status = document.createElement('span');
  status.className = 'translation-status sr-only';
  status.setAttribute('aria-live', 'polite');
  languages.forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    select.append(option);
  });
  control.append(label, select, status);
  document.body.append(control);

  const setLanguage = (code, attempts = 0) => {
    const googleSelect = document.querySelector('.goog-te-combo');
    if (!googleSelect && attempts < 40) {
      status.textContent = 'Loading translation';
      window.setTimeout(() => setLanguage(code, attempts + 1), 250);
      return;
    }
    if (!googleSelect) {
      status.textContent = 'Translation is temporarily unavailable. Please try again.';
      select.value = 'en';
      return;
    }
    googleSelect.value = code === 'en' ? '' : code;
    googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
    status.textContent = code === 'en' ? 'Showing English' : `Translating to ${select.selectedOptions[0].textContent}`;
  };
  select.addEventListener('change', () => setLanguage(select.value));

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: languages.map(([code]) => code).filter(code => code !== 'en').join(','),
      autoDisplay: false
    }, 'google_translate_element');
  };

  const googleScript = document.createElement('script');
  googleScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  googleScript.async = true;
  googleScript.referrerPolicy = 'no-referrer-when-downgrade';
  googleScript.addEventListener('error', () => {
    status.textContent = 'Translation is temporarily unavailable. Please try again later.';
  });
  document.head.append(googleScript);
})();
