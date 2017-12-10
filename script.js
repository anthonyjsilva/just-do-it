// global variables for this file
let TODOS_DATA = [];
let EDIT_MODE = false;
let ACTIVE_INPUT = false;

// determine if localStorage is already storing data
(localStorage['todos'])
  ? loadFromLocalStorage()
  : loadSeedData();

function loadFromLocalStorage() {
  TODOS_DATA = JSON.parse(localStorage['todos']);
}

function loadSeedData() {
  TODOS_DATA.push({name: 'This Week', color: 'red', todos: ['clean room', 'exercise']});
  TODOS_DATA.push({name: 'Today', color: 'orange', todos: ['study']});
}

function addTodo(value, index) {
  // modify data structure for later
  TODOS_DATA[index].todos.push(value);

  // manipulate DOM
  let todo = document.createElement('div');
  todo.textContent = value;
  todo.addEventListener('click', e => removeTodo(index, e.currentTarget));
  LIST_ITEMS[index].appendChild(todo);

  // update local storage
  updateStorage();
}

function checkOffTodo(todo) {
  // TODO: its gonna involve storing todos as another array of todo objects
  // each todo will have name, priority, and checked
}

function removeTodo(listIndex, todo) {
  // modify data structure for later
  let removeIndex = TODOS_DATA[listIndex].todos.findIndex((element) =>
    element === todo.textContent);
  TODOS_DATA[listIndex].todos.splice(removeIndex, 1);

  // manipulate DOM
  todo.remove();

  // update local storage
  updateStorage();
}

function updateStorage() {
  localStorage.setItem('todos', JSON.stringify(TODOS_DATA));
  console.log('TODOS_DATA is now', TODOS_DATA);
}

function addLists() {
  const WRAPPER = document.querySelector('.wrapper');

  TODOS_DATA.forEach(list => {
    let listItems = ``;
    list.todos.forEach(listItem => listItems += `<div>${listItem}</div>`);

    let listTemplate = `
      <div class="list" id="list-1" style="background-color:var(--note-color-${list.color})">
        <div class="list-header">
          <h2>${list.name}</h2>
          <div class="input-container" style="display:${EDIT_MODE ? 'flex' : 'none'}">
            <input class='list-input' type="text" placeholder="todo...">
            <div class="add-btn">+</div>
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

// toggle edit mode
window.addEventListener('keydown', e => {
  if (!ACTIVE_INPUT && e.key === 'e') {
    EDIT_MODE = !EDIT_MODE;
    INPUT_CONTAINERS.forEach(input =>
      input.style.display = EDIT_MODE ? 'flex' : 'none');
  }
});

// clear local storage
window.addEventListener('keydown', e => {
  if (e.key === 'c')
    localStorage.clear();
});

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
  children.forEach((child, childIndex) =>
    child.addEventListener('click', () => removeTodo(listIndex, child)));
});
