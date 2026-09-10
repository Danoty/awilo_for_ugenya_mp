const CACHE='willis-ondiek-foundation-public-v9';
const CORE=['./','./index.html','./foundation/','./foundation/about.html','./foundation/programmes.html','./foundation/get-involved.html','./community-stories.html','./donate.html','./privacy.html','./safeguarding.html','./governance.html','./accessibility.html','./security.html','./offline.html','./assets/page-shell.css','./assets/launch.css','./assets/visual-polish.css','./assets/world-class.css','./assets/stories.css','./assets/new-stories.css','./assets/community-stories.css','./assets/governance-team.css','./assets/publication.js','./assets/world-class.js','./assets/favicon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request).then(response=>response||caches.match('./offline.html'))))});


