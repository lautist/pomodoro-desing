(function() {
    const elements = {
        todoList: document.getElementById("todo-list"),
        todoInput: document.getElementById("todo-input"),
        addTodoBtn: document.getElementById("add-todo-btn")
    };

    const STORAGE_KEY = "todoListItems"; // Clave para localStorage

    // Cargar tareas al iniciar
    const loadTodos = () => {
        const storedTodos = localStorage.getItem(STORAGE_KEY);
        if (storedTodos) {
            const todos = JSON.parse(storedTodos);
            todos.forEach(todoText => createTodoElement(todoText));
        }
    };

// Guardar tareas en localStorage
    const saveTodos = () => {
        const todos = Array.from(elements.todoList.querySelectorAll("span")).map(span => span.textContent);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    };

    // Crear un nuevo elemento de tarea en el DOM
    const createTodoElement = (todoText) => {
        const listItem = document.createElement("li");
        
        const span = document.createElement("span");
        span.textContent = todoText;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.setAttribute("aria-label", "Eliminar tarea");

        listItem.appendChild(span);
        listItem.appendChild(deleteBtn);
        elements.todoList.appendChild(listItem);

        // Evento para eliminar tarea específico del botón
        deleteBtn.addEventListener("click", function() {
            listItem.remove();
            saveTodos();
        });
    };

    // Añadir nueva tarea
    const addTodo = (event) => {
        event.preventDefault(); // Evita el envío del formulario si está dentro de uno
        const todoText = elements.todoInput.value.trim(); // .trim() para quitar espacios en blanco al inicio/final

        if (todoText === "") {
            elements.todoInput.classList.add("error");
            elements.todoInput.placeholder = "¡Por favor, agrega una tarea válida!";
            return;
        }

        elements.todoInput.classList.remove("error");
        elements.todoInput.placeholder = "Agrega tu tarea";
        
        createTodoElement(todoText);
        elements.todoInput.value = ""; // Limpiar input
        saveTodos(); // Guardar la nueva tarea
    };

    // Event Listeners
    elements.addTodoBtn.addEventListener("click", addTodo);
    elements.todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo(e);
    });

    // Cargar tareas al cargar la página
    document.addEventListener("DOMContentLoaded", loadTodos);
})();