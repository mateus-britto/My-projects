// Main variables
const listContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const clearCompleteTaskButton = document.querySelector(
  "[data-delete-complete-task-button]"
);

// Local storage key
const LOCAL_STORAGE_PROJECT_KEY = "project.lists";
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = "project.selectedListId";

// Will get the info from local storage and parse it into an object (Lists Object)
// or, if it does not exist, will get an empty array)
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];

// Will get the selected list id
let selectedListId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);

// Event listener to remove the selected project
listContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

// Event listener to check the tasks and render the remaining number
tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

// Evente listener to clear complete tasks
clearCompleteTaskButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

// Event listener to delete the projects
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId); // Return all the lists exept the selected one
  selectedListId = null;
  saveAndRender();
});

// Event listner to create an add a new project to the projects list
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value; // Get the list name from the input
  if (listName === null || listName === "") return;
  const list = createProject(listName); // Using input as an argument to create a new project
  newListInput.value = null; // Will clear the input field
  lists.push(list);
  saveAndRender(); // On submit will save to local storage and render
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName === null || taskName === "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

// Create the project
function createProject(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
  // The tasks array is empty by default
  // The Date object is being used to provide an unique id
  // by taking the exact date of the creation and converting it to a string
}

// Create Tasks
function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false };
}

// Save to local storage and render
function saveAndRender() {
  save();
  render();
}

// Save to local storage
function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedListId);
}

// Function to render the projects list
function render() {
  clearElement(listContainer);
  renderLists();

  const selectedList = lists.find((list) => list.id === selectedListId);

  if (selectedListId === null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = ""; // Will revert the display to what it was
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

// Will render the tasks
function renderTasks(selectedList) {
  //Method to use the HTML inside the template tag, the "content, true"
  // is essential to render all te content isinde the tag.
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTasksCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length; // Will doisplay the number of tasks based on the length of the tasks array
  const taskString = incompleteTasksCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`;
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listContainer.appendChild(listElement);
  });
}

// Function to clear the projects list
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
    // While the element has a first child, remove it.
  }
}

render();
