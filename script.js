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


// TODO: transition to using data structures instead of so much dom manipulation
const todos = {};
todos.thisWeek = [];
todos.today = [];

todos.thisWeek.push('clean room');
todos.today.push('exercise');
todos.today.push('study');
//

window.addEventListener('keydown', e => {
  if (e.key === 'c')
    localStorage.clear();
    console.log('cleared storage');
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
