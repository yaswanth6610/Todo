const parentEle = document.getElementById("todos");
const taskval = document.getElementById("task");

let count = 1;
let tasks = [];

function addTask() {
  if (taskval.value === "") {
    alert("please enter your task");
    return;
  }
  tasks.push({
    id: count,
    text: taskval.value,
  });
  taskval.value = "";
  count++;
  render(tasks);
}

function deleteTodo(index) {
  tasks = tasks.filter((task) => task.id !== index);
  render(tasks);
}

// creating a component

function createTodoComponent(task) {
  // create a new dev with id
  const newTask = document.createElement("div");
  newTask.setAttribute("id", "todo-" + task.id);
  newTask.setAttribute("class", "todo");
  // create a new h3 ele for value
  const heading = document.createElement("h4");
  heading.textContent = task.id + "." + task.text;
  // ccreate a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.setAttribute("onclick", "deleteTodo(" + task.id + ")");
  //append h2 and delete to div
  newTask.appendChild(heading);
  newTask.appendChild(deleteBtn);
  //append new div to todostask
  parentEle.appendChild(newTask);
}

//My react library..

function render(tasks) {
  parentEle.innerHTML = "";
  tasks.forEach((Element) => {
    createTodoComponent(Element);
  });
}
