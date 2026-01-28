(function() {
    const pomodoro = {
        state: {
            timeLeft: 1500, // Segundos
            duration: 1500,
            isRunning: false,
            mode: 'work',
            startTime: null,
            pausedTimeLeft: 1500
        },
        elements: {
            minutes: document.querySelector('#pomodoro-minutes'),
            seconds: document.querySelector('#pomodoro-seconds'),
            circle: document.querySelector('.progress-ring__circle'),
            container: document.querySelector('#pomodoro-container')
        },
        interval: null,
        radius: 90,
        circumference: 2 * Math.PI * 90,
        audio: new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'),

        init() {
            this.elements.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
            this.loadState();
            this.requestNotificationPermission();
            
            document.querySelector('#pomodoro-work').onclick = () => this.setMode('work', 25);
            document.querySelector('#pomodoro-short-break').onclick = () => this.setMode('short', 5);
            document.querySelector('#pomodoro-long-break').onclick = () => this.setMode('long', 15);
            document.querySelector('#pomodoro-reset').onclick = () => this.reset();

            // Sincronización cuando la pestaña vuelve a primer plano
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && this.state.isRunning) {
                    this.syncTimer();
                }
            });
        },

        requestNotificationPermission() {
            if ("Notification" in window && Notification.permission === "default") {
                Notification.requestPermission();
            }
        },

        setMode(mode, mins) {
            this.stop();
            this.state.mode = mode;
            this.state.duration = mins * 60;
            this.state.timeLeft = this.state.duration;
            this.state.pausedTimeLeft = this.state.duration;
            this.state.startTime = Date.now();
            
            this.updateTheme();
            this.start();
            this.saveState();
        },

        updateTheme() {
            const classes = ['mode-work', 'mode-short', 'mode-long'];
            document.body.classList.remove(...classes);
            document.body.classList.add(`mode-${this.state.mode}`);
        },

        start() {
            if (this.state.isRunning) return;
            this.state.isRunning = true;
            this.state.startTime = Date.now();
            this.state.pausedTimeLeft = this.state.timeLeft;

            // Intervalo de alta frecuencia para suavidad visual
            this.interval = setInterval(() => this.syncTimer(), 200);
        },

        syncTimer() {
            const elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
            this.state.timeLeft = this.state.pausedTimeLeft - elapsed;

            if (this.state.timeLeft <= 0) {
                this.complete();
            } else {
                this.updateDisplay();
                // Guardado preventivo cada ciclo
                if (Math.random() > 0.9) this.saveState(); 
            }
        },

        stop() {
            this.state.isRunning = false;
            clearInterval(this.interval);
            this.saveState();
        },

        reset() {
            this.stop();
            const mins = this.state.mode === 'work' ? 25 : (this.state.mode === 'short' ? 5 : 15);
            this.state.timeLeft = mins * 60;
            this.state.duration = this.state.timeLeft;
            this.state.pausedTimeLeft = this.state.timeLeft;
            this.updateDisplay();
            this.saveState();
        },

        updateDisplay() {
            const m = Math.floor(this.state.timeLeft / 60);
            const s = this.state.timeLeft % 60;
            
            this.elements.minutes.textContent = String(Math.max(0, m)).padStart(2, '0');
            this.elements.seconds.textContent = String(Math.max(0, s)).padStart(2, '0');
            
            const ratio = Math.max(0, this.state.timeLeft) / this.state.duration;
            const offset = this.circumference - ratio * this.circumference;
            this.elements.circle.style.strokeDashoffset = offset;
        },

        saveState() {
            const data = {
                ...this.state,
                lastTimestamp: Date.now()
            };
            localStorage.setItem('pomodoro_v2_state', JSON.stringify(data));
        },

        loadState() {
            const saved = localStorage.getItem('pomodoro_v2_state');
            if (!saved) return;

            const data = JSON.parse(saved);
            const now = Date.now();
            const elapsedSinceLastSave = Math.floor((now - data.lastTimestamp) / 1000);

            this.state = data;
            
            if (this.state.isRunning) {
                // Re-calculamos el tiempo restante basado en el desfase temporal
                const newPausedTimeLeft = data.timeLeft - elapsedSinceLastSave;
                
                if (newPausedTimeLeft <= 0) {
                    this.state.timeLeft = 0;
                    this.state.isRunning = false;
                    localStorage.removeItem('pomodoro_v2_state');
                } else {
                    this.state.pausedTimeLeft = newPausedTimeLeft;
                    this.state.timeLeft = newPausedTimeLeft;
                    this.state.startTime = now;
                    this.start();
                }
            }
            
            this.updateTheme();
            this.updateDisplay();
        },

        complete() {
            this.stop();
            this.state.timeLeft = 0;
            this.updateDisplay();
            this.audio.play().catch(() => {}); // Fallback si el usuario no ha interactuado aún
            this.sendNotification();
            localStorage.removeItem('pomodoro_v2_state');
        },

        sendNotification() {
            const messages = {
                work: "¡Sesión terminada! Es hora de descansar.",
                short: "Descanso corto finalizado. ¿Volvemos?",
                long: "Descanso largo completado. ¡Buen trabajo!"
            };

            if ("Notification" in window && Notification.permission === "granted") {
                new Notification("Pomodoro Master", {
                    body: messages[this.state.mode],
                    icon: "https://cdn-icons-png.flaticon.com/512/2553/2553383.png"
                });
            }
        }
    };

    window.addEventListener('DOMContentLoaded', () => pomodoro.init());
})();