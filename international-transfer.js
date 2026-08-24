(()=>{
  'use strict';
  const button=document.querySelector('#copy-swift-details');
  if(!button)return;
  const details=['Beneficiary: Willis Ondiek','Bank: KCB Bank Kenya Limited','Branch: Bondo Branch','Account number: 1250748712','SWIFT/BIC: KCBLKENX','Transfer reference: Use the FND or CMP reference generated on this page'].join('\n');
  button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(details);button.textContent='International details copied'}
    catch{button.textContent='Select and copy the details above'}
  });
})();
