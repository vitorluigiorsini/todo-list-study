import "./style.css";

let todoItems = [
  { text: "Estudar Jornada front-end", checked: true, id: 1 },
  { text: "Finalizar caixa de ferramentas Staart", checked: false, id: 2 },
];

function findTodoById(id) {
  return todoItems.find((todo) => todo.id === id);
}

function addTodo(text) {
  const todo = { text, checked: false, id: Date.now() };
  todoItems.push(todo);
  renderTodoList();
}

function removeTodo(id) {
  const todo = findTodoById(id);
  const index = todoItems.indexOf(todo);
  todoItems.splice(index, 1);
  renderTodoList();
}

function toggleDone(id) {
  const todo = findTodoById(id);
  todo.checked = !todo.checked;
  renderTodoList();
}

function clearAllCompleted() {
  todoItems = todoItems.filter((todo) => !todo.checked);
  renderTodoList();
}

function filterTodos(filter) {
  const items = todoItems.filter((todo) => {
    switch (filter) {
      case "all":
        return true;
      case "completed":
        return todo.checked;
      case "active":
        return !todo.checked;
    }
  });
  renderTodoList(items);
}

function countTodos(filter) {
  const items = todoItems.filter((todo) => {
    switch (filter) {
      case "all":
        return true;
      case "completed":
        return todo.checked;
    }
  });
  return items.length;
}

function showCountTodos() {
  const allTodos = countTodos("all");
  const concludedTodos = countTodos("completed");
  const showCountLocation = document.querySelector(".completed-count");
  const countTodosText = `${concludedTodos}/${allTodos}`;
  showCountLocation.innerHTML = countTodosText;
}

function renderTodoList(items = todoItems) {
  const todoList = document.querySelector(".todos");
  todoList.innerHTML = "";
  items.forEach((todo) => {
    todoList.appendChild(renderTodoItem(todo));
  });
  showCountTodos();
}

function renderTodoItem(todo) {
  const isChecked = todo.checked;
  const node = document.createElement("li");
  node.setAttribute("data-key", todo.id);

  const todoTemplate = `
    <li class="todo cursor-move p-2 flex justify-between items-center my-2">
      <div class="flex flex-row items-center">
        <div class="w-10 h-10 flex items-center justify-center relative">
          ${
            isChecked
              ? `<i class="fas fa-check text-green-400 text-2xl toggle-task"></i>`
              : `<i class="fas fa-circle text-gray-200 text-2xl hover:text-green-500 toggle-task" ></i>`
          }
        </div>
        <p class="text-gray-400 ml-4 ${isChecked ? "line-through" : ""}">${
    todo.text
  }</p>
      </div>
      <button
        class="bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full hover:text-red-500"
      >
        <i class="remove-task fas fa-times text-2xl"></i>
      </button>
    </li>
  `;

  node.innerHTML = todoTemplate;
  return node;
}

function handleFormSubmit(event) {
  event.preventDefault(); // para que o formulário não atualize a pagina

  const input = document.querySelector("#todo-input"); // recuperar o input do formulário
  const text = input.value.trim(); // recuperar o texto do input
  // verificar se o texto é valido

  if (text) {
    addTodo(text); // adicionar a tarefa
    input.value = ""; // limpamos o input
    input.focus(); // focamos no input
  }
}

function handleTodoClick(event) {
  const classList = event.target.classList; // recuperar a lista de classes do elemento clicado
  console.log(classList);

  if (classList.contains("remove-task")) {
    const id =
      event.target.parentElement.parentElement.parentElement.getAttribute(
        "data-key"
      ); // recuperar o id da tarefa

    removeTodo(parseInt(id));
  }
  if (classList.contains("toggle-task")) {
    const id =
      event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-key"
      ); // recuperar o id da tarefa

    toggleDone(parseInt(id));
  }
}

window.onload = () => {
  const form = document.querySelector("#todo-form"); // recuperar o formulário
  const items = document.querySelector(".todos");

  const filterAll = document.querySelector(".filter-all");
  const filterActive = document.querySelector(".filter-active");
  const clearCompleted = document.querySelector(".clear-completed");
  const filterCompleted = document.querySelector(".filter-completed");

  filterAll.addEventListener("click", () => filterTodos("all"));
  filterActive.addEventListener("click", () => filterTodos("active"));
  clearCompleted.addEventListener("click", () => clearAllCompleted());
  filterCompleted.addEventListener("click", () => filterTodos("completed"));
  items.addEventListener("click", handleTodoClick);

  form.addEventListener("submit", handleFormSubmit);

  renderTodoList();
};
