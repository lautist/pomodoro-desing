(function() {
    const getElement = (id) => document.getElementById(id);

    const elements = {
        timeRemaining: getElement("time-remaining"),
        startBtn: getElement("start-timer"),
        pauseBtn: getElement("pause-timer"),
        stopBtn: getElement("stop-timer"),
        minInput: getElement("min-timer"),
        secInput: getElement("sec-timer"),
        inputGroup: getElement("timer-input-group")
    };

    let intervalId = null;
    let timeFuture = null; // Usar timeFuture en lugar de fechaFuturo
    let temporalDifference = 0; // Usar temporalDifference en lugar de diferenciaTemporal

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
        const seconds = (totalSeconds % 60).toFixed(1); // Mantener un decimal para centésimas
        return `${formatValue(minutes)}:${formatValue(seconds)}`;
    };

    const startTimer = (initialMinutes, initialSeconds) => {
        hideElement(elements.inputGroup);
        showElement(elements.pauseBtn);
        hideElement(elements.startBtn);
        hideElement(elements.stopBtn);

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
                showElement(elements.stopBtn); // Mostrar el botón de stop al finalizar
                elements.timeRemaining.textContent = "00:00.0"; // Asegurar que muestre 00:00.0
                // Opcional: Sonido de finalización
            } else {
                elements.timeRemaining.textContent = millisecondsToMinutesAndSeconds(remainingTime);
            }
        }, 50); // Intervalo de 50ms para una actualización fluida sin ser excesiva
    };

    const pauseTimer = () => {
        hideElement(elements.pauseBtn);
        showElement(elements.startBtn);
        showElement(elements.stopBtn);
        temporalDifference = timeFuture - new Date().getTime(); // Guardar la diferencia
        clearInterval(intervalId);
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        timeFuture = null;
        temporalDifference = 0;
        elements.timeRemaining.textContent = "00:00.0";
        initTimer(); // Reiniciar al estado inicial
    };

    const initTimer = () => {
        elements.minInput.value = "";
        elements.secInput.value = "";
        showElement(elements.inputGroup);
        showElement(elements.startBtn);
        hideElement(elements.pauseBtn);
        hideElement(elements.stopBtn);
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