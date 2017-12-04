let LISTS = [];

if (localStorage['todos']) {
  LISTS = JSON.parse(localStorage['todos']);
} else {
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
  LISTS.push({
    name: 'Workout Schedule',
    color: 'red',
    todos: ['push', 'pull', 'legs']
  });
}

const WRAPPER = document.querySelector('.wrapper');
let EDIT_MODE = false;

render();

function render() {
  WRAPPER.innerHTML = '';

  LISTS.forEach(list => {
    let listItems = ``;
    list.todos.forEach((li, index) => {
      listItems += `<div>${li}</div>`;
    });

    let template = `
      <div class="list" style="background-color:var(--note-color-${list.color})">
        <div class="list-header">
          <h2>${list.name}</h2>
          <div class="input-container" display="${((EDIT_MODE) ? 'flex' : 'none')}">
            <input class='list-input' type="text" placeholder="todo..." autofocus>
            <div class="add-btn">+</div>
          </div>
        </div>
        <div class="list-items">
          ${listItems}
        </div>
      </div>`;

    WRAPPER.innerHTML += template;
  });

  localStorage.setItem('todos', JSON.stringify(LISTS));

  let INPUTS = Array.prototype.slice.call(document.querySelectorAll('.list-input'));
  let LIST_ITEMS = Array.prototype.slice.call(document.querySelectorAll('.list-items div'));


  INPUTS.forEach((input, index) => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        LISTS[index].todos.push(input.value);
        console.log(LIST_ITEMS);
        render();
        // let todo = document.createElement('div');
        // todo.textContent = input.value;
        // input.value = '';
        // LIST_ITEMS[index].addEventListener('click', e => e.currentTarget.remove());
        // LIST_ITEMS[index].appendChild(todo);

      }
    });
  });

  // LIST_ITEMS.forEach((input, index) => {
  //   input.addEventListener('click', e => e.currentTarget.remove());
  //   LISTS[index].todos.splice(index, 1);
  //
  // });

};

window.addEventListener('keydown', e => {
  if (e.key === 'e') {
    EDIT_MODE = !EDIT_MODE;
    let inputs = Array.prototype.slice.call(document.querySelectorAll('.input-container'));
    console.log(inputs);
    inputs.forEach(input => {
      input.style.display = EDIT_MODE ? 'flex' : 'none';
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
