document.addEventListener("DOMContentLoaded", () => {
  let toDoList = JSON.parse(localStorage.getItem("toDoList")) || []; // ⭐ load saved list
  const form = document.getElementById("form");
  const inputField = document.getElementById("addList");
  const inputError = document.getElementById("addListError");
  const doList = document.getElementById("doList");
  const dateField = document.getElementById("date");

  function saveList() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList)); // ⭐ save to storage
  }

  function validateInput() {
    const input = inputField.value.trim();
    if (input === "") {
      inputError.textContent = "Add something";
      inputError.style.display = "block";
      return false;
    } else if (input.length < 3) {
      inputError.textContent = "Add some word";
      inputError.style.display = "block";
      return false;
    } else {
      inputError.textContent = "";
      inputError.style.display = "none";
      return input;
    }
  }

  function renderList() {
    doList.innerHTML = "";
    toDoList.forEach((item, index) => {
      const tr = document.createElement("tr");

      const tdTask = document.createElement("td");
      tdTask.textContent = item.task;

      const tdDate = document.createElement("td");
      tdDate.textContent = item.date;

      const tdAction = document.createElement("td");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      const doneButton = document.createElement("button");
      doneButton.textContent = item.done ? "Undo" : "Done"; // ⭐ toggle button text

      deleteButton.addEventListener("click", () => {
        toDoList.splice(index, 1);
        saveList(); // ⭐ update storage
        renderList();
      });

      doneButton.addEventListener("click", () => {
        toDoList[index].done = !toDoList[index].done; // ⭐ save done state
        saveList();
        renderList();
      });

      if (item.done) {
        tr.style.textDecoration = "line-through";
        tr.style.color = "gray";
      }

      tdAction.appendChild(deleteButton);
      tdAction.appendChild(doneButton);

      tr.appendChild(tdTask);
      tr.appendChild(tdDate);
      tr.appendChild(tdAction);
      doList.appendChild(tr);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputItem = validateInput();
    let chosenValue = dateField.value;

    if (!chosenValue) {
      const today = new Date();
      chosenValue = today.toISOString().split("T")[0];
    }

    if (inputItem) {
      toDoList.push({
        task: inputItem,
        date: chosenValue,
        done: false, // ⭐ start with not done
      });
      saveList();
      renderList();
      inputField.value = "";
      dateField.value = "";
    }
  });

  inputField.addEventListener("input", validateInput);

  renderList(); // ⭐ render saved tasks when page loads
});
