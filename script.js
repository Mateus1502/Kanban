let draggedTask = null;
const materia = localStorage.getItem("materia") || "Geral";



//Funcao responsvael por localstorage com chave dinamica
//A chave serve
function getKey() {
  return "kanban_" + materia;
}


//Funcao pra salvar dado no local storage(pls work)
function saveData() {
  const data = {
    todo: document.getElementById("todo").innerHTML,
    doing: document.getElementById("doing").innerHTML,
    done: document.getElementById("done").innerHTML
  };
  localStorage.setItem(getKey(), JSON.stringify(data));
}


//Agora carrega
function loadData() {
  const data = JSON.parse(localStorage.getItem(getKey()));
  if (data) {
    document.getElementById("todo").innerHTML = data.todo;
    document.getElementById("doing").innerHTML = data.doing;
    document.getElementById("done").innerHTML = data.done;
    addDragEvents();
  }
}


//Adiciona tarefa
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


//Adicionar tarefas com um drag and drop
function addEvents(task) {
  task.addEventListener("dragstart", () => {
    draggedTask = task;
  });
}

//Adicionando com o drag
function addDragEvents() {
  document.querySelectorAll(".task").forEach(task => {
    addEvents(task);
  });
}


//Dragover
document.querySelectorAll(".tasks").forEach(column => {
  column.addEventListener("dragover", e => e.preventDefault());

  column.addEventListener("drop", () => {
    column.appendChild(draggedTask);
    saveData();
  });
});

loadData();