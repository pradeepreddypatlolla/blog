
fetch('./navbar.html').then(res=>res.text()).then(res=>document.getElementById('navbar').innerHTML=res)
