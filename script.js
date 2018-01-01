// global variables for this file
TODOS_DATA = [];
let EDIT_MODE = false;
let ACTIVE_INPUT = false;

const todoObject = (value, priority = 1) => ({name: value, priority: priority, checked: false});


// determine if localStorage is already storing data
(localStorage['todos_dev'])
  ? loadFromLocalStorage()
  : loadSeedData();

console.log(TODOS_DATA);

function loadFromLocalStorage() {
  TODOS_DATA = JSON.parse(localStorage['todos_dev']);
}

function loadSeedData() {
  TODOS_DATA.push({
    name: 'This Week',
    color: 'red',
    todos: [todoObject('workout'), todoObject('clean')]
  });
  TODOS_DATA.push({
    name: 'Today',
    color: 'orange',
    todos: [todoObject('clean')]
  });
}

const listModel = {
  name: 'name',
  color: 'red',
  todos: [todoObject('clean')],


};


function addTodo(value, index) {
  // modify data structure for later
  TODOS_DATA[index].todos.push(todoObject(value));

  // manipulate DOM
  let todo = document.createElement('div');
  todo.textContent = value;
  todo.addEventListener('click', e => {
    if (EDIT_MODE)
      removeTodo(index, e.currentTarget)
    else
      toggleTodo(index, e.currentTarget)
  });
  LIST_ITEMS[index].appendChild(todo);

  // update local storage
  updateStorage();
}

function toggleTodo(listIndex, todo) {

  // modify data structure for later
  let toggleIndex = TODOS_DATA[listIndex].todos.findIndex((element) => element.name === todo.textContent);
  let target = TODOS_DATA[listIndex].todos[toggleIndex];
  target.checked = !target.checked;

  // manipulate DOM
  todo.classList.toggle('checked');

  // update local storage
  updateStorage();
}

function removeTodo(listIndex, todo) {
  // modify data structure for later
  let removeIndex = TODOS_DATA[listIndex].todos.findIndex((element) => element.name === todo.textContent);
  TODOS_DATA[listIndex].todos.splice(removeIndex, 1);

  // manipulate DOM
  todo.remove();

  // update local storage
  updateStorage();
}

function updateStorage() {
  localStorage.setItem('todos_dev', JSON.stringify(TODOS_DATA));
  console.log('TODOS_DATA is now', TODOS_DATA);
}

function addLists() {
  const WRAPPER = document.querySelector('.wrapper');

  TODOS_DATA.forEach(list => {
    let listItems = ``;
    list.todos.forEach(listItem => listItems +=
      `<div class="${listItem.checked ? 'checked' : ''}">
        ${listItem.name}
        <span>
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt"></i>
        </span>
      </div>`);

    let listTemplate = `
      <div class="list" id="list-1" style="background-color:var(--note-color-${list.color})">
        <div class="list-header">
          <div class="list-options">
            <i class="fas fa-plus"></i>
            <i class="fas fa-sync-alt"></i>
            <i class="fas fa-trash-alt"></i>
          </div>
          <h2>${list.name}</h2>
          <div class="input-container" style="display:${EDIT_MODE
      ? 'flex'
      : 'none'}">
            <input class='list-input' type="text" placeholder="todo...">
            <div class="add-btn"> <i class="fas fa-plus"></i> </div>
          </div>
        </div>
        <div class="list-items">
          ${listItems}
        </div>
      </div>`;

    WRAPPER.innerHTML += listTemplate;
  });

}

addLists();

// variables for event listeners
let INPUT_CONTAINERS = Array.prototype.slice.call(document.querySelectorAll('.input-container'));
let LIST_INPUTS = Array.prototype.slice.call(document.querySelectorAll('.list-input'));
let LIST_ITEMS = Array.prototype.slice.call(document.querySelectorAll('.list-items'));

let ADD_BUTTONS = Array.prototype.slice.call(document.querySelectorAll('.list-options .fa-plus'));

ADD_BUTTONS.forEach((btn, index) => {
  btn.addEventListener('click', e => {
    console.log('clicked');
    EDIT_MODE = !EDIT_MODE;
    INPUT_CONTAINERS.forEach(
      input => input.style.display = EDIT_MODE
      ? 'flex'
      : 'none');
  });
});
console.log(ADD_BUTTONS);

// toggle edit mode
window.addEventListener('keydown', e => {
  if (!ACTIVE_INPUT && e.key === 'e') {
    EDIT_MODE = !EDIT_MODE;
    INPUT_CONTAINERS.forEach(
      input => input.style.display = EDIT_MODE
      ? 'flex'
      : 'none');
  }
});

// clear local storage
window.addEventListener('keydown', e => {
  if (e.key === 'c')
    localStorage.removeItem('todos_dev');
  }
);

// input event listeners
LIST_INPUTS.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      addTodo(input.value, index);
      input.value = '';
    }
  });
  input.addEventListener('focusin', e => ACTIVE_INPUT = true);
  input.addEventListener('focusout', e => ACTIVE_INPUT = false);
});

// todo event listeners
LIST_ITEMS.forEach((list, listIndex) => {
  let children = Array.prototype.slice.call(list.children);
  children.forEach((child, childIndex) => child.addEventListener('click', () => {
    if (EDIT_MODE)
      removeTodo(listIndex, child)
    else
      toggleTodo(listIndex, child)
  }));
});
