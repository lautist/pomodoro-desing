(function() {
    // Función para mostrar la fecha actual
    const displayCurrentDate = () => {
        const dateElement = document.getElementById("current-date");
        if (dateElement) {
            const today = new Date();
            // Formato de fecha localizado, por ejemplo: "24/7/2025" para Argentina
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateElement.textContent = today.toLocaleDateString('es-AR', options);
        }
    };

    // Inicializaciones que necesitan ejecutarse una vez que el DOM esté listo
    document.addEventListener("DOMContentLoaded", () => {
        displayCurrentDate();
        // Otras inicializaciones globales si fueran necesarias
    });
})();