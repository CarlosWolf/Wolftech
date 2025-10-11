
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const closeButtons = document.querySelectorAll('.close-dropdown');

    // Función para cerrar todos los dropdowns
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Abrir dropdown al hacer clic en un enlace del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdown = document.getElementById(dropdownId);

            // Si el dropdown ya está abierto, lo cerramos
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            } else {
                // Cerramos todos los dropdowns y abrimos el actual
                closeAllDropdowns();
                dropdown.classList.add('active');
            }
        });
    });

    // Cerrar dropdown al hacer clic en el botón de cerrar
    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            this.parentElement.classList.remove('active');
        });
    });

    // Cerrar dropdown al hacer clic fuera de él
    document.addEventListener('click', function (e) {
        if (!e.target.matches('.nav-link') && !e.target.matches('.dropdown-content') && !e.target.matches('.dropdown-content *')) {
            closeAllDropdowns();
        }
    });
});
