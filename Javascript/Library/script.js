const addBtn = document.getElementById('add__book');
const modal = document.getElementById('modal');
const addBook = document.getElementById('submit');
const bookList = document.querySelector('.book__list');
const closeBtn = document.querySelector('.close__modal');
addBtn.addEventListener('click', () => {
        modal.classList.toggle('hidden');
}    
);

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!modal.classList.contains('hidden')){
        closeModal();
    }
})

let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');

addBook.addEventListener('click', (e) => {
    if(title.checkValidity() && author.checkValidity() && pages.checkValidity()){
        e.preventDefault();
        let book = new Book(title.value, author.value, pages.value, read.checked);
        myLibrary.push(book);
        addBookToLibrary(book);
        closeModal();
    }
})

let myLibrary = [];

//adding the two books created directly in HTML
// myLibrary.push(new Book('Example not read', 'Me from HTML ofc', '123', false));
// myLibrary.push(new Book('Example read', 'Still me from HTML dyde', '321', true));

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(book) {
    //create book div component
    let deleteField = document.createElement('button');
    deleteField.classList.add('book__delete');
    deleteField.textContent = '🗑️'
    deleteField.addEventListener('click', (e) => deleteBook(e));
    let titleField = document.createElement('p');
    titleField.classList.add('book__data')
    titleField.classList.add('title');
    titleField.textContent = `Title: ${book.title}`;
    let authorField = document.createElement('p');
    authorField.classList.add('book__data')
    authorField.classList.add('author');
    authorField.textContent = `Author: ${book.author}`;
    let pagesField = document.createElement('p');
    pagesField.classList.add('book__data')
    pagesField.classList.add('pages');
    pagesField.textContent = `Pages: ${book.pages}`;
    let readField = document.createElement('button');
    readField.classList.add('book__read');
    if(book.read)
        readField.classList.add('read');
    readField.textContent = `${book.read ? 'Read' : 'Not read'}`;
    let bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-index', myLibrary.length-1);
    bookElement.appendChild(deleteField);
    bookElement.appendChild(titleField);
    bookElement.appendChild(authorField);
    bookElement.appendChild(pagesField);
    bookElement.appendChild(readField);


    readField.addEventListener('click', (e) => toggleRead(e));
    bookList.appendChild(bookElement);
}

function closeModal(){
    title.value = '';
    author.value = '';
    pages.value = 10;
    read.checked = false;
    modal.classList.add('hidden')
}

function toggleRead(e){
    console.log(myLibrary[e.target.parentNode.getAttribute('data-index')]);
    console.log(e.target.parentNode.getAttribute('data-index'));
    myLibrary[e.target.parentNode.getAttribute('data-index')].read = !myLibrary[e.target.parentNode.getAttribute('data-index')].read;
    e.target.classList.toggle('read');
    if(myLibrary[e.target.parentNode.getAttribute('data-index')].read){
        e.target.textContent = 'Read';
    }
    else{
        e.target.textContent = 'Not read';
    }
}


function deleteBook(e){
    myLibrary.splice(e.target.parentNode.getAttribute('data-index'),1);
    e.target.parentNode.remove();
    
    let books = bookList.children;
    for (let i = e.target.parentNode.getAttribute('data-index'); i < books.length; i++) {
        books[i].setAttribute('data-index', books[i].getAttribute('data-index')-1);
        console.log(books[i].getAttribute('data-index'));
      }
}