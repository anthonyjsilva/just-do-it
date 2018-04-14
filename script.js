/*
  setup
*/
const initialState = JSON.parse(localStorage.getItem('items')) || [
  {
    title: 'This Week',
    color: 'red',
    items: [ { done: false, text: 'Do the one thing' } ]
  },
  {
    title: 'Today',
    color: 'orange',
    items: [ { done: false, text: 'Do the one thing' } ]
  },
  {
    title: 'Daily',
    color: 'blue',
    items: [ { done: false, text: 'Do the one thing' } ]
  }
];


const listsContainer = document.querySelector('.lists-container');

renderLists(initialState);

const itemsList = [...document.querySelectorAll('.list__items')];
itemsList.forEach((el) => {
  el.addEventListener('click', toggleDone);
  el.addEventListener('click', removeItem);
});

const addItems = [...document.querySelectorAll('.add-items')];
addItems.forEach((el) => {
  el.addEventListener('submit', addItem);
});


/*
  functions
*/
function renderLists(lists) {
  listsContainer.innerHTML = lists.map((list, i) => {
    return (`
      <div class="list list--${list.color}" data-list-index=${i}>
        <div class="list__header">
          <h2 class="list__title">${list.title}</h2>
          <form class="add-items list__input-container" data-list-index=${i}>
            <input class="list__input" type="text" name="item" autofocus placeholder="todo...">
            <button class="list__input-add-btn" type="submit">+</button>
          </form>
        </div>
        <ul class="list__items" data-list-index=${i}>
          ${populateList(list.items)}
        </ul>
      </div>
    `);
  }).join('');
}

function populateList(items) {
  return items.map((item, i) => {
    return `
      <li class="list__item" data-index=${i}>
        <span class="list__item-item-text ${item.done
          ? 'list__item-item-text--done'
          : ''}" data-index=${i}>${item.text}</span>
        <span class="list__item-delete-btn" data-index=${i}>X</span>
      </li>
    `;
  }).join('');
}

function addItem(e) {
  console.log(e);
  e.preventDefault();
  const thisInput = this.querySelector('.list__input');
  const item = {
    text: thisInput.value,
    done: false
  };

  const listIndex = e.target.dataset.listIndex;

  // manipulate DOM
  let allListItems = document.querySelectorAll(`.list__items`);
  console.log(allListItems);
  let thisListItems = allListItems[listIndex];
  let len = initialState[listIndex].items.length;
  thisListItems.innerHTML += (`
    <li class="list__item" data-index=${len}>
      <span class="list__item-item-text" data-index=${len}>${item.text}</span>
      <span class="list__item-delete-btn" data-index=${len}>X</span>
    </li>
  `);
  thisInput.value = '';

  // manipulate data
  initialState[listIndex].items.push(item);
  localStorage.setItem('items', JSON.stringify(initialState));
}

function toggleDone(e) {
  // skip this unless it's the item text
  if (!e.target.matches('.list__item-item-text')) return;

  const el = e.target;
  const itemIndex = el.dataset.index;
  const listIndex = e.path[2].dataset.listIndex;

  e.target.classList.toggle('list__item-item-text--done');
  // flip the boolean value
  const value = initialState[listIndex].items[itemIndex].done;
  initialState[listIndex].items[itemIndex].done = !value;
  localStorage.setItem('items', JSON.stringify(initialState));
}

function removeItem(e) {
  // skip this unless it's the delete button
  if (!e.target.matches('.list__item-delete-btn')) return;
  console.log(e);
  const el = e.target;
  const itemIndex = el.dataset.index;
  const listIndex = e.path[2].dataset.listIndex;

  let btns = [...e.path[2].querySelectorAll(`.list__item-delete-btn`)];
  let btnIndex = btns.findIndex((btn) => {
    return btn.dataset.index === itemIndex;
  });
  console.log(btns);
  console.log(btnIndex);

  e.path[1].remove();
  initialState[listIndex].items.splice(btnIndex, 1);
  localStorage.setItem('items', JSON.stringify(initialState));
}
