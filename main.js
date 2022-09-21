let textOfInput = document.querySelector("input[type='text']");
let addTaskBtn = document.querySelector("button");
let ulOfTasks = document.querySelector("ul");

// On app load, get all tasks from localStorage. and put every task to a list item.
window.onload = function loadTasks() {
  // Get the tasks from localStorage and convert it to an array
  if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    // Loop through the tasks and add them to the list
    tasks.forEach((task) => {
      let listItem = document.createElement("li");

      let checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");

      let oneTask = document.createElement("span");
      oneTask.textContent = task.task;

      let deleteIcon = document.createElement("i");
      deleteIcon.className = "fa-regular fa-trash-can";

      deleteIcon.onclick = function () {
        tasks.forEach((task) => {
          if (task.task === oneTask.textContent) {
            // delete task
            tasks.splice(tasks.indexOf(task), 1);
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        deleteIcon.parentElement.remove();
      };

      listItem.appendChild(checkBox);
      listItem.appendChild(oneTask);
      listItem.appendChild(deleteIcon);

      ulOfTasks.appendChild(listItem);
    });
  }
};

// add items to localStorage
// before adding anything to the local storage, I have to get this localstorage item and add sth to it.
let tasksArr = JSON.parse(localStorage.getItem("tasks")) || new Array();

function addToLocalStorage() {
  // so that if the textOfInput is empty, it wont add it to localStorage.
  if (textOfInput.value.trim() === "") {
    return;
  }

  let obj = {
    task: textOfInput.value,
  };
  tasksArr.push(obj);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// add items to ul.tasks
function addTask() {
  if (textOfInput.value.trim() === "") {
    alert("please write your task");
  } else {
    let listItem = document.createElement("li");

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    let spanTask = document.createElement("span");
    spanTask.textContent = textOfInput.value;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can";

    deleteIcon.onclick = () => deleteIcon.parentElement.remove();

    let checkArr = [];
    checkBox.onclick = () => {
      let checked = "checked";

      checkArr.push(checked);
      localStorage.setItem("check", checkArr);
    };

    listItem.appendChild(checkBox);
    listItem.appendChild(spanTask);
    listItem.appendChild(deleteIcon);

    ulOfTasks.appendChild(listItem);
  }

  textOfInput.value = "";
}

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addToLocalStorage();
  addTask();
});
