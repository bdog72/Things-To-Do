// get elements

const itemForm = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
// const clearBtn = document.querySelector('#clear-btn');
const feedback = document.querySelector('.feedback');

const itemData = [];

// form submission

itemForm.addEventListener('submit', (e) => {
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
  // console.log(items);
}

// document.querySelector('.item-icon').classList.add('showItem');
