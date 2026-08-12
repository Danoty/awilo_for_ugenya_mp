document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll('a[href="campaign/"]').forEach(link=>link.setAttribute("href","campaign/index.html"));
  if(location.pathname.includes("/campaign/"))document.querySelectorAll('a[href="../"]').forEach(link=>link.setAttribute("href","../index.html"));
});
