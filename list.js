(function() {
	// CREACION DE LAS VARIABLES, SELECIONANDO DEL HTML
	let lista = document.getElementById("lista"),
		tareaInput = document.getElementById("tareaInput"),
		btnNuevaTarea = document.getElementById("btn-agregar");

	// Funciones
	let agregarTarea = function() {
		let tarea = tareaInput.value,
			nuevaTarea = document.createElement("li"),
			enlace = document.createElement("a"),
			contenido = document.createTextNode(tarea);

		if (tarea === "") {
			tareaInput.setAttribute("placeholder", "Agrega una tarea válida");
			tareaInput.className = "error";
			return false;
		}

		enlace.appendChild(contenido);
		enlace.setAttribute("href", "#");
		nuevaTarea.appendChild(enlace);
		lista.appendChild(nuevaTarea);

		tareaInput.value = "";

		for (let i = 0; i <= lista.children.length - 1; i++) {
			lista.children[i].addEventListener("click", function() {
				this.parentNode.removeChild(this);
				guardarLista();
			});
		}

		guardarLista();
	};

	let comprobarInput = function() {
		tareaInput.className = "";
		tareaInput.setAttribute("placeholder", "Agrega tu tarea");
	};

	let eliminarTarea = function() {
		this.parentNode.removeChild(this);
		guardarLista();
	};

	let guardarLista = function() {
		let tareas = [];
		for (let i = 0; i < lista.children.length; i++) {
			let tarea = lista.children[i].innerText;
			tareas.push(tarea);
		}
		localStorage.setItem("listaTareas", JSON.stringify(tareas));
	};

	let cargarLista = function() {
		let tareas = localStorage.getItem("listaTareas");
		if (tareas) {
			tareas = JSON.parse(tareas);
			for (let i = 0; i < tareas.length; i++) {
				let nuevaTarea = document.createElement("li");
				let enlace = document.createElement("a");
				let contenido = document.createTextNode(tareas[i]);

				enlace.appendChild(contenido);
				enlace.setAttribute("href", "#");
				nuevaTarea.appendChild(enlace);
				lista.appendChild(nuevaTarea);

				nuevaTarea.addEventListener("click", eliminarTarea);
			}
		}
	};

	// Eventos

	btnNuevaTarea.addEventListener("click", agregarTarea);

	tareaInput.addEventListener("click", comprobarInput);

	cargarLista();
})();
