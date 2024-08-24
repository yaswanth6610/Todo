const parentEle = document.getElementById("todos");
const taskval = document.getElementById("task");
const editModal = document.getElementById('editModal');
const deleteModal = document.getElementById('deleteModal');
const alertModal = document.getElementById('alertModal');
const editTextarea = document.getElementById('editTextarea');
const greeting = document.getElementById('greeting');
let currentTaskId = null;
let taskToDeleteId = null;

let count = 1;
let tasks = [];

function init() {
  const storedUser = localStorage.getItem('username');
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (storedUser) {
    const isReturningUser = storedTasks && storedTasks.length > 0;
    greeting.textContent = isReturningUser ? `Welcome back, ${storedUser}!` : `Hey ${storedUser}!`;
  } else {
    const username = prompt("Please enter your name:");
    if (username) {
      localStorage.setItem('username', username);
      greeting.textContent = "Hey " + username + "!";
    }
  }


  if (storedTasks) {
    tasks = storedTasks;
    count = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    render(tasks);
  }
}

function addTask() {
  if (taskval.value === "") {
    showAlertModal();
    return;
  }
  tasks.push({
    id: count,
    text: taskval.value,
    done: false
  });
  taskval.value = "";
  count++;
  saveTasks();
  render(tasks);
}

function showAlertModal() {
  alertModal.style.display = 'block';
  setTimeout(() => {
    alertModal.style.display = 'none';
  }, 3000);
}

function deleteTodo(index) {
  taskToDeleteId = index;
  deleteModal.style.display = 'block';
}

function confirmDelete() {
  tasks = tasks.filter((task) => task.id !== taskToDeleteId);
  saveTasks();
  render(tasks);
  closeDeleteModal();
}

function closeDeleteModal() {
  deleteModal.style.display = 'none';
  taskToDeleteId = null;
}

function editTodo(index) {
  const task = tasks.find(task => task.id === index);
  if (task) {
    editTextarea.value = task.text;
    currentTaskId = task.id;
    editModal.style.display = 'block';
  }
}

function toggleDone(index) {
  tasks = tasks.map((task) =>
    task.id === index ? { ...task, done: !task.done } : task
  );
  saveTasks();
  render(tasks);
}

function createTodoComponent(task) {
  const newTask = document.createElement("div");
  newTask.setAttribute("id", "todo-" + task.id);
  newTask.setAttribute("class", "todo");

  const content = document.createElement("div");
  content.setAttribute("class", "todo-content");

  const heading = document.createElement("h4");
  heading.textContent = task.text;
  if (task.done) {
    heading.style.textDecoration = "line-through";
  }

  const buttons = document.createElement("div");
  buttons.setAttribute("class", "todo-buttons");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTodo(task.id);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = task.done ? "Undo" : "Done";
  doneBtn.onclick = () => toggleDone(task.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTodo(task.id);

  content.appendChild(heading);
  buttons.appendChild(editBtn);
  buttons.appendChild(doneBtn);
  buttons.appendChild(deleteBtn);
  newTask.appendChild(content);
  newTask.appendChild(buttons);
  parentEle.appendChild(newTask);
}

function render(tasks) {
  parentEle.innerHTML = "";
  tasks.forEach((task) => {
    createTodoComponent(task);
  });
}

function closeEditModal() {
  editModal.style.display = 'none';
}

function submitEdit() {
  const newText = editTextarea.value;
  if (newText.trim() === '') {
    alert("Task text cannot be empty.");
    return;
  }
  tasks = tasks.map(task =>
    task.id === currentTaskId ? { ...task, text: newText } : task
  );
  saveTasks();
  render(tasks);
  closeEditModal();
}

function render(tasks) {
  parentEle.innerHTML = "";
  tasks.slice().reverse().forEach((task) => {
    createTodoComponent(task);
  });
}


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

init();
