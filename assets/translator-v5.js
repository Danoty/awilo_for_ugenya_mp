(()=>{
  'use strict';
  if(document.querySelector('.language-switcher'))return;
  const SITE_ORIGIN='https://willisondiekfoundation.org';
  const LANGUAGES=[
    {code:'en',label:'English',short:'EN'},
    {code:'sw',label:'Kiswahili',short:'SW'},
    {code:'luo',label:'Dholuo',short:'LUO'}
  ];
  const onProxy=/\.translate\.goog$/i.test(location.hostname)||location.hostname==='translate.google.com';
  const params=new URLSearchParams(location.search);
  const proxyLanguage=params.get('_x_tr_tl');
  const savedLanguage=(()=>{try{return localStorage.getItem('wof-language')}catch{return null}})();
  const active=LANGUAGES.some(x=>x.code===proxyLanguage)?proxyLanguage:'en';
  document.documentElement.lang=active;

  const originalUrl=()=>{
    if(!onProxy)return location.href;
    const clean=new URL(SITE_ORIGIN+location.pathname);
    for(const [key,value] of params)if(!key.startsWith('_x_tr_'))clean.searchParams.append(key,value);
    clean.hash=location.hash;
    return clean.href;
  };
  const translatedUrl=(code)=>'https://translate.google.com/translate?sl=en&tl='+encodeURIComponent(code)+'&u='+encodeURIComponent(originalUrl());
  const publicSite=/^https?:$/.test(location.protocol)&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1';

  const switcher=document.createElement('nav');
  switcher.className='language-switcher notranslate';
  switcher.setAttribute('translate','no');
  switcher.setAttribute('aria-label','Choose website language');
  switcher.innerHTML='<span class="language-switcher-label">Language</span>';
  const notice=document.createElement('div');
  notice.className='translation-notice notranslate';
  notice.setAttribute('translate','no');
  notice.setAttribute('role','status');
  notice.setAttribute('aria-live','polite');

  const announce=(message)=>{notice.textContent=message;notice.classList.add('show');setTimeout(()=>notice.classList.remove('show'),3200)};
  for(const language of LANGUAGES){
    const button=document.createElement('button');
    button.type='button';
    button.className='language-option';
    button.textContent=language.short;
    button.title=language.label;
    button.setAttribute('aria-label','View this website in '+language.label);
    button.setAttribute('aria-current',String(active===language.code));
    button.addEventListener('click',()=>{
      try{localStorage.setItem('wof-language',language.code)}catch{}
      if(language.code===active)return;
      if(!publicSite){announce('Translation is ready and will open after the website is published.');return}
      announce(language.code==='sw'?'Inafungua Kiswahili…':language.code==='luo'?'Yawo Dholuo…':'Opening English…');
      location.assign(language.code==='en'?originalUrl():translatedUrl(language.code));
    });
    switcher.append(button);
  }
  document.body.append(switcher,notice);

  if(!onProxy&&publicSite&&savedLanguage&&savedLanguage!=='en'&&LANGUAGES.some(x=>x.code===savedLanguage)){
    location.replace(translatedUrl(savedLanguage));
  }
})();
