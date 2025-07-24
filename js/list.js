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
        const todos = Array.from(elements.todoList.children).map(li => li.textContent);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    };

    // Crear un nuevo elemento de tarea en el DOM
    const createTodoElement = (todoText) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#"; // El href puede ser solo un marcador
        link.textContent = todoText;

        listItem.appendChild(link);
        elements.todoList.appendChild(listItem);

        // Añadir evento para eliminar tarea
        listItem.addEventListener("click", function() {
            listItem.remove(); // Más directo que parentNode.removeChild(this)
            saveTodos(); // Guardar después de eliminar
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

    // Limpiar el estado de error del input al hacer clic
    const clearInputError = () => {
        elements.todoInput.classList.remove("error");
        elements.todoInput.placeholder = "Agrega tu tarea";
    };

    // Event Listeners
    elements.addTodoBtn.addEventListener("click", addTodo);
    elements.todoInput.addEventListener("click", clearInputError);

    // Cargar tareas al cargar la página
    document.addEventListener("DOMContentLoaded", loadTodos);
})();