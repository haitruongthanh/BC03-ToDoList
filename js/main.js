import {
  callFromLocal,
  callFromLocalComplete,
  findIndexTask,
  getInforTask,
  mapData,
  renderList,
  renderListComplete,
  resetForm,
  saveToLocal,
} from "./Controller/taskController.js";

let listTask = [];
let listTaskComplete = [];
let LIST_TASK = "LIST_TASK";
let LIST_TASK_COMPLETE = "LIST_TASK_COMPLETE";

listTask = callFromLocal(listTask, LIST_TASK);

listTaskComplete = callFromLocalComplete(listTaskComplete, LIST_TASK_COMPLETE);

let addNewTask = () => {
  let newTask = getInforTask();
  listTask.push(newTask);
  listTask = mapData(listTask);
  console.log(listTask);
  renderList(listTask);
  saveToLocal(listTask, LIST_TASK);
  resetForm();
};

let removeTask = (id) => {
  let index = findIndexTask(id, listTask);
  listTask.splice(index, 1);
  renderList(listTask);
  saveToLocal(listTask, LIST_TASK);
};

let completeTask = (id) => {
  let index = findIndexTask(id, listTask);
  listTaskComplete.push(listTask[index]);
  listTask.splice(index, 1);
  renderList(listTask);
  saveToLocal(listTask, LIST_TASK);
  renderListComplete(listTaskComplete);
  saveToLocal(listTaskComplete, LIST_TASK_COMPLETE);
};

let removeTaskComplete = (id) => {
  let index = findIndexTask(id, listTaskComplete);
  listTaskComplete.splice(index, 1);
  renderListComplete(listTaskComplete);
  saveToLocal(listTaskComplete, LIST_TASK_COMPLETE);
};

document.getElementById("two").addEventListener("click", function () {
  let listTaskSorted = listTask.sort((task1, task2) => {
    let contentTask1 = task1.content.toLowerCase();
    let contentTask2 = task2.content.toLowerCase();

    if (contentTask1 > contentTask2) {
      return 1;
    }
    if (contentTask1 < contentTask2) {
      return -1;
    }
    return 1;
  });
  renderList(listTaskSorted);
});

window.addNewTask = addNewTask;
window.removeTask = removeTask;
window.completeTask = completeTask;
window.removeTaskComplete = removeTaskComplete;
