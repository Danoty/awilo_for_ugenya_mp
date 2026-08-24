document.addEventListener('DOMContentLoaded',()=>{
  const url='https://workplace.truehost.cloud/appsuite/';
  const isCampaign=location.pathname.includes('/campaign/');
  const destination=isCampaign?document.querySelector('.nav-links'):document.querySelector('.identity-bar .wrap');
  if(destination){const link=document.createElement('a');link.className='staff-webmail'+(isCampaign?'':' staff-utility');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Open secure staff webmail in a new tab');link.textContent=isCampaign?'Staff Webmail':'Staff email login';if(!isCampaign&&destination.lastElementChild)destination.insertBefore(link,destination.lastElementChild);else destination.appendChild(link)}
  const footer=document.querySelector('footer .footer-bottom, footer .bottom');
  if(footer){const link=document.createElement('a');link.className='staff-footer-link';link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Staff Webmail Login';footer.appendChild(link)}
});
