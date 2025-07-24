(function() {
    let centesimas = 0;
    let segundos = 0;
    let minutos = 0;
    let horas = 0;
    let intervalId = null; // Usar un nombre más descriptivo para el ID del intervalo

    const getElement = (id) => document.getElementById(id);

    const elements = {
        centesimas: getElement("centesimas"),
        segundos: getElement("segundos"),
        minutos: getElement("minutos"),
        horas: getElement("horas"),
        startBtn: getElement("start-stopwatch"),
        pauseBtn: getElement("pause-stopwatch"),
        resumeBtn: getElement("resume-stopwatch"),
        resetBtn: getElement("reset-stopwatch")
    };

    // Función auxiliar para agregar un cero delante si el número es menor que 10
    const formatTime = (value) => value < 10 ? "0" + value : value;

    const updateDOM = () => {
        elements.centesimas.innerHTML = ":" + formatTime(centesimas);
        elements.segundos.innerHTML = ":" + formatTime(segundos);
        elements.minutos.innerHTML = ":" + formatTime(minutos);
        elements.horas.innerHTML = formatTime(horas);
    };

    const enableButtons = (start, pause, resume, reset) => {
        elements.startBtn.disabled = !start;
        elements.pauseBtn.disabled = !pause;
        elements.resumeBtn.disabled = !resume;
        elements.resetBtn.disabled = !reset;
    };

    const stopwatchLogic = () => {
        centesimas++;
        if (centesimas > 99) { // Ajuste para que las centésimas vayan de 0 a 99
            centesimas = 0;
            segundos++;
        }
        if (segundos > 59) {
            segundos = 0;
            minutos++;
        }
        if (minutos > 59) {
            minutos = 0;
            horas++;
        }
        updateDOM();
    };

    const startStopwatch = () => {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(stopwatchLogic, 10); // Intervalo más preciso para centésimas
        enableButtons(false, true, false, true);
    };

    const pauseStopwatch = () => {
        clearInterval(intervalId);
        enableButtons(false, false, true, true);
    };

    const resetStopwatch = () => {
        clearInterval(intervalId);
        centesimas = 0;
        segundos = 0;
        minutos = 0;
        horas = 0;
        updateDOM();
        enableButtons(true, false, false, false);
    };

    // Inicialización de botones
    elements.startBtn.addEventListener("click", startStopwatch);
    elements.pauseBtn.addEventListener("click", pauseStopwatch);
    elements.resumeBtn.addEventListener("click", startStopwatch); // Reanudar es como iniciar
    elements.resetBtn.addEventListener("click", resetStopwatch);

    // Estado inicial al cargar
    enableButtons(true, false, false, false);
    updateDOM(); // Asegura que los valores iniciales "00" se muestren correctamente
})();