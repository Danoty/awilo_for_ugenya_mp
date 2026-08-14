(() => {
  'use strict';
  const languages = [
    ['en', 'English'], ['sw', 'Kiswahili'], ['luo', 'Dholuo'],
    ['fr', 'Français'], ['ar', 'العربية'], ['es', 'Español'],
    ['de', 'Deutsch'], ['pt', 'Português'], ['hi', 'हिन्दी'], ['zh-CN', '中文']
  ];
  const wrap = document.createElement('div');
  wrap.className = 'language-control';
  const label = document.createElement('label');
  label.setAttribute('for', 'site-language');
  label.textContent = 'Language';
  const select = document.createElement('select');
  select.id = 'site-language';
  select.setAttribute('aria-label', 'Translate this page');
  languages.forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    select.append(option);
  });
  select.addEventListener('change', () => {
    if (select.value === 'en') return;
    const isPublished = /^https?:$/.test(window.location.protocol) && !/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
    let sourceUrl = window.location.href;
    if (!isPublished) {
      const normalized = window.location.pathname.replace(/\\/g, '/');
      const section = normalized.match(/\/(campaign|foundation)\/[^?#]*/i);
      sourceUrl = `https://willisondiekfoundation.org${section ? section[0] : '/'}`;
    }
    const translated = `https://translate.google.com/translate?sl=en&tl=${encodeURIComponent(select.value)}&u=${encodeURIComponent(sourceUrl)}`;
    window.location.assign(translated);
  });
  wrap.append(label, select);
  document.body.append(wrap);
})();
