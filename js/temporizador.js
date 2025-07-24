(function() {
    const getElement = (id) => document.getElementById(id);

    const elements = {
        timeRemaining: getElement("time-remaining"),
        startBtn: getElement("start-timer"),
        pauseBtn: getElement("pause-timer"), // El botón de pausar
        stopBtn: getElement("stop-timer"),
        minInput: getElement("min-timer"),
        secInput: getElement("sec-timer"),
        inputGroup: getElement("timer-input-group")
    };

    let intervalId = null;
    let timeFuture = null;
    let temporalDifference = 0;

    const hideElement = (element) => {
        element.style.display = "none";
    };

    const showElement = (element) => {
        element.style.display = "";
    };

    const formatValue = (value) => value < 10 ? "0" + value : "" + value;

    const millisecondsToMinutesAndSeconds = (ms) => {
        const totalSeconds = ms / 1000;
        const minutes = parseInt(totalSeconds / 60);
        const seconds = (totalSeconds % 60).toFixed(1);
        return `${formatValue(minutes)}:${formatValue(seconds)}`;
    };

    const startTimer = (initialMinutes, initialSeconds) => {
        hideElement(elements.inputGroup);
        showElement(elements.pauseBtn);
        elements.pauseBtn.disabled = false; // <--- HABILITAR el botón de pausar aquí
        hideElement(elements.startBtn);
        elements.stopBtn.disabled = false; // Asegurar que el stop esté habilitado si se muestra
        showElement(elements.stopBtn); // Mostrar el botón de detener al iniciar también

        if (timeFuture && temporalDifference > 0) { // Si se está reanudando
            timeFuture = new Date().getTime() + temporalDifference;
            temporalDifference = 0;
        } else { // Si es un inicio nuevo
            const totalMilliseconds = (initialSeconds + initialMinutes * 60) * 1000;
            timeFuture = new Date().getTime() + totalMilliseconds;
        }

        clearInterval(intervalId);
        intervalId = setInterval(() => {
            const remainingTime = timeFuture - new Date().getTime();

            if (remainingTime <= 0) {
                clearInterval(intervalId);
                hideElement(elements.pauseBtn);
                elements.pauseBtn.disabled = true; // Deshabilitar pause al finalizar
                // El botón de stop ya está visible.
                elements.timeRemaining.textContent = "00:00.0";
                // Opcional: Sonido de finalización
                stopTimer(); // Llamar a stopTimer para reiniciar completamente el estado
            } else {
                elements.timeRemaining.textContent = millisecondsToMinutesAndSeconds(remainingTime);
            }
        }, 50);
    };

    const pauseTimer = () => {
        hideElement(elements.pauseBtn);
        elements.pauseBtn.disabled = true; // <--- DESHABILITAR el botón de pausar al pausar
        showElement(elements.startBtn);
        elements.startBtn.disabled = false; // Habilitar botón de iniciar (reanudar)
        showElement(elements.stopBtn);
        elements.stopBtn.disabled = false; // Habilitar botón de detener
        temporalDifference = timeFuture - new Date().getTime();
        clearInterval(intervalId);
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        timeFuture = null;
        temporalDifference = 0;
        elements.timeRemaining.textContent = "00:00.0";
        initTimer(); // Vuelve al estado inicial, que deshabilitará todos los botones excepto el de iniciar
    };

    const initTimer = () => {
        elements.minInput.value = "";
        elements.secInput.value = "";
        showElement(elements.inputGroup);
        showElement(elements.startBtn);
        elements.startBtn.disabled = false; // Asegurar que el botón de iniciar esté habilitado

        hideElement(elements.pauseBtn);
        elements.pauseBtn.disabled = true; // <--- DESHABILITAR el botón de pausar en la inicialización

        hideElement(elements.stopBtn);
        elements.stopBtn.disabled = true; // <--- DESHABILITAR el botón de detener en la inicialización
    };

    const startClickHandler = () => {
        const minutes = parseInt(elements.minInput.value) || 0;
        const seconds = parseInt(elements.secInput.value) || 0;

        if ((isNaN(minutes) || isNaN(seconds) || (seconds <= 0 && minutes <= 0))) {
            alert("Por favor, introduce un tiempo válido (minutos o segundos deben ser mayores que 0).");
            return;
        }

        startTimer(minutes, seconds);
    };

    // Event Listeners
    elements.startBtn.addEventListener("click", startClickHandler);
    elements.pauseBtn.addEventListener("click", pauseTimer);
    elements.stopBtn.addEventListener("click", stopTimer);

    // Inicialización al cargar la página
    initTimer();
})();