const inputs = Array.prototype.slice.call(document.querySelectorAll('.list-input'));
const listItems = Array.prototype.slice.call(document.querySelectorAll('.list-items'));
console.log(inputs);
console.log(listItems);

inputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      let li = document.createElement('li');
      let text = document.createTextNode(input.value);
      input.value = '';
      li.appendChild(text);
      listItems[index].appendChild(li);
    }
  });
});
