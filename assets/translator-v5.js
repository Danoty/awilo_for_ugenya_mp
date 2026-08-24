(()=>{
  'use strict';
  if(document.querySelector('#site-language'))return;

  const SITE_ORIGIN='https://willisondiekfoundation.org';
  const languages=[['en','English'],['sw','Kiswahili'],['luo','Dholuo'],['fr','French'],['ar','Arabic'],['es','Spanish'],['de','German'],['pt','Portuguese'],['hi','Hindi'],['zh-CN','Chinese']];
  const control=document.createElement('div');
  control.className='language-control notranslate';
  control.setAttribute('translate','no');
  control.innerHTML='<label for="site-language">Language</label><select id="site-language" aria-label="Translate this website"></select><span class="translation-state" role="status" aria-live="polite">Select</span>';
  document.body.append(control);

  const select=control.querySelector('select');
  const state=control.querySelector('.translation-state');
  languages.forEach(([code,name])=>select.add(new Option(name,code)));

  const onTranslationProxy=/\.translate\.goog$/i.test(location.hostname)||location.hostname==='translate.google.com';
  const originalPage=()=>{
    if(onTranslationProxy){
      const cleanPath=location.pathname==='/'?'/':location.pathname;
      return SITE_ORIGIN+cleanPath;
    }
    return location.href;
  };
  const activeLanguage=new URLSearchParams(location.search).get('_x_tr_tl');
  if(activeLanguage&&languages.some(([code])=>code===activeLanguage)){
    select.value=activeLanguage;
    state.textContent=select.selectedOptions[0].textContent;
  }

  select.addEventListener('change',()=>{
    const code=select.value;
    const source=originalPage();
    if(code==='en'){location.assign(source);return}
    if(!/^https?:$/.test(location.protocol)){
      state.textContent='Publish online first';
      select.value='en';
      return;
    }
    state.textContent='Opening translation…';
    location.assign('https://translate.google.com/translate?sl=en&tl='+encodeURIComponent(code)+'&u='+encodeURIComponent(source));
  });
})();
