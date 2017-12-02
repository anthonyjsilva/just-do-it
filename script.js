// TODO: figure out how to use local storage
const wrapper = document.querySelector('.wrapper');
console.log(wrapper);

if (localStorage['todos']) {
  wrapper.innerHTML = localStorage.getItem('todos');
}


const inputs = Array.prototype.slice.call(document.querySelectorAll('.list-input'));
const listItems = Array.prototype.slice.call(document.querySelectorAll('.list-items'));
console.log(inputs);
console.log(listItems);

let EDIT_MODE = false;

// TODO: transition to using data structures instead of so much dom manipulation
const todos = {};
todos.thisWeek = [];
todos.today = [];

todos.thisWeek.push('clean room');
todos.today.push('exercise');
todos.today.push('study');
//

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

inputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value) {
      let todo = document.createElement('div');
      let text = document.createTextNode(input.value);
      input.value = '';
      todo.appendChild(text);
      todo.addEventListener('click', e => e.currentTarget.remove());
      listItems[index].appendChild(todo);
      localStorage.setItem('todos', wrapper.innerHTML);
    }
  });
});
