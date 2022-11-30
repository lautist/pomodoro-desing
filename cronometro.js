

let centesimas = 0;
let segundosr = 0;
let minutosr = 0;
let horas = 0;

document.getElementById("inicio").style.border = "1px solid #A5C9CA"

function inicio(inicio){
    control = setInterval(cronometro,11);
    document.getElementById("inicio").disabled = true;
	document.getElementById("parar").disabled = false;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = false;

	document.getElementById("continuar").style.border = "none"
	document.getElementById("inicio").style.border = "none"
	document.getElementById("parar").style.border = "1px solid #A5C9CA"
	document.getElementById("reinicio").style.border = "1px solid #A5C9CA"
}

function parar () {
	clearInterval(control);
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = false;

	document.getElementById("continuar").style.border = "1px solid #A5C9CA"
	document.getElementById("parar").style.border = "none"
}

function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundosr = 0;
	minutosr = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
	document.getElementById("inicio").disabled = false;
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = true;

	document.getElementById("parar").style.border = "none"
	document.getElementById("reinicio").style.border = "none"
	document.getElementById("continuar").style.border = "none"
	document.getElementById("inicio").style.border = "1px solid #A5C9CA"
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 90) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundosr ++;
		if (segundosr < 10) { segundosr = "0"+segundosr }
		Segundos.innerHTML = ":"+segundosr;
	}
	if (segundosr == 59) {
		segundosr = -1;
	}
	if ( (centesimas == 0)&&(segundosr == 0) ) {
		minutosr++;
		if (minutosr < 10) { minutosr = "0"+minutosr }
		Minutos.innerHTML = ":"+minutosr;
	}
	if (minutosr == 59) {
		minutosr = -1;
	}
	if ( (centesimas == 0)&&(segundosr == 0)&&(minutosr == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}

	
}

