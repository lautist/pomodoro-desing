(function() {
    const pomodoro = {
        started: false,
        minutes: 0,
        seconds: 0,
        interval: null,
        minutesDom: null,
        secondsDom: null,
        // fillerDom: null, // Si no se usa para una barra visual, se puede eliminar
        
        init: function() {
            this.minutesDom = document.querySelector('#pomodoro-minutes');
            this.secondsDom = document.querySelector('#pomodoro-seconds');
            // this.fillerDom = document.querySelector('#filler'); // Si no se usa, eliminar

            // Inicia el intervalo principal que verifica el tiempo cada segundo
            this.interval = setInterval(this.intervalCallback.bind(this), 1000);

            // Asignar eventos a los botones
            document.querySelector('#pomodoro-work').onclick = this.startWork.bind(this);
            document.querySelector('#pomodoro-short-break').onclick = this.startShortBreak.bind(this);
            document.querySelector('#pomodoro-long-break').onclick = this.startLongBreak.bind(this);
            document.querySelector('#pomodoro-reset').onclick = this.stopTimer.bind(this);
        },

        resetVariables: function(mins, secs, startedState) {
            this.minutes = mins;
            this.seconds = secs;
            this.started = startedState;
            // this.fillerIncrement = 200 / (this.minutes * 60); // Si no se usa, eliminar
            // this.fillerHeight = 0; // Si no se usa, eliminar
            this.updateDom(); // Actualizar el DOM inmediatamente después del reset
        },

        startWork: function() {
            this.resetVariables(25, 0, true);
        },

        startShortBreak: function() {
            this.resetVariables(5, 0, true);
        },

        startLongBreak: function() {
            this.resetVariables(15, 0, true);
        },

        stopTimer: function() {
            this.resetVariables(25, 0, false); // Vuelve al estado inicial del Pomodoro
            // this.fillerHeight = 0; // Si no se usa, eliminar
            // this.updateDom(); // Llamado dentro de resetVariables
        },

        toDoubleDigit: function(num) {
            return num < 10 ? "0" + parseInt(num, 10) : num;
        },

        updateDom: function() {
            this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
            this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
            // Si se implementa la barra de progreso:
            // this.fillerHeight = this.fillerHeight + this.fillerIncrement;
            // this.fillerDom.style.height = this.fillerHeight + 'px';
        },

        intervalCallback: function() {
            if (!this.started) return; // Si el temporizador no está iniciado, no hace nada

            if (this.seconds === 0) {
                if (this.minutes === 0) {
                    this.timerComplete();
                    return;
                }
                this.seconds = 59;
                this.minutes--;
            } else {
                this.seconds--;
            }
            this.updateDom();
        },

        timerComplete: function() {
            this.started = false;
            // this.fillerHeight = 0; // Si no se usa, eliminar
            // Opcional: Notificación o sonido de finalización
            alert("¡Tiempo de Pomodoro completado!"); // Ejemplo de notificación
            this.stopTimer(); // Vuelve a los 25 minutos después de completarse
        }
    };

    // Inicializa el objeto pomodoro al cargar la ventana
    window.addEventListener('load', () => {
        pomodoro.init();
    });
})();