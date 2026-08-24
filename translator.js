(()=>{
  'use strict';
  if(document.querySelector('#site-language'))return;
  const languages=[['en','English'],['sw','Kiswahili'],['luo','Dholuo'],['fr','French'],['ar','Arabic'],['es','Spanish'],['de','German'],['pt','Portuguese'],['hi','Hindi'],['zh-CN','Chinese']];
  const control=document.createElement('div');
  control.className='language-control notranslate';
  control.setAttribute('translate','no');
  control.innerHTML='<label for="site-language">Language</label><select id="site-language" aria-label="Translate this website"></select><span class="translation-state" role="status" aria-live="polite">Select</span>';
  document.body.append(control);
  const select=control.querySelector('select');
  const state=control.querySelector('.translation-state');
  languages.forEach(([code,name])=>select.add(new Option(name,code)));
  const originalUrl=()=>{try{return sessionStorage.getItem('original-site-page')||location.href}catch{return location.href}};
  const isTranslated=/\.translate\.goog$/i.test(location.hostname)||location.hostname==='translate.google.com';
  if(isTranslated){
    const selected=new URLSearchParams(location.search).get('_x_tr_tl');
    if(selected&&languages.some(([code])=>code===selected))select.value=selected;
    state.textContent=select.selectedOptions[0].textContent;
  }
  select.addEventListener('change',()=>{
    const code=select.value;
    const url=originalUrl();
    if(code==='en'){state.textContent='Opening English…';location.assign(url);return}
    if(!/^https?:$/.test(location.protocol)){
      state.textContent='Available on the published site';
      select.value='en';
      return;
    }
    try{sessionStorage.setItem('original-site-page',isTranslated?url:location.href)}catch{}
    state.textContent='Translating…';
    const target='https://translate.google.com/translate?sl=en&tl='+encodeURIComponent(code)+'&u='+encodeURIComponent(isTranslated?url:location.href);
    location.assign(target);
  });
})();
