import { Task } from "../Model/TaskModel.js";

export let getInforTask = () => {
  let id = 1;
  let content = document.getElementById("newTask").value;
  let status = true;

  return new Task(id, content, status);
};

export function mapData(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].id = i + 1;
  }
  return array;
}

export function renderList(taskArray) {
  let contentHTML = "";
  taskArray.forEach(function (item) {
    let contentLi = /* html */ `
    <li>
        <span>${item.content}</span>
        <div class="buttons">
            <button onclick="removeTask(${item.id})">
            <div class="remove">
                <i class="far fa-trash-alt"></i>
            </div>
            </button>
            <button onclick="completeTask(${item.id})">
            <div class="complete">
                <i class="fas fa-check-circle"></i>
                <i class="far fa-check-circle"></i>
            </div>
            </button>
        </div>
    </li>
    `;
    contentHTML += contentLi;
  });
  document.getElementById("todo").innerHTML = contentHTML;
}

export function saveToLocal(listTask, LIST_TASK) {
  let listTaskJSON = JSON.stringify(listTask);
  localStorage.setItem(LIST_TASK, listTaskJSON);
}

export function callFromLocal(listTask, LIST_TASK) {
  let listTaskJSON = localStorage.getItem(LIST_TASK);
  if (listTaskJSON) {
    listTask = JSON.parse(listTaskJSON);
    renderList(listTask);
  }
  return listTask;
}

export function callFromLocalComplete(listTask, LIST_TASK) {
  let listTaskJSON = localStorage.getItem(LIST_TASK);
  if (listTaskJSON) {
    listTask = JSON.parse(listTaskJSON);
    renderListComplete(listTask);
  }
  return listTask;
}

export function findIndexTask(id, listTask) {
  return listTask.findIndex((task) => {
    return task.id == id;
  });
}

export function renderListComplete(taskCompleteArray) {
  let contentHTML = "";
  taskCompleteArray.forEach(function (item) {
    let contentLi = /* html */ `
    <li>
        <span>${item.content}</span>
        <div class="buttons">
        <button onclick="removeTaskComplete(${item.id})">
            <div class="remove">
            <i class="far fa-trash-alt"></i>
            </div>
        </button>
        <button class="">
            <div class="complete">
            <i class="fas fa-check-circle"></i>
            <i class="far fa-check-circle"></i>
            </div>
        </button>
        </div>
    </li>
      `;
    contentHTML += contentLi;
  });
  document.getElementById("completed").innerHTML = contentHTML;
}

export function resetForm() {
  document.getElementById("newTask").value = "";
}
