/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }
}

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
    const book = document.createElement('li');
    book.setAttribute('id', bookObj.id);
    book.innerHTML = `<h3>"${bookObj.title}" by ${bookObj.author}</h3>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove');
    deleteBtn.innerHTML = 'Remove';
    deleteBtn.addEventListener('click', () => library.removeBook(bookObj.id));
    book.appendChild(deleteBtn);
    bookList.appendChild(book);
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
const currentDate = document.getElementById('date');
currentDate.innerHTML = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_FULL);

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

function displaySection(section) {
  const sectionList = document.getElementById('list');
  const sectionForm = document.getElementById('form');
  const sectionContact = document.getElementById('contact');
  const heading = document.getElementById('title');

  switch (section) {
    case 'list':
      sectionList.style.display = 'block';
      sectionForm.style.display = 'none';
      sectionContact.style.display = 'none';
      heading.innerHTML = 'Awesome Books List';
      break;

    case 'form':
      sectionList.style.display = 'none';
      sectionForm.style.display = 'block';
      sectionContact.style.display = 'none';
      heading.innerHTML = 'Add New Book';
      break;

    case 'contact':
      sectionList.style.display = 'none';
      sectionForm.style.display = 'none';
      sectionContact.style.display = 'block';
      heading.innerHTML = 'Contact Information';
      break;

    default: break;
  }
}