// Variables
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const yearInput = document.getElementById("year-input");
const addBookBtn = document.getElementById("add-book-btn");
const tableBody = document.getElementById("table-body");
const updateTitleInput = document.getElementById("update-title-input");
const updateAuthorInput = document.getElementById("update-author-input");
const updateYearInput = document.getElementById("update-year-input");
const updateBookBtn = document.getElementById("update-book-btn");
const cancelUpdateBtn = document.getElementById("cancel-update-btn");
let books = JSON.parse(localStorage.getItem("books")) || [];
let currentBookId = null;

// Functions
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const titleTd = document.createElement("td");
    const authorTd = document.createElement("td");
    const yearTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = book.id;
    titleTd.innerText = book.title;
    authorTd.innerText = book.author;
    yearTd.innerText = book.year;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(book.id);
    });
    deleteBtn.addEventListener("click", () => {
      deleteBook(book.id);
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(titleTd);
    tr.appendChild(authorTd);
    tr.appendChild(yearTd);
    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
}

function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const year = yearInput.value.trim();
  if (title && author && year) {
    const id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const book = {
      id: id,
      title: title,
      author: author,
      year: year,
    };
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    renderTable();
  } else {
    alert("All fields are required");
  }
}

function updateBook() {
  const title = updateTitleInput.value.trim();
  const author = updateAuthorInput.value.trim();
  const year = updateYearInput.value.trim();
  const index = books.findIndex((book) => book.id === currentBookId);
  if (index !== -1 && title && author && year) {
    books[index].title = title;
    books[index].author = author;
    books[index].year = year;
    localStorage.setItem("books", JSON.stringify(books));
    hideUpdateForm();
    renderTable();
  } else {
    alert("All fields are required");
  }
}

function showUpdateForm(bookId) {
  const book = books.find((book) => book.id === bookId);
  if (book) {
    updateTitleInput.value = book.title;
    updateAuthorInput.value = book.author;
    updateYearInput.value = book.year;
    currentBookId = book.id;
    updateBookBtn.addEventListener("click", updateBook);
    cancelUpdateBtn.addEventListener("click", hideUpdateForm);
    updateBookBtn.style.display = "inline-block";
    cancelUpdateBtn.style.display = "inline-block";
    updateTitleInput.style.display = "inline-block";
    updateAuthorInput.style.display = "inline-block";
    updateYearInput.style.display = "inline-block";
    document.getElementById("update-container").style.display = "block";
  }
}

function hideUpdateForm() {
  updateTitleInput.value = "";
  updateAuthorInput.value = "";
  updateYearInput.value = "";
  currentBookId = null;
  updateBookBtn.removeEventListener("click", updateBook);
  cancelUpdateBtn.removeEventListener("click", hideUpdateForm);
  updateBookBtn.style.display = "none";
  cancelUpdateBtn.style.display = "none";
  updateTitleInput.style.display = "none";
  updateAuthorInput.style.display = "none";
  updateYearInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

function deleteBook(bookId) {
  books = books.filter((book) => book.id !== bookId);
  localStorage.setItem("books", JSON.stringify(books));
  if (books.length === 0) {
    hideUpdateForm();
  }
  renderTable();
}

// Event Listeners
addBookBtn.addEventListener("click", addBook);

// Initialize table
renderTable();
