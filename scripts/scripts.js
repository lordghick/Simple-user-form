/* Configurando el botón del menú */

let closeMenu = document.getElementById('closeMenu'),
menuBtn = document.getElementById('menuBtn'),
linksDiv = document.getElementById('links');

/* para abrir el menu */
menuBtn.addEventListener('click', ()=>{
    closeMenu.style.display = 'initial';
    menuBtn.style.visibility = 'hidden';
    menuBtn.style.opacity = '0';
    linksDiv.style.right = '1rem';
})

/* para cerrar el menu */
closeMenu.addEventListener('click', ()=>{
    closeMenu.style.display = 'none';
    menuBtn.style.visibility = 'visible';
    menuBtn.style.opacity = '1';
    linksDiv.style.right = '-100%';
})