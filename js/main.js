const elForm = document.querySelector(".js-hero__form");
const elList = document.querySelector(".js-hero__list");
const elWork = document.querySelector(".js-form__input");
const elTime = document.querySelector(".js-form__input-time");

const todo = [
  {
    id: 1,
    title: "Buy Benanas",
    time: `14:12`
  },
  {
    id: 2,
    title: "Buy Apple",
    time: `11:20`
  }
]



const renderToDos = array => {
  elList.textContent = "";
  array.forEach(item => {
    const liElement = document.createElement("li");
    liElement.classList.add("hero__item");
    liElement.textContent = item.title;
    
    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("hero__item-inner");
    wrapperElement.innerHTML = `<time datetime="${item.time}">${item.time}</time>
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

renderToDos(todo);

const date = new Date();

let hours = date.getHours();
let minutes = date.getMinutes();

elList.addEventListener("click", evt => {
  if(evt.target.matches(".hero__item-delete") || evt.target.matches(".delete")) {
    const deleteId = evt.target.dataset.id;
    const deleteObj = todo.findIndex(item => item.id == deleteId);
    
    todo.splice(deleteObj, 1);
    renderToDos(todo);
  }
  
  if(evt.target.matches(".hero__item-edit") || evt.target.matches(".edit")) {
    const editId = evt.target.dataset.id;
    const editObj = todo.find(item => item.id == editId);
    
    const editWork = prompt("Enter what do you change");
    if(editWork !== null) {
      editObj.title = editWork;
      editObj.time = hours + ":" + minutes;
    }
    renderToDos(todo);
  }
})

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  const elWorkValue = elWork.value.trim();
  const elTimeValue = elTime.value;

  let newToDo;

  if(elWorkValue !== "" && elTimeValue !== "") {
    newToDo = {
      id: todo.length ? ++todo.length : 1,
      title: elWorkValue,
      time: elTimeValue
    }
    todo.unshift(newToDo);
    elWork.value = "";
    elTime.value = "";
  }

  renderToDos(todo);
})