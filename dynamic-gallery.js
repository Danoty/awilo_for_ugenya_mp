(()=>{
  'use strict';
  const gallery=document.querySelector('[data-dynamic-gallery]');
  if(!gallery)return;

  const sections={
    latest:gallery.querySelector('.current-media-grid'),
    videos:gallery.querySelector('.video-gallery'),
    archive:gallery.querySelector('.media-grid')
  };
  const archiveTitle=sections.archive?.previousElementSibling;
  const status=gallery.querySelector('#gallery-status');
  const buttons=[...gallery.querySelectorAll('[data-gallery-filter]')];
  const setFilter=filter=>{
    Object.entries(sections).forEach(([key,element])=>{if(element)element.hidden=filter!=='all'&&filter!==key});
    if(archiveTitle)archiveTitle.hidden=filter!=='all'&&filter!=='archive';
    buttons.forEach(button=>{
      const active=button.dataset.galleryFilter===filter;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    const labels={all:'Showing all campaign media',latest:'Showing the latest photographs',videos:'Showing current videos',archive:'Showing earlier campaign media'};
    if(status)status.textContent=labels[filter];
  };
  buttons.forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.galleryFilter)));

  const images=[...gallery.querySelectorAll('figure img')];
  const dialog=document.createElement('dialog');
  dialog.className='media-lightbox';
  dialog.setAttribute('aria-label','Expanded campaign photograph');
  dialog.innerHTML='<button class="lightbox-close" type="button" aria-label="Close photograph">×</button><button class="lightbox-nav previous" type="button" aria-label="Previous photograph">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lightbox-nav next" type="button" aria-label="Next photograph">›</button>';
  document.body.append(dialog);
  let current=0;
  const show=index=>{
    current=(index+images.length)%images.length;
    const source=images[current];
    dialog.querySelector('img').src=source.currentSrc||source.src;
    dialog.querySelector('img').alt=source.alt;
    dialog.querySelector('figcaption').textContent=source.closest('figure')?.querySelector('figcaption')?.textContent||source.alt;
  };
  images.forEach((img,index)=>{
    img.tabIndex=0;
    img.setAttribute('role','button');
    img.setAttribute('aria-label','Open photograph: '+img.alt);
    const open=()=>{show(index);dialog.showModal()};
    img.addEventListener('click',open);
    img.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
  });
  dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.previous').addEventListener('click',()=>show(current-1));
  dialog.querySelector('.next').addEventListener('click',()=>show(current+1));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')show(current-1);if(event.key==='ArrowRight')show(current+1)});

  const videos=[...gallery.querySelectorAll('video')];
  videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video)other.pause()})));
  setFilter('all');
})();
