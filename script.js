/*
  setup
*/
const STATE = JSON.parse(localStorage.getItem('items')) || [
  {
    title: 'Near Future',
    color: 'red',
    items: [ { done: false, text: 'Do the one thing' } ]
  },
  {
    title: 'This Week',
    color: 'orange',
    items: [ { done: false, text: 'Do the one thing' } ]
  },
  {
    title: 'Today',
    color: 'green',
    items: [ { done: false, text: 'Do the one thing' } ]
  },
  {
    title: 'Daily',
    color: 'blue',
    items: [ { done: false, text: 'Do the one thing' } ]
  }
];

const listsContainer = document.querySelector('.lists-container');
renderLists(STATE);

[...document.querySelectorAll('.list__items')].forEach((el) => {
  el.addEventListener('click', toggleItem);
  el.addEventListener('click', removeItem);
});
[...document.querySelectorAll('.add-items')].forEach((el) => {
  el.addEventListener('submit', addItem);
});

// clear local storage
window.addEventListener('keydown', e => {
  if (e.key === '-') localStorage.removeItem('items');
});


/*
  functions
*/
function renderLists(lists) {
  listsContainer.innerHTML = lists.map((list, i) => {
    // TODO: make sure ids are assigned properly
    return (`
      <div class="list list--${list.color}" data-list-id=${i}>
        <div class="list__header">
          <h2 class="list__title">${list.title}</h2>
          <form class="add-items list__input-container">
            <input class="list__input" type="text" name="item" autofocus tabindex=${i+1} placeholder="todo...">
            <button class="list__input-add-btn" type="submit">+</button>
          </form>
        </div>
        <ul class="list__items">
          ${populateList(list.items)}
        </ul>
      </div>
    `);
  }).join('');
}

function populateList(items) {
  return items.map((item, i) =>
    (`
      <li class="list__item" data-item-id=${i}>
        <span class="list__item-item-text ${item.done ? 'list__item-item-text--done' : ''}">${item.text}</span>
        <span class="list__item-delete-btn">X</span>
      </li>
    `)).join('');
}

function getAvailableId(list) {
  let takenIds = [];
  list.forEach((item) => { takenIds.push(item.dataset.itemId); });

  for (let i = 0; i < 100; i++) {
    if (!takenIds.includes(String(i))) return i;
  }
  return -1; // can't find an untaken id
}

function getIndex(id, list) {
  return list.findIndex((item) => item.dataset.itemId === id);
}

function updateStorage() {
  localStorage.setItem('items', JSON.stringify(STATE));
}

function addItem(e) {
  e.preventDefault(); // don't refresh page

  const thisInput = this.querySelector('.list__input');
  const thisList = e.path[2];
  const listId = thisList.dataset.listId;

  const thisListItems = thisList.querySelector(`.list__items`);
  const theseItems = [...thisList.querySelectorAll(`.list__item`)];
  const id = getAvailableId(theseItems);

  const item = {
    text: thisInput.value,
    done: false
  };

  // manipulate DOM
  thisListItems.innerHTML += (`
    <li class="list__item" data-id=${id}>
      <span class="list__item-item-text">${item.text}</span>
      <span class="list__item-delete-btn">X</span>
    </li>
  `);
  thisInput.value = '';

  // manipulate data
  STATE[listId].items.push(item);
  updateStorage();
}

function toggleItem(e) {
  // skip this unless it's the item text
  if (!e.target.matches('.list__item-item-text')) return;

  const itemId = e.path[1].dataset.itemId;
  const thisList = e.path[3];
  const listId = thisList.dataset.listId;

  const itemIndex = getIndex(itemId, [...thisList.querySelectorAll(`.list__item`)]);

  // manipulate DOM
  e.target.classList.toggle('list__item-item-text--done');

  // manipulate data
  const value = STATE[listId].items[itemIndex].done;
  STATE[listId].items[itemIndex].done = !value;
  updateStorage();
}

function removeItem(e) {
  // skip this unless it's the delete button
  if (!e.target.matches('.list__item-delete-btn')) return;

  const thisItem = e.path[1];
  const itemId = thisItem.dataset.itemId;

  const thisList = e.path[3];
  const listId = thisList.dataset.listId;

  const itemIndex = getIndex(itemId, [...thisList.querySelectorAll(`.list__item`)]);

  // manipulate DOM
  thisItem.remove();

  // manipulate data
  STATE[listId].items.splice(itemIndex, 1);
  updateStorage();
}
