let centesimasActuales = 0;
let segundosRestantes = 0;
let minutosRestantes = 0;
let horas = 0;
const MAX_CENTESIMAS = 99;
const MAX_SEGUNDOS = 59;
const MAX_MINUTOS = 59;

document.getElementById("inicio").style.border = "1px solid #A5C9CA";

function inicio() {
	control = setInterval(cronometro, 11);
	document.getElementById("inicio").disabled = true;
	document.getElementById("parar").disabled = false;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = false;

	document.getElementById("continuar").style.border = "none";
	document.getElementById("inicio").style.border = "none";
	document.getElementById("parar").style.border = "1px solid #A5C9CA";
	document.getElementById("reinicio").style.border = "1px solid #A5C9CA";
}

function parar() {
	clearInterval(control);
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = false;

	document.getElementById("continuar").style.border = "1px solid #A5C9CA";
	document.getElementById("parar").style.border = "none";
}

function reinicio() {
	clearInterval(control);
	centesimasActuales = 0;
	segundosRestantes = 0;
	minutosRestantes = 0;
	horas = 0;
	actualizarElementosDOM();
	document.getElementById("inicio").disabled = false;
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = true;

	document.getElementById("parar").style.border = "none";
	document.getElementById("reinicio").style.border = "none";
	document.getElementById("continuar").style.border = "none";
	document.getElementById("inicio").style.border = "1px solid #A5C9CA";
}

function cronometro() {
	centesimasActuales++;
	if (centesimasActuales < 10) {
		centesimasActuales = "0" + centesimasActuales;
	}
	if (centesimasActuales === MAX_CENTESIMAS) {
		centesimasActuales = 0;
		segundosRestantes++;
		if (segundosRestantes < 10) {
			segundosRestantes = "0" + segundosRestantes;
		}
	}
	if (segundosRestantes === MAX_SEGUNDOS) {
		segundosRestantes = 0;
		minutosRestantes++;
		if (minutosRestantes < 10) {
			minutosRestantes = "0" + minutosRestantes;
		}
	}
	if (minutosRestantes === MAX_MINUTOS) {
		minutosRestantes = 0;
		horas++;
		if (horas < 10) {
			horas = "0" + horas;
		}
	}
	actualizarElementosDOM();
}

function actualizarElementosDOM() {
	document.getElementById("Centesimas").innerHTML = ":" + centesimasActuales;
	document.getElementById("Segundos").innerHTML = ":" + segundosRestantes;
	document.getElementById("Minutos").innerHTML = ":" + minutosRestantes;
	document.getElementById("Horas").innerHTML = horas;
}
