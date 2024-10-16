// Variable initialization
const storageKey = 'BOOKS_STORAGE_KEY'; // Rename storage key for clarity
const bookForm = document.getElementById('bookForm'); // Get book form element
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');

function checkForStorage() {
    return typeof Storage !== 'undefined';
}

function saveBooks(data) {
    if (checkForStorage()) {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
}

function loadBooks() {
    if (checkForStorage()) {
        const storedBooks = localStorage.getItem(storageKey);
        return storedBooks ? JSON.parse(storedBooks) : [];
    } else {
        return [];
    }
}

bookForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = parseInt(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Year:', year);
    console.log('Is Complete:', isComplete);

    const newBook = {
        id: Date.now(),
        title,
        author,
        year,
        isComplete
    }
    console.log('New Book:', newBook);

    const books = loadBooks(); // Load existing books from localStorage
    books.push(newBook); // Add the new book to the array
    saveBooks(books); // Save updated book list to localStorage

    renderBooks(); // Render books after adding new book

    bookForm.reset(); // Reset the form after submission
})

// Initial load of books from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const books = loadBooks(); // Load books from localStorage
    // You can use the books array to render or manipulate your UI as needed
});

function renderBooks() {
    const books = loadBooks(); // Load books from localStorage

    // Clear existing content
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    // Iterate through books and render them based on completeness
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');

        bookItem.innerHTML = `
          <div class="card rounded-3 mb-3">
            <div class="card-body">
              <h3 class="card-title fw-bold text-center" data-testid="bookItemTitle">${book.title}</h3>
              <p class="card-text m-0" data-testid="bookItemAuthor">${book.author}</p>
              <p class="card-text" data-testid="bookItemYear">${book.year}</p>
              <div class="d-flex justify-content-center">
                <button class="fw-bold btn btn-sm btn-primary" data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai' : 'Selesai'}</button>
                <button class="fw-bold mx-2 btn btn-sm btn-danger text-white" data-testid="bookItemDeleteButton">Hapus</button>
                <button class="fw-bold btn btn-sm btn-success" data-testid="bookItemEditButton">Edit</button>
              </div>
            </div>
          </div>
        `;

        if (book.isComplete) {
            completeBookList.appendChild(bookItem);
        } else {
            incompleteBookList.appendChild(bookItem);
        }
    });
}


// Initial render of books from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    renderBooks(); // Render books initially
});

function moveBookToCompleted(bookElement) {
    const listCompleted = document.getElementById('completeBookList'); // Assuming this is the ID for the completed books list
    const bookId = bookElement.dataset.bookid; // Get the book ID from data attribute
    const bookTitle = bookElement.querySelector('[data-testid="bookItemTitle"]').innerText;
    const bookAuthor = bookElement.querySelector('[data-testid="bookItemAuthor"]').innerText;
    const bookYear = bookElement.querySelector('[data-testid="bookItemYear"]').innerText;

    const newBookItem = document.createElement('div');
    newBookItem.setAttribute('data-bookid', bookId);
    newBookItem.setAttribute('data-testid', 'bookItem');

    // Gunakan struktur HTML yang konsisten dengan `renderBooks`
    newBookItem.innerHTML = `
      <div class="card rounded-3 mb-3">
        <div class="card-body">
          <h3 class="card-title fw-bold text-center" data-testid="bookItemTitle">${bookTitle}</h3>
          <p class="card-text m-0" data-testid="bookItemAuthor">${bookAuthor}</p>
          <p class="card-text" data-testid="bookItemYear">${bookYear}</p>
          <div class="d-flex justify-content-center">
            <button class="fw-bold btn btn-sm btn-primary" data-testid="bookItemIsCompleteButton">Belum selesai</button>
            <button class="fw-bold mx-2 btn btn-sm btn-danger text-white" data-testid="bookItemDeleteButton">Hapus</button>
            <button class="fw-bold btn btn-sm btn-light" data-testid="bookItemEditButton">Edit</button>
          </div>
        </div>
      </div>
    `;

    listCompleted.appendChild(newBookItem); // Append the new book item to the completed books list
    bookElement.remove(); // Remove the book from the incomplete books list

    // Update book data in localStorage
    const books = loadBooks(); // Load books from localStorage
    const updatedBooks = books.map(book => {
        if (book.id.toString() === bookId.toString()) {
            return { ...book, isComplete: true };
        }
        return book;
    });
    saveBooks(updatedBooks); // Save updated book list to localStorage
}

function moveBookToIncomplete(bookElement) {
    const listIncomplete = document.getElementById('incompleteBookList'); // Assuming this is the ID for the incomplete books list
    const bookId = bookElement.dataset.bookid; // Get the book ID from data attribute
    const bookTitle = bookElement.querySelector('[data-testid="bookItemTitle"]').innerText;
    const bookAuthor = bookElement.querySelector('[data-testid="bookItemAuthor"]').innerText;
    const bookYear = bookElement.querySelector('[data-testid="bookItemYear"]').innerText;

    const newBookItem = document.createElement('div');
    newBookItem.setAttribute('data-bookid', bookId);
    newBookItem.setAttribute('data-testid', 'bookItem');

    // Gunakan struktur HTML yang konsisten dengan `renderBooks`
    newBookItem.innerHTML = `
      <div class="card rounded-3 mb-3">
        <div class="card-body">
          <h3 class="card-title fw-bold text-center" data-testid="bookItemTitle">${bookTitle}</h3>
          <p class="card-text m-0" data-testid="bookItemAuthor">${bookAuthor}</p>
          <p class="card-text" data-testid="bookItemYear">${bookYear}</p>
          <div class="d-flex justify-content-center">
            <button class="fw-bold btn btn-sm btn-primary" data-testid="bookItemIsCompleteButton">Selesai</button>
            <button class="fw-bold mx-2 btn btn-sm btn-danger text-white" data-testid="bookItemDeleteButton">Hapus</button>
            <button class="fw-bold btn btn-sm btn-light" data-testid="bookItemEditButton">Edit</button>
          </div>
        </div>
      </div>
    `;

    listIncomplete.appendChild(newBookItem); // Append the new book item to the incomplete books list
    bookElement.remove(); // Remove the book from the complete books list

    // Update book data in localStorage
    const books = loadBooks(); // Load books from localStorage
    const updatedBooks = books.map(book => {
        if (book.id.toString() === bookId.toString()) {
            return { ...book, isComplete: false };
        }
        return book;
    });
    saveBooks(updatedBooks); // Save updated book list to localStorage
}

// Event listener for moving book to completed when "Selesai" button is clicked
document.addEventListener('click', function (event) {
    if (event.target && event.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
        const bookElement = event.target.closest('[data-testid="bookItem"]');
        if (bookElement) {
            const isComplete = bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').innerText === 'Belum selesai';
            if (isComplete) {
                moveBookToIncomplete(bookElement);
            } else {
                moveBookToCompleted(bookElement);
            }
        }
    }
});

// Fungsi untuk menghapus buku dari DOM dan localStorage
function deleteBook(bookElement) {
    const bookId = bookElement.dataset.bookid; // Dapatkan ID buku dari data attribute

    // Hapus elemen buku dari DOM
    bookElement.remove();

    // Hapus data buku dari localStorage
    const books = loadBooks(); // Load books from localStorage
    const updatedBooks = books.filter(book => book.id.toString() !== bookId.toString());
    saveBooks(updatedBooks); // Save updated book list to localStorage
}

// Event listener untuk menghapus buku ketika tombol "Hapus" diklik
document.addEventListener('click', function (event) {
    if (event.target && event.target.matches('[data-testid="bookItemDeleteButton"]')) {
        const bookElement = event.target.closest('[data-testid="bookItem"]');
        if (bookElement) {
            deleteBook(bookElement);
        }
    }
});
