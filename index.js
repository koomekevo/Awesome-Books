/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }
}

class Library {
  constructor() {
    this.data = [];
  }

  addBook(book) {
    this.data.concat(book);
    localStorage.setItem('library', JSON.stringify(this.data));
    Display.addToUI(book);
  }

  removeBook(id) {
    const book = document.getElementById(id);
    book.remove();
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('library', JSON.stringify(this.data));
  }
}

const library = new Library();

class Input {
  static getInput() {
    const title = document.getElementById('bookTitle');
    const author = document.getElementById('bookAuthor');
    const book = new Book(title.value, author.value);
    title.value = '';
    author.value = '';
    return book;
  }
}

class Display {
  static addToUI(bookObj) {
    const bookList = document.getElementById('book-list');
    const book = document.createElement('LI');
    book.setAttribute('id', bookObj.id);
    book.innerHTML = `<h3>"${bookObj.title}" by ${bookObj.author}</h3>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove';
    deleteBtn.addEventListener('click', () => library.removeBook(bookObj.id));
    book.appendChild(deleteBtn);
    bookList.appendChild(book);
  }
}

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const book = Input.getInput();
  library.addBook(book);
});

window.onload = () => {
  library.data = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library.data === null) {
    library.data = [];
    return;
  }

  library.data.forEach((book) => Display.addToUI(book));
};