/* eslint-disable */

// get elements

const itemForm = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.querySelector('#clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];

let itemData = JSON.parse(localStorage.getItem('list')) || [];

if (itemData.length > 0) {
  itemData.forEach(function(singleItem) {
    itemList.insertAdjacentHTML(
      'beforeend',
      `
      <div class='item my-3'>
        <h5 class="item-name text-capitalize">${singleItem}</h5>
        <div class="item-icons">
        <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
        <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
        <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
      </div>
    `,
    );
    handleItem(singleItem);
  });
}

// form submission

itemForm.addEventListener('submit', e => {
  e.preventDefault();

  const textValue = itemInput.value;
  // console.log(textValue);

  if (textValue === '') {
    showFeedback('Please Enter Valid Value', 'danger');
  } else {
    // add item
    addItem(textValue);
    // clear the form
    itemInput.value = '';
    // add to item array
    itemData.push(textValue);
    // console.log(itemData);
    // local storage
    localStorage.setItem('list', JSON.stringify(itemData));
    // add event listeners to icons
    handleItem(textValue);
  }
});

// show feedback function
function showFeedback(text, action) {
  feedback.classList.add('showItem', `alert-${action}`);
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove('showItem', `alert-${action}`);
  }, 3000);
}

function addItem(value) {
  const div = document.createElement('div');
  div.classList.add('item', 'my-3');
  div.innerHTML = `
    <h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
  itemList.appendChild(div);
}

function handleItem(textValue) {
  const items = itemList.querySelectorAll('.item');
  items.forEach(item => {
    if (item.querySelector('.item-name').textContent === textValue) {
      // complete the event listener
      /* eslint func-names: ["error", "never"] */
      item.querySelector('.complete-item').addEventListener('click', function() {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      });
      // edit event listener
      /* eslint func-names: ["error", "never"] */
      item.querySelector('.edit-item').addEventListener('click', () => {
        itemInput.value = textValue;
        itemList.removeChild(item);

        itemData = itemData.filter(item => item !== textValue);
        localStorage.setItem('list', JSON.stringify(itemData));
      });
      // delete event listener
      item.querySelector('.delete-item').addEventListener('click', () => {
        itemList.removeChild(item);

        itemData = itemData.filter(function(item) {
          return item !== textValue;
        });
        localStorage.setItem('list', JSON.stringify(itemData));

        showFeedback('item deleted', 'success');
      });
    }
  });
}

clearBtn.addEventListener('click', function() {
  itemData = [];
  localStorage.removeItem('list');
  const items = itemList.querySelectorAll('.item');
  if (items.length > 0) {
    items.forEach(function(item) {
      itemList.removeChild(item);
    });
  }
});
