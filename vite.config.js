document.addEventListener("DOMContentLoaded", function() {
  const noteForm = document.getElementById("noteForm");
  const noteInput = document.getElementById("noteInput");
  const noteList = document.getElementById("noteList");

  noteForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const noteText = noteInput.value.trim();
      if (noteText !== "") {
          addNoteToList(noteText, false); // Menambah catatan dengan status 'belum selesai'
          saveNoteToStorage(noteText, false); // Menyimpan catatan ke penyimpanan lokal
          noteInput.value = "";
      }
  });

  function addNoteToList(noteText, completed) {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed;
      checkbox.addEventListener("change", function() {
          updateNoteStatus(li, checkbox.checked);
      });
      const span = document.createElement("span");
      span.textContent = noteText;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Hapus";
      deleteBtn.addEventListener("click", function() {
          removeNoteFromList(li);
          removeNoteFromStorage(noteText);
      });
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      noteList.appendChild(li);
  }

  function updateNoteStatus(li, completed) {
      li.classList.toggle("completed", completed);
  }

  function removeNoteFromList(li) {
      li.remove();
  }

  function removeNoteFromStorage(noteText) {
      let savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
          const notesArray = JSON.parse(savedNotes);
          const updatedNotes = notesArray.filter(note => note.text !== noteText);
          localStorage.setItem("notes", JSON.stringify(updatedNotes));
      }
  }

  function saveNoteToStorage(noteText, completed) {
      let savedNotes = localStorage.getItem("notes");
      if (!savedNotes) {
          savedNotes = JSON.stringify([{ text: noteText, completed: completed }]);
      } else {
          const notesArray = JSON.parse(savedNotes);
          notesArray.push({ text: noteText, completed: completed });
          savedNotes = JSON.stringify(notesArray);
      }
      localStorage.setItem("notes", savedNotes);
  }

  // Memuat catatan dari penyimpanan lokal saat halaman dimuat
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
      const notesArray = JSON.parse(savedNotes);
      notesArray.forEach(note => addNoteToList(note.text, note.completed));
  }

  function addNoteToList(noteText, category, completed) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function() {
        updateNoteStatus(li, checkbox.checked);
    });
    const span = document.createElement("span");
    span.textContent = noteText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", function() {
        removeNoteFromList(li);
        removeNoteFromStorage(noteText);
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Menambahkan catatan ke kotak yang sesuai berdasarkan kategori
    let ul;
    switch (category) {
        case "general":
            ul = document.getElementById("generalNotes");
            break;
        case "work":
            ul = document.getElementById("workNotes");
            break;
        case "personal":
            ul = document.getElementById("personalNotes");
            break;
        default:
            ul = document.getElementById("generalNotes");
    }
    ul.appendChild(li);
}
})