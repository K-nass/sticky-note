class Note {
  #notesContainer = document.getElementById("notes-container");
  static numberOfId = 1;
  static numberOfNotes = 1;

  constructor() {
    localStorage.setItem("numberOfNotes", Note.numberOfNotes++);
    this.textAreaId = `note-${Note.numberOfId++}`;
  }

  createTextArea() {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("rows", 15);
    textArea.setAttribute("cols", 25);
    textArea.setAttribute("draggable", true);
    textArea.id = this.textAreaId;
    textArea.addEventListener("dragstart", () => {
      textArea.classList.add("dragging");
    });

    textArea.addEventListener("dragend", () => {
      textArea.classList.remove("dragging");
    });

    document
      .getElementById("trash-icon")
      .addEventListener("dragover", (event) => {
        event.preventDefault();
        console.log("true");

        const draggingNote = document.querySelector(".dragging");
        if (draggingNote && Note.numberOfNotes > 1) {
          localStorage.removeItem(`content-${draggingNote.id}`);
          draggingNote.parentElement.remove();
          Note.numberOfNotes--;
          localStorage.setItem("numberOfNotes", Note.numberOfNotes);
        }
      });

    textArea.addEventListener("input", () => {
      localStorage.setItem(`content-${this.textAreaId}`, textArea.value);
    });
    textArea.value = localStorage.getItem(`content-${this.textAreaId}`) || "";
    return textArea;
  }

  createButton() {
    const button = document.createElement("button");
    button.setAttribute("class", "btn");
    button.textContent = "+";
    button.addEventListener("click", function () {
      Note.createNote().appendToNotesContainer();
    });
    return button;
  }

  appendToNotesContainer() {
    const innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "note");
    this.#notesContainer
      .appendChild(innerDiv)
      .appendChild(this.createTextArea());
    this.#notesContainer.appendChild(innerDiv).appendChild(this.createButton());
  }

  static createNote() {
    return new Note();
  }
}

const savedNotes = Number(localStorage.getItem("numberOfNotes")) || 1;

  for (let i = 0; i < savedNotes; i++) {
    Note.createNote().appendToNotesContainer();
  }

