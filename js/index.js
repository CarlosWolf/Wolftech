document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const closeButtons = document.querySelectorAll('.close-dropdown');

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const headerTop = document.querySelector('.header-top');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }

    // Evitar que clicks dentro del menú se propaguen al document
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Manejo de links (desktop: dropdown hover/click, mobile: acordeón)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdown = document.getElementById(dropdownId);

            // Si no hay submenu, no prevenimos la navegación
            if (!dropdown) return;

            e.preventDefault(); // sí prevenir navegación si hay submenu

            if (isMobile()) {
                // Móvil: toggle acordeón sin cerrar todo
                dropdown.classList.toggle('active');
            } else {
                // Desktop: comportamiento anterior (solo un dropdown abierto)
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                } else {
                    closeAllDropdowns();
                    dropdown.classList.add('active');
                }
            }
        });
    });

    // Botones X en dropdowns (desktop)
    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            this.parentElement.classList.remove('active');
        });
    });

    // Cerrar dropdowns al hacer clic fuera (solo en desktop)
    document.addEventListener('click', function (e) {
        if (!isMobile()) {
            // Si el clic no es un nav-link ni dentro de un dropdown -> cerrar
            if (!e.target.matches('.nav-link') && !e.target.closest('.dropdown-content')) {
                closeAllDropdowns();
            }
        }
    });

    // Abrir / cerrar menú móvil (hamburger)
    if (menuToggle) {
        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation(); // evitar que el document lo cierre inmediatamente
            navMenu.classList.toggle("active");
            // al abrir menú, cerramos submenus abiertos por seguridad
            if (navMenu.classList.contains("active")) {
                // no cerramos dropdowns al abrir; opcional: closeAllDropdowns();
            } else {
                closeAllDropdowns();
            }
        });
    }

    // Cerrar menú móvil al clicar fuera: ahora comprobamos que el clic NO sea ni en headerTop ni en navMenu
    document.addEventListener('click', function (e) {
        if (isMobile()) {
            const clickedInsideHeader = !!e.target.closest('.header-top');
            const clickedInsideNavMenu = !!e.target.closest('#navMenu');

            if (!clickedInsideHeader && !clickedInsideNavMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                closeAllDropdowns();
            }
        }
    });

    // Cerrar menú móvil al tocar una opción del submenu (enlaces dentro del dropdown)
    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', () => {
            if (isMobile()) {
                navMenu.classList.remove('active');
                closeAllDropdowns();
            }
        });
    });
});
