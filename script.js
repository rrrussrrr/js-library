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

// 
function displayBooks() {
    const bookDisplay = document.getElementById("books");
    for (const book in myLibrary) {
        //create new bookCard for each book in myLibrary
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");


        //add information to the card

        //adding title
        const bookTitle = document.createElement("p");
        bookTitle.classList.add("title");
        const titleText = document.createTextNode(myLibrary[book].title);
        bookTitle.append(titleText);
        bookCard.appendChild(bookTitle);





        // add finished card to display container
        bookDisplay.appendChild(bookCard);
    }


}

addBookToLibrary("baba", "baba", 3);
addBookToLibrary("bff", "fa", 3);
addBookToLibrary("fba", "bfffffba", 6);




