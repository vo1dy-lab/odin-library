"use strict"

const htmlBooks = document.querySelector(".books");
const htmlBookOverlayBtn = document.querySelector("#book-overlay-btn");
const htmlAddBookBtn = document.querySelector("#add-book-btn");
const htmlOverlay = document.querySelector("dialog");

const htmlInputTitle = document.querySelector("#title");
const htmlInputAuthor = document.querySelector("#author");
const htmlInputPages = document.querySelector("#pages");
const htmlInputReadStatus = document.querySelector("#isread");

let myLibrary = []

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(event) {
    const bookTitle = htmlInputTitle.value;
    const bookAuthor = htmlInputAuthor.value;
    const bookPages = htmlInputPages.value;
    const bookReadStatus = htmlInputReadStatus.checked;

    event.preventDefault();
    myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookReadStatus));

    booksRender();
    document.querySelector("form").reset();
}

function booksRender() {
    clearBooks();

    for (let book of myLibrary) {
        const htmlBook = document.createElement("div");
        htmlBook.dataset.id = book.id;

        const htmlAuthorContainer = document.createElement("div");
        htmlAuthorContainer.classList.add("book-content");
        const htmlPagesContainer = document.createElement("div");
        htmlPagesContainer.classList.add("book-content");
        const htmlReadContainer = document.createElement("div");
        htmlReadContainer.classList.add("book-content");

        const htmlBookTitle = document.createElement("h2");
        const htmlBookAuthorHeader = document.createElement("h3");
        htmlBookAuthorHeader.textContent = "Author:";
        const htmlBookAuthorContent = document.createElement("p");

        const htmlBookPagesHeader = document.createElement("h3");
        htmlBookPagesHeader.textContent = "Pages:";
        const htmlBookPagesContent = document.createElement("p");

        const htmlBookStatusHeader = document.createElement("h3");
        htmlBookStatusHeader.textContent = "Read status:";
        const htmlBookStatusContent = document.createElement("p");

        const htmlBookLine = document.createElement("hr");
        const htmlBookReadBtn = document.createElement("button");
        const htmlBookDelBtn = document.createElement("button");
        htmlBookDelBtn.textContent = "Delete";

        htmlBook.classList.add("book");

        htmlBookTitle.textContent = book.title;
        htmlBookAuthorContent.textContent = book.author;
        htmlBookPagesContent.textContent = book.pages;
        htmlBookStatusContent.textContent = book.isRead ? "Read" : "Not read yet";

        htmlBook.appendChild(htmlBookTitle);
        htmlBook.appendChild(htmlBookLine);

        htmlAuthorContainer.appendChild(htmlBookAuthorHeader);
        htmlAuthorContainer.appendChild(htmlBookAuthorContent);
        htmlBook.appendChild(htmlAuthorContainer);

        htmlPagesContainer.appendChild(htmlBookPagesHeader);
        htmlPagesContainer.appendChild(htmlBookPagesContent);
        htmlBook.appendChild(htmlPagesContainer);

        htmlReadContainer.appendChild(htmlBookStatusHeader);
        htmlReadContainer.appendChild(htmlBookStatusContent);
        htmlBook.appendChild(htmlReadContainer);

        htmlBookReadBtn.textContent = book.isRead ? "Unread" : "Read";
        htmlBook.appendChild(htmlBookReadBtn);
        htmlBookReadBtn.addEventListener('click', changeReadStatus);


        htmlBook.appendChild(htmlBookDelBtn);
        htmlBookDelBtn.addEventListener('click', removeBook);
        htmlBooks.appendChild(htmlBook);

    }
}

function clearBooks() {
    while (htmlBooks.firstChild) {
        htmlBooks.removeChild(htmlBooks.lastChild);
    }
}

function removeBook(event) {
    const target = event.target.closest(".book");

    myLibrary = myLibrary.filter((book) => book.id !== target.dataset.id);
    booksRender();
}

function changeReadStatus(event) {
    const target = event.target.closest(".book");
    const book = myLibrary.find((book) => book.id === target.dataset.id);

    book.isRead = !book.isRead;
    booksRender();
}

htmlBookOverlayBtn.onclick = () => htmlOverlay.show();
htmlOverlay.addEventListener('click', (e) => {
    if (e.target.className === "overlay") htmlOverlay.close();
})

htmlAddBookBtn.addEventListener('click', addBookToLibrary);