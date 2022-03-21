//-Model: Pure data in memory
//-Render: function draw model in the DOM.


//Model

class TodoItem {
  constructor(what, done =false) {
    this.what = what;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }
}

let todoList = [];

//View

const formElement = document.querySelector("form");
const taskListElement = document.getElementById("task-list");

//draw model in the Dom

const renderListItem = (index,todoItem) => {
  const li = document.createElement("li");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = todoItem.done;

  const span = document.createElement("span");
  span.textContent = todoItem.what;

  const div = document.createElement ("div");
  div.textContent = "x";
  div.classList.add("delete");
  div.addEventListener("click", onItemDelete);

  li.append(checkBox, span, div);
  li.setAttribute("x-data-index" , index);
  if (todoItem.done) {
    li.classList.add("checked");
  }

  li.addEventListener("click", onItemClick);
  return li ;

};

const render = () => {
  taskListElement.textContent = ""; //delete outside tasklistelement
  for (let i = 0; i < todoList.length; i++) {
    taskListElement.appendChild(renderListItem(i, todoList[i]));
  }
};

function onItemClick(event) {
  //for acces cleked element: 1)this(if the function), 2)event.target
  const li = this;
  const index = Number(li.getAttribute("x-data-index"));

  //1)MOdify the model
  todoList[index].toggle();
  // 2) draw the model
  render();
}

function onItemDelete(event) {
  const div = event.target;
  const li = div.parentElement;
  const index = Number(li.getAttribute("x-data-index"));
  //Modify model
  todoList.splice(index, 1);
  //draw the model
  render();
  //consum de click
  event.stopPropagation();
}

const addTask = () => {
  const input = formElement.querySelector("input");
  if (input.value !== "") {
    //modyfy model
    todoList.push(new TodoItem(input.value));
    input.value = ""; //form reset()
    //draw the model
    render ();
  }
};

formElement.addEventListener("submit" , (event) => {
  event.preventDefault();
  addTask;
});

document.getElementById("delete-all").addEventListener("click" , () => {
  todoList =[];
  render();
});

document.getElementById("delete-checked").addEventListener("click" , () => {
  todoList = todoList.filter((item) => !item.done);
  render();
});

render();