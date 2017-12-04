let LISTS = [];

if (localStorage['todos']) {
  LISTS = JSON.parse(localStorage['todos']);
} else {

  console.log(LISTS);
  // array of list objects
  LISTS.push({name: 'This Week', color: 'red', todos: ['clean room']});
  LISTS.push({
    name: 'Today',
    color: 'orange',
    todos: ['study', 'exercise']
  });
  LISTS.push({
    name: 'Workout Schedule',
    color: 'blue',
    todos: ['push', 'pull', 'legs']
  });
}

const WRAPPER = document.querySelector('.wrapper');
let INPUTS = Array.prototype.slice.call(document.querySelectorAll('.list-input'));
let LIST_ITEMS = Array.prototype.slice.call(document.querySelectorAll('.list-items'));
render();


let EDIT_MODE = false;

function render() {
  WRAPPER.innerHTML = '';
  LISTS.forEach(list => {

    let listItems = ``;

    list.todos.forEach((li, index) => {
      listItems += `
        <div>${li}</div>
      `;
    });

    let template = `
      <div class="list" style="background-color:var(--note-color-${list.color})">
        <div class="list-header">
          <h2>${list.name}</h2>
          <div class="input-container">
            <input class='list-input' type="text" placeholder="todo...">
            <div class="add-btn">+</div>
          </div>
        </div>
        <div class="list-items">
          ${listItems}
        </div>
      </div>
    `;
    WRAPPER.innerHTML += template;

  });
  console.log(LISTS);
  localStorage.setItem('todos', JSON.stringify(LISTS));
  console.log(localStorage);
  INPUTS = Array.prototype.slice.call(document.querySelectorAll('.list-input'));

  LIST_ITEMS = Array.prototype.slice.call(document.querySelectorAll('.list-items'));

};

window.addEventListener('keydown', e => {
  if (e.key === 'e') {
    EDIT_MODE = !EDIT_MODE;
    let inputs = Array.prototype.slice.call(document.querySelectorAll('.input-container'));
    console.log(inputs);
    inputs.forEach(input => {
      input.style.display = EDIT_MODE
        ? 'flex'
        : 'none';
    });

    console.log('toggle edit mode');
  }
});
window.addEventListener('keydown', e => {
  if (e.key === 'c') {
    localStorage.clear();
    console.log('cleared storage');
  }
});

INPUTS.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' ) {
      LISTS[index].todos.push(input.value);
      // input.value = '';
      render();
      // let todo = document.createElement('div');
      // todo.textContent = input.value;
      // input.value = '';
      // todo.addEventListener('click', e => e.currentTarget.remove());
      // LIST_ITEMS[index].appendChild(todo);

    }
  });
});
