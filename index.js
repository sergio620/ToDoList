const input = document.querySelector(".header>div");
const btnAdd = document.getElementsByTagName("button")[0];
const ul = document.getElementsByTagName("ul")[0];
let tasks = [];
let count = 0;
let newTask;
btnAdd.addEventListener("click", (event) => {
  if (input.textContent.length == 0) {
    alert("Inserte una tarea");
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = input.textContent;
    ul.appendChild(li);
    li.appendChild(createCheckBox());
    li.appendChild(p);
    li.appendChild(createBtnMod());
    li.appendChild(createBtnDel());
    li.setAttribute("key", count);
    saveTask(li);
    event.target.parentNode.childNodes[1].textContent = "";
  }
});

function createBtnMod() {
  const btnMod = document.createElement("button");
  btnMod.textContent = "Editar";
  btnMod.classList.add("btn");
  btnMod.classList.add("btn-primary");
  btnMod.addEventListener("click", (e) => {
    const idClicked = e.target.parentNode.getAttribute("key");
    if (e.target.textContent == "Editar") {
      const value = e.target.parentNode.childNodes[1].textContent;
      e.target.textContent = "Aceptar";
      e.target.parentNode.childNodes[1].replaceWith(
        document.createElement("div")
      );
      e.target.parentNode.childNodes[1].setAttribute("contenteditable", "true");
      e.target.parentNode.childNodes[1].setAttribute(
        "placeholder",
        "Agregar una tarea"
      );
      e.target.parentNode.childNodes[1].textContent = value;
      updateTasks(value, idClicked);
    } else if ((e.target.textContent = "Aceptar")) {
      const value = e.target.parentNode.childNodes[1].textContent;
      e.target.textContent = "Editar";
      e.target.parentNode.childNodes[1].replaceWith(
        document.createElement("p")
      );
      e.target.parentNode.childNodes[1].textContent = value;
      updateTasks(value, idClicked);
    }
  });

  return btnMod;
}

function saveTask(li) {
  newTask = {
    key: count,
    content: li.childNodes[1].textContent,
    completed: false,
  };

  tasks.push(newTask);
  count++;
}

function createBtnDel() {
  const btnDel = document.createElement("button");
  btnDel.setAttribute("type", "button");
  btnDel.setAttribute("class", "btn btn-danger");
  btnDel.innerHTML = `<i class="gg-trash"></i>`;
  btnDel.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      const idClicked = e.target.parentNode.getAttribute("key");
      tasks = tasks.filter((task) => {
        return task.key != parseInt(idClicked);
      });
      ul.removeChild(e.target.parentNode);
    } else if (e.target.tagName == "I") {
      const idClicked = e.target.parentNode.parentNode.getAttribute("key");
      tasks = tasks.filter((task) => {
        return task.key != parseInt(idClicked);
      });
      ul.removeChild(e.target.parentNode.parentNode);
    }
  });

  return btnDel;
}

function updateTasks(value, idClicked) {
  const index = tasks.findIndex((task) => task.key == idClicked);
  tasks[index].content = value;
}

function createCheckBox() {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("myCheck");
  checkBox.addEventListener("change", (e) => {
    const idClicked = e.target.parentNode.getAttribute("key");
    const index = tasks.findIndex((task) => task.key == idClicked);
    tasks[index].completed = e.target.checked;
  });

  return checkBox;
}
