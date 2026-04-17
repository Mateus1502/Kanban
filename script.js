
let draggedTask = null;
const materia = localStorage.getItem("materia") || "Geral";



//Funcao responsvael por localstorage com chave dinamica
function getKey() {
  return "kanban_" + materia;
}


///Salvar em localstorage
function saveData() {
  const data = {
    todo: document.getElementById("afazer").innerHTML,
    doing: document.getElementById("fazendo").innerHTML,
    done: document.getElementById("feito").innerHTML
  };
  localStorage.setItem(getKey(), JSON.stringify(data));
}

//Load dos 
function loadData() {
  const data = JSON.parse(localStorage.getItem(getKey()));
  if (data) {
    document.getElementById("afazer").innerHTML = data.todo;
    document.getElementById("fazendo").innerHTML = data.doing;
    document.getElementById("feito").innerHTML = data.done;
    addDragEvents();
  }
}

function addTask(column) {
  const text = prompt("Digite a tarefa:");
  if (!text) return;

  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerText = text;

  addEvents(task);

  document.getElementById(column).appendChild(task);
  saveData();
}

function addEvents(task) {
  task.addEventListener("dragstart", () => {
    draggedTask = task;
  });
}

function addDragEvents() {
  document.querySelectorAll(".task").forEach(task => {
    addEvents(task);
  });
}

document.querySelectorAll(".tasks").forEach(column => {
  column.addEventListener("dragover", e => e.preventDefault());

  column.addEventListener("drop", () => {
    column.appendChild(draggedTask);
    saveData();
  });
});

loadData();
