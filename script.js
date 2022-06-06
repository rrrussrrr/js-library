let myLibrary = [];

function Book(title, author, pages) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

}

Book.prototype.isRead = function() {

    this.read = !(this.read);
}

// adds a new book to the myLibrary array
function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages));


}

addBookToLibrary("baba", "baba", 3);
console.log(myLibrary);




