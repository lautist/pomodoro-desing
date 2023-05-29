document.addEventListener("DOMContentLoaded", () => {
	const $tiempoRestante = document.querySelector("#tiempoRestante");
	const $btnIniciar = document.querySelector("#btnIniciar");
	const $btnPausar = document.querySelector("#btnPausar");
	const $btnDetener = document.querySelector("#btnDetener");
	const $minutos = document.querySelector("#mintemp");
	const $segundos = document.querySelector("#segtemp");
	const $contenedorInputs = document.querySelector("#contenedorInputs");
	let idInterval = null;
	let diferenciaTemporal = 0;
	let fechaFuturo = null;

	const ocultarElemento = (elemento) => {
		elemento.style.display = "none";
	};

	const mostrarElemento = (elemento) => {
		elemento.style.display = "";
	};

	const toggleElemento = (elemento, mostrar) => {
		elemento.style.display = mostrar ? "" : "none";
	};

	const iniciarTemporizador = (minutos, segundos) => {
		ocultarElemento($contenedorInputs);
		toggleElemento($btnPausar, true);
		ocultarElemento($btnIniciar);
		ocultarElemento($btnDetener);

		if (fechaFuturo) {
			fechaFuturo = new Date(new Date().getTime() + diferenciaTemporal);
			diferenciaTemporal = 0;
		} else {
			const milisegundos = (segundos + minutos * 60) * 1000;
			fechaFuturo = new Date(new Date().getTime() + milisegundos);
		}

		clearInterval(idInterval);
		idInterval = setInterval(() => {
			const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();

			if (tiempoRestante <= 0) {
				clearInterval(idInterval);
				toggleElemento($btnPausar, false);
				mostrarElemento($btnDetener);
			} else {
				$tiempoRestante.textContent = milisegundosAMinutosYSegundos(tiempoRestante);
			}
		}, 50);
	};

	const pausarTemporizador = () => {
		toggleElemento($btnPausar, false);
		mostrarElemento($btnIniciar);
		mostrarElemento($btnDetener);
		diferenciaTemporal = fechaFuturo.getTime() - new Date().getTime();
		clearInterval(idInterval);
	};

	const detenerTemporizador = () => {
		clearInterval(idInterval);
		fechaFuturo = null;
		diferenciaTemporal = 0;
		$tiempoRestante.textContent = "00:00.0";
		init();
	};

	const agregarCeroSiEsNecesario = (valor) => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	};

	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		const segundos = milisegundos / 1000;
		return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(
			segundos.toFixed(1)
		)}`;
	};

	const init = () => {
		$minutos.value = "";
		$segundos.value = "";
		mostrarElemento($contenedorInputs);
		mostrarElemento($btnIniciar);
		ocultarElemento($btnPausar);
		ocultarElemento($btnDetener);
	};

	const iniciarClickHandler = () => {
		const minutos = parseInt($minutos.value);
		const segundos = parseInt($segundos.value);

		if (isNaN(minutos) || isNaN(segundos) || (segundos <= 0 && minutos <= 0)) {
			return;
		}

		iniciarTemporizador(minutos, segundos);
	};

	$btnIniciar.addEventListener("click", iniciarClickHandler);
	init();
	$btnPausar.addEventListener("click", pausarTemporizador);
	$btnDetener.addEventListener("click", detenerTemporizador);
});
