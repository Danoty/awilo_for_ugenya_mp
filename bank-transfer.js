(()=>{
  'use strict';
  const panel=document.querySelector('.bank-panel');
  if(!panel)return;
  const account={name:'Willis Ondiek',number:'1250748712',bank:'KCB Bank',branch:'Bondo Branch'};
  const accountCopy=document.querySelector('#copy-account');
  accountCopy?.addEventListener('click',async()=>{
    await navigator.clipboard.writeText(account.number);
    accountCopy.textContent='Account number copied';
  });
  const workflow=document.createElement('div');
  workflow.className='transfer-workflow';
  workflow.innerHTML='<div class="transfer-form"><h3>Prepare your direct transfer</h3><label>Choose the initiative<select id="support-initiative"><option value="FND">Willis Ondiek Foundation</option><option value="CMP">AWILO Campaign</option></select></label><label>Donation amount (KES)<input id="donation-amount" type="number" min="1" step="1" inputmode="numeric" placeholder="Enter amount"></label><div class="amount-options" aria-label="Suggested amounts"><button type="button" data-amount="1000">KES 1,000</button><button type="button" data-amount="2500">KES 2,500</button><button type="button" data-amount="5000">KES 5,000</button><button type="button" data-amount="10000">KES 10,000</button></div><label>Programme or purpose<select id="donation-purpose"></select></label><label>Your name or organisation<input id="donor-name" autocomplete="name" required placeholder="Required for donation records"></label><label class="source-declaration"><input id="lawful-source" type="checkbox"><span>I confirm that this donation comes from a lawful source and the information supplied is accurate.</span></label><button class="page-button prepare-transfer" type="button">Generate transfer instructions</button></div><section class="transfer-summary" hidden aria-live="polite"><span class="launch-badge">TRANSFER INSTRUCTIONS READY</span><h3>Your direct KCB transfer</h3><dl><div><dt>Initiative</dt><dd id="summary-initiative"></dd></div><div><dt>Amount</dt><dd id="summary-amount"></dd></div><div><dt>Purpose</dt><dd id="summary-purpose"></dd></div><div><dt>Reference</dt><dd id="summary-reference"></dd></div></dl><div class="support-actions"><button class="copy-all" type="button">Copy all transfer details</button><a class="proof-link" target="_blank" rel="noopener">Send proof on WhatsApp</a><a class="receipt-link">Request acknowledgement by email</a></div><p class="transfer-privacy">Complete the transfer in your bank’s official app, website or branch. This website never asks for your banking password, PIN, card number or one-time code.</p></section>';
  panel.querySelector('.bank-details').before(workflow);
  const initiative=workflow.querySelector('#support-initiative');
  const amount=workflow.querySelector('#donation-amount');
  const purpose=workflow.querySelector('#donation-purpose');
  const name=workflow.querySelector('#donor-name');
  const lawful=workflow.querySelector('#lawful-source');
  const summary=workflow.querySelector('.transfer-summary');
  const purposes={
    FND:['General Foundation Support','Education and Learner Support','Agribusiness and Livelihoods','Social Support','Faith and Community Programme','Institutional Partnership'],
    CMP:['General Campaign Support','Community Engagement','Campaign Communication','Campaign Logistics','Volunteer and Field Support','Other Lawful Campaign Support']
  };
  const labels={FND:'Willis Ondiek Foundation',CMP:'AWILO Campaign'};
  const populatePurposes=()=>{purpose.innerHTML='';purposes[initiative.value].forEach(value=>purpose.add(new Option(value,value)))};
  populatePurposes();
  initiative.addEventListener('change',populatePurposes);
  workflow.querySelectorAll('[data-amount]').forEach(button=>button.onclick=()=>{amount.value=button.dataset.amount;amount.focus()});
  const makeReference=prefix=>{const date=new Date().toISOString().slice(2,10).replaceAll('-','');const random=Math.random().toString(36).slice(2,6).toUpperCase();return prefix+'-'+date+'-'+random};
  workflow.querySelector('.prepare-transfer').onclick=()=>{
    if(!amount.value||Number(amount.value)<=0){amount.setCustomValidity('Enter a valid donation amount.');amount.reportValidity();amount.setCustomValidity('');return}
    if(!name.value.trim()){name.setCustomValidity('Enter your name or organisation for donation records.');name.reportValidity();name.setCustomValidity('');return}
    if(!lawful.checked){lawful.setCustomValidity('Confirm the lawful-source declaration before continuing.');lawful.reportValidity();lawful.setCustomValidity('');return}
    const reference=makeReference(initiative.value);
    const formatted=new Intl.NumberFormat('en-KE',{style:'currency',currency:'KES',maximumFractionDigits:0}).format(Number(amount.value));
    workflow.querySelector('#summary-initiative').textContent=labels[initiative.value];
    workflow.querySelector('#summary-amount').textContent=formatted;
    workflow.querySelector('#summary-purpose').textContent=purpose.value;
    workflow.querySelector('#summary-reference').textContent=reference;
    const details=labels[initiative.value]+' donation\nAccount name: '+account.name+'\nBank: '+account.bank+'\nBranch: '+account.branch+'\nAccount number: '+account.number+'\nDonor: '+name.value.trim()+'\nAmount: '+formatted+'\nPurpose: '+purpose.value+'\nReference: '+reference;
    workflow.querySelector('.copy-all').onclick=async event=>{await navigator.clipboard.writeText(details);event.currentTarget.textContent='Transfer details copied'};
    const message='Hello, I have made a '+labels[initiative.value]+' bank transfer.\nDonor: '+name.value.trim()+'\nAmount: '+formatted+'\nPurpose: '+purpose.value+'\nReference: '+reference+'\nI will attach the payment confirmation here.';
    workflow.querySelector('.proof-link').href='https://wa.me/254728686377?text='+encodeURIComponent(message);
    workflow.querySelector('.receipt-link').href='mailto:info@willisondiekfoundation.org?subject='+encodeURIComponent('Donation acknowledgement — '+reference)+'&body='+encodeURIComponent(message+'\n\nPlease issue an acknowledgement or receipt.');
    summary.hidden=false;
    summary.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  };
})();
