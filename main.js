document.addEventListener("DOMContentLoaded", function () {
  const todoListContainer = document.getElementById("todo-list");
  const addTodoBtn = document.getElementById("add-todo-btn");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("close")[0];
  const todoText = document.getElementById("todo-text");
  const saveTodoBtn = document.getElementById("save-todo-btn");
  let editIndex = null;

  addTodoBtn.addEventListener("click", () => {
    todoText.value = "";
    editIndex = null;
    openModal();
  });

  closeBtn.addEventListener("click", closeModal);

  saveTodoBtn.addEventListener("click", () => {
    const todoValue = todoText.value.trim();

    if (todoValue !== "") {
      if (editIndex !== null) {
        editTodoItem(editIndex, todoValue);
      } else {
        saveTodoToLocalStorage(todoValue);
      }
      closeModal();
      displayTodos();
    }
  });

  displayTodos();

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    todoText.value = "";
  }

  function saveTodoToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function displayTodos() {
    todoListContainer.innerHTML = "";
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach((todo, index) => {
      const todoItem = document.createElement("div");
      todoItem.className = "todo-item";
      todoItem.innerHTML = `
                <span>${todo}</span>
                <button class="edit-btn" onclick="editTodo(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
            `;
      todoListContainer.appendChild(todoItem);
    });
  }

  window.editTodo = function (index) {
    editIndex = index;
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todoText.value = todos[index];
    openModal();
  };

  function editTodoItem(index, newValue) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos[index] = newValue;
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  window.deleteTodo = function (index) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
  };
});
