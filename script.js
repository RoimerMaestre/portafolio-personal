// Obtener referencias a los elementos del DOM que se utilizan en el script.
const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

/* ===== Loader ===== */
// Oculta el contenedor del loader una vez que la página ha cargado completamente.
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;  // Desaparece gradualmente el loader.
    contenedorLoader.style.visibility = 'hidden';  // Oculta el loader.
});

/* ===== Header ===== */
// Cambia la clase del encabezado cuando el usuario hace scroll en la página.
// Si el usuario ha hecho scroll hacia abajo, se añade la clase 'abajo'.
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);  // Añade la clase si scrollY > 0, la quita si no.
});

/* ===== Botón Menú ===== */
// Muestra u oculta el menú de navegación cuando se hace clic en el botón del menú.
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    } else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/* ===== Cambio de idioma ===== */
// Cambia el idioma del sitio web cargando un archivo JSON con las traducciones y actualizando el texto en la página.
const changeLanguage = async language => {
    // Obtiene el archivo JSON que contiene las traducciones para el idioma seleccionado.
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    // Actualiza el contenido de los elementos HTML con los textos traducidos.
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;  // Obtiene la sección de la traducción.
        const value = textToChange.dataset.value;  // Obtiene la clave del texto.

        textToChange.innerHTML = texts[section][value];  // Actualiza el contenido del elemento.
    }
}

// Detecta cuando se hace clic en una bandera para cambiar el idioma.
flagsElement.addEventListener('click', (e) => {
    changeLanguage(e.target.parentElement.dataset.language);  // Cambia el idioma según la bandera seleccionada.
});

/* ===== Clase activa por secciones ===== */
// Añade una clase "active" al enlace de navegación correspondiente a la sección visible en la ventana de visualización.
// Esto permite destacar la sección en la barra de navegación mientras se hace scroll.
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;  // Altura de la sección.
        const sectionTop = current.offsetTop - 100;  // Posición de la sección en la página.
        const sectionId = current.getAttribute('id');  // Obtiene el ID de la sección.

        // Si la sección está en la vista, añade la clase "active" al enlace correspondiente en la navegación.
        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

/* ===== Botón y función ir arriba ===== */
// Muestra un botón para volver al principio de la página cuando el usuario hace scroll hacia abajo.
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');  // Muestra el botón si se ha hecho scroll hacia abajo.
    } else {
        document.querySelector('.go-top-container').classList.remove('show');  // Oculta el botón si se está en la parte superior.
}
}
// Añade un comportamiento de scroll suave al hacer clic en el botón "ir arriba".
document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,  // Vuelve al inicio de la página.
        behavior: 'smooth'  // Desplazamiento suave.
    });
});
