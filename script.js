let myLibrary = [];
const bookDisplay = document.getElementById("books");

///// INITIALIZATION
// if local storage is empty, add a placeholder book
if (localStorage.getItem('myLibrary') === null ) {
    addBookToLibrary("Crime and Punishment", "Fyodor Dostoyevsky", 448);
} 
// otherwise load from local storage
else {
    recall();
}
    // display all book cards
for (const book in myLibrary) {
    displayBook(myLibrary[book]);
}

///// END INIT


//// FUNCTIONS

// Function to store myLibrary to localStorage
function store(){
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

// Function to recall myLibrary from localStorage
function recall(){
    console.log(myLibrary);
    console.log(window.localStorage.getItem('myLibrary'));
    myLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));
    console.log(myLibrary);
}

//Book Object
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
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    // store in local storage
    store();
    // display the new book
    displayBook(newBook);
}

// delete a card by finding the n'th child
function deleteBook(n){
    if (bookDisplay.firstChild) {
    let cards = document.querySelectorAll('.bookCard');
    myLibrary.splice(n, 1);
    store();
    cards[n].remove();
    }

}

// Adds a book to the display with book from myLibrary[] as argument 
function displayBook(book) {

    //first delete all child divs from bookDisplay
    //while (bookDisplay.firstChild) {
     //   bookDisplay.removeChild(bookDisplay.firstChild);
   // }

        //create new bookCard for each book in myLibrary
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        
        // add data-booknum attribute corresponding to array item #
        //bookCard.dataset.booknum = book;

        //add information to the card

        //add title
        const bookTitle = document.createElement("p");
        bookTitle.classList.add("title");
        const titleText = document.createTextNode(book.title);
        bookTitle.append(titleText);
        bookCard.appendChild(bookTitle);

        //add author
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        const authorText = document.createTextNode(book.author);
        bookAuthor.append(authorText);
        bookCard.appendChild(bookAuthor);

        //add pages
        const bookPages = document.createElement("p");
        bookPages.classList.add("pages");
        const pagesText = document.createTextNode(book.pages);
        bookPages.append(pagesText);
        bookCard.appendChild(bookPages);

        //add read status
        const bookRead = document.createElement("p");
        bookRead.classList.add("read");
        const readText = document.createTextNode(book.read);
        bookRead.append(readText);
        bookCard.appendChild(bookRead);

        //add delete button
        const delButton = document.createElement("p");
        delButton.classList.add("delete");
        const delText = document.createTextNode("X");
        delButton.append(delText);
        bookCard.appendChild(delButton);

        // add finished card to display container
        bookDisplay.appendChild(bookCard);
    //}


}

const form = document.getElementById("form");

form.addEventListener('submit', function(event){


        const t = event.target.elements.title.value;
        const a = event.target.elements.author.value;
        const p = event.target.elements.pages.value;
        addBookToLibrary(t, a, p);
        //displayBook();
        //store();


})





//function handleForm(event) {event.preventDefault();}
//document.addEventListener('submit', handleForm);

