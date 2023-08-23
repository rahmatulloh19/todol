const elForm = document.querySelector(".js-hero__form");
const elList = document.querySelector(".js-hero__list");
const elWork = document.querySelector(".js-form__input");
const elTime = document.querySelector(".js-form__input-time");

const todo = JSON.parse(localStorage.getItem("todos") || "[]");
localStorage.setItem("todos", JSON.stringify(todo));

renderToDos(todo);

function renderToDos (array) {
  // arrayimiz bosh bo'lganda quyidagi so'z chiqib turishi uchun
  if(array.length === 0 && elList.textContent === "") {
    elList.innerHTML = `<li class="hero__item hero__item--start">What will we do today?</li>`;
  } else {
    elList.textContent = "";
  }
  array.forEach(item => {
    const liElement = document.createElement("li");
    liElement.classList.add("hero__item");
    liElement.textContent = item.title;
    
    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("hero__item-inner");
    wrapperElement.innerHTML = `<time class="hero__time" datetime="${item.time}">${item.time}</time>
    <button class="hero__item-btn buttons-styles edit" data-id=${item.id}>
    <span class="hero__item-edit hero__item--inner buttons-styles-inner" data-id=${item.id}></span>
    </button>
    <button class="hero__item-btn buttons-styles delete" data-id=${item.id}>
    <span class="hero__item-delete hero__item--inner buttons-styles-inner" data-id=${item.id}></span>
    </button>`
    
    liElement.appendChild(wrapperElement);
    elList.appendChild(liElement);
  })
}

const date = new Date();

let hours = date.getHours().toString();
let minutes = date.getMinutes().toString();

// soatlarimiz va minutlarimiz string datatypega o'tganda birinchi kelgan nolni olib tashlaydi olib tashlangan nolni qaytardik
if(hours.length === 1) {
  hours = `0${hours}`;
}

if(minutes.length == 1) {
  minutes = `0${minutes}`
}

elList.addEventListener("click", evt => {
  if(evt.target.matches(".hero__item-delete") || evt.target.matches(".delete")) {
    const deleteId = evt.target.dataset.id;
    const deleteObj = todo.findIndex(item => item.id == deleteId);
    
    todo.splice(deleteObj, 1);
    localStorage.setItem("todos", JSON.stringify(todo))
    renderToDos(todo);
  }
  
  if(evt.target.matches(".hero__item-edit") || evt.target.matches(".edit")) {
    const editId = evt.target.dataset.id;
    const editObj = todo.find(item => item.id == editId);
    
    const editWork = prompt("Enter what do you change", editObj.title);
    if(editWork !== null) {
      editObj.title = editWork;
      editObj.time = hours + ":" + minutes;
    }
    localStorage.setItem("todos", JSON.stringify(todo))
    renderToDos(todo);
  }
})

elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  
  const elWorkValue = elWork.value.trim();
  const elTimeValue = elTime.value;
  
  let newToDo;
  
  newToDo = {
    id: todo.length ? todo.length + 1 : 1,
    title: elWorkValue,
    time: elTimeValue === "" ? `${hours}:${minutes}` : elTimeValue
  }
  todo.unshift(newToDo);
  localStorage.setItem("todos", JSON.stringify(todo))
  elWork.value = "";
  elTime.value = "";
  
  renderToDos(todo);
})