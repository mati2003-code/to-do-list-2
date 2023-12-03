const inputEl = document.getElementById("forUser");
const addBtn = document.getElementById("addToList");
const list = document.getElementById("list");
const divContainers = document.querySelector(".containers");

inputEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addToList();
  }
});

const darkModeButton = document.getElementById("dark-mode-icon");
const body = document.body;

darkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
})

function saveToLocalStorage() {

  const containersData = [];
  const containerElements = document.querySelectorAll(".comment-container");
  containerElements.forEach((containerElement) => {
    const containerContent = {
      h1Text: containerElement.querySelector("h1").innerText,
      comments: [],
    };

    const commentElements = containerElement.querySelectorAll(".comments-list span");
    commentElements.forEach((commentElement) => {
      containerContent.comments.push(commentElement.innerText);
    });

    containersData.push(containerContent);
  });

  localStorage.setItem("containersData", JSON.stringify(containersData));
}

// Funkcja wczytująca dane z lokalnego magazynu
function loadFromLocalStorage() {
  const containersData = localStorage.getItem("containersData");

  if (containersData) {
    const parsedContainersData = JSON.parse(containersData);
    parsedContainersData.forEach((containerData) => {
      createContainerToCommentThing(containerData.h1Text);
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
});

function addToList() {
  if (inputEl.value === "") {
    return;
  }

  // Przekazanie wartości do funkcji createContainerToCommentThing
  createContainerToCommentThing(inputEl.value);

  saveToLocalStorage();
  inputEl.value = "";
}

addBtn.addEventListener("click", addToList);

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".comments-list:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Funkcja tworząca kontener z komentarzami
const createContainerToCommentThing = (h1Text) => {
  const container = document.createElement("div");
  container.classList.add("comment-container");
  const divH1 = document.createElement("div");
  divH1.classList.add("div-h1-position");
  const h1El = document.createElement("h1");
  const buttonRemoveContainer = document.createElement("button");
  buttonRemoveContainer.innerText = "Delete";
  buttonRemoveContainer.id = "delete-button";
  const inputCommentEl = document.createElement("input");
  inputCommentEl.id = "comment-input";
  const buttonAddComment = document.createElement("button");

  divContainers.appendChild(container);
  container.appendChild(divH1);
  divH1.appendChild(h1El);
  divH1.appendChild(buttonRemoveContainer);
  container.appendChild(inputCommentEl);
  container.appendChild(buttonAddComment);

  h1El.innerText = h1Text;
  buttonAddComment.innerHTML = "Add";

  const removeContainer = () => {
    container.classList.add("animation-disappear");
    setTimeout(() => {
      container.remove();
      saveToLocalStorage();
    }, 1000);
  };

  buttonRemoveContainer.addEventListener("click", removeContainer);

  // Funkcja dodająca komentarze 
  const addComment = () => {
    const ulList = document.createElement("ul");
    container.appendChild(ulList);
    const liComments = document.createElement("li");
    liComments.classList.add("comments-list");
    liComments.draggable = true;
    const spanElement = document.createElement("span");
    const editButton = document.createElement("button");
    const spanElForButtons = document.createElement("span");
    spanElForButtons.id = "span-el-for-buttons";
    editButton.id = "edit-button";
    editButton.innerHTML = "Edit";
    const removeListElementButton = document.createElement("button");
    removeListElementButton.id = "remove-button";
    removeListElementButton.innerHTML = "Remove";
    liComments.appendChild(spanElement);
    liComments.append(spanElForButtons);
    spanElForButtons.appendChild(editButton);
    spanElForButtons.appendChild(removeListElementButton);

    liComments.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", ""); // Wymagane dla przeciągania w Firefox
      e.target.classList.add("dragging");
    });
    
    liComments.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
      saveToLocalStorage();
    });
    
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });

    if (inputCommentEl.value === "") {
      alert("Pole nie może być puste");
      return;
    } else {
      ulList.appendChild(liComments);
      spanElement.innerHTML = inputCommentEl.value;
    }
    inputCommentEl.value = "";
    saveToLocalStorage();

    spanElement.addEventListener("click", () => {
      spanElement.classList.toggle("line-through");
    });

    // Funkcja edytująca komentarze
    const editComment = () => {
      const editByPrompt = prompt("Edytuj tekst");

      if (editByPrompt !== null && editByPrompt !== '') {
        spanElement.innerText = editByPrompt;
        saveToLocalStorage();
      } else {

      }
    };
    
    // Funkcja usuwająca komentarze
    const removeComment = () => {
      liComments.classList.add("animation-disappear");
      
      setTimeout(() => {
        liComments.remove();
        saveToLocalStorage();
      }, 1000);
    };
    
    removeListElementButton.addEventListener("click", removeComment);
    editButton.addEventListener("click", editComment);
  };
  
  inputCommentEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  });
  buttonAddComment.addEventListener("click",() => {
    addComment();
  });
};
















