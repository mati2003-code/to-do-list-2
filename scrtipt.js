const inputEl = document.getElementById("forUser");
const addBtn = document.getElementById("addToList");
const list = document.getElementById("list");

addBtn.addEventListener("click", addToList);

inputEl.addEventListener("keyup", (event) => {
  if(event.key === "Enter") {
    addToList();
  }
});

function addToList() {
  let newButton = document.createElement("button");
  let newElement = document.createElement("li");
  let newSpan = document.createElement("span");

  if (inputEl.value === '') {
    return;
  }

  newElement.appendChild(newSpan);
  newSpan.innerHTML = inputEl.value;

  newButton.innerHTML = `🗑`;
  newButton.className = 'btns';
  newElement.appendChild(newButton);
  list.appendChild(newElement);
  

  newButton.addEventListener("click", removeElement);

  newElement.addEventListener("click", () => {
    changeElementStyle(newSpan);
  });

  createContainerToCommentThing();

  inputEl.value = "";
}

function removeElement() {
  let listItem = this.parentNode;
  list.removeChild(listItem);
}

function changeElementStyle(el) {
  el.classList.toggle("line-through");
}

const divContainers = document.querySelector(".containers");

const createContainerToCommentThing = () => {
  const container = document.createElement("div");
  container.classList.add("comment-container");
  const h1El = document.createElement("h1");
  const inputCommentEl = document.createElement("input");
  inputCommentEl.id = "comment-input";
  const buttonAddComment = document.createElement("button");
 
  divContainers.appendChild(container);
  container.appendChild(h1El);
  container.appendChild(inputCommentEl);
  container.appendChild(buttonAddComment);
  
  h1El.innerText = inputEl.value;
  buttonAddComment.innerHTML = "Add"

  const addComment = () => {
    const ulList = document.createElement("ul");
    container.appendChild(ulList);
    const liComments = document.createElement("li");
    liComments.classList.add("comments-list");
   
    if (inputCommentEl.value === '') {
      alert("Pole nie moze być puste");
      return;
    } else {
      ulList.appendChild(liComments);
      liComments.innerHTML = inputCommentEl.value;
    }
    inputCommentEl.value = ''
  }
  

  inputCommentEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  })
  buttonAddComment.addEventListener("click", addComment);
}














