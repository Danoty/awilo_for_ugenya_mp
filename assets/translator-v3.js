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

  select.addEventListener('change',()=>{
    const code=select.value;
    if(code==='en'){
      const saved=sessionStorage.getItem('wo-original-page');
      if(saved)location.assign(saved);
      return;
    }
    if(!/^https?:$/.test(location.protocol)){
      state.textContent='Publish online first';
      select.value='en';
      return;
    }
    state.textContent='Opening translation…';
    sessionStorage.setItem('wo-original-page',location.href);
    const translateUrl='https://translate.google.com/translate?sl=en&tl='+encodeURIComponent(code)+'&u='+encodeURIComponent(location.href);
    location.href=translateUrl;
  });
})();
