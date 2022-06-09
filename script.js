let myLibrary = [];

//if local storage is empty, add a placeholder book
if (localStorage.getItem('myLibrary') === null ) {
    addBookToLibrary("baba", "baba", 3);
} 
// otherwise load from local storage
else {
    recall();
}

    displayBooks();

// store myLibrary to localStorage
function store(){
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

//recall myLibrary from localStorage
function recall(){
    console.log(myLibrary);
    console.log(window.localStorage.getItem('myLibrary'));
    myLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));
    console.log(myLibrary);
}

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
    // store in local storage
    store();
}

// 
function displayBooks() {
    const bookDisplay = document.getElementById("books");

    //first delete all child divs from bookDisplay
    while (bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.firstChild);
    }
    for (const book in myLibrary) {
        //create new bookCard for each book in myLibrary
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        // add data-booknum attribute corresponding to array item #
        bookCard.dataset.booknum = book;

        //add information to the card

        //add title
        const bookTitle = document.createElement("p");
        bookTitle.classList.add("title");
        const titleText = document.createTextNode(myLibrary[book].title);
        bookTitle.append(titleText);
        bookCard.appendChild(bookTitle);

        //add author
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        const authorText = document.createTextNode(myLibrary[book].author);
        bookAuthor.append(authorText);
        bookCard.appendChild(bookAuthor);

        //add pages
        const bookPages = document.createElement("p");
        bookPages.classList.add("pages");
        const pagesText = document.createTextNode(myLibrary[book].pages);
        bookPages.append(pagesText);
        bookCard.appendChild(bookPages);

        //add read status
        const bookRead = document.createElement("p");
        bookRead.classList.add("read");
        const readText = document.createTextNode(myLibrary[book].read);
        bookRead.append(readText);
        bookCard.appendChild(bookRead);

        // add finished card to display container
        bookDisplay.appendChild(bookCard);
    }


}

const form = document.getElementById("form");

form.addEventListener('submit', function(event){


        const t = event.target.elements.title.value;
        const a = event.target.elements.author.value;
        const p = event.target.elements.pages.value;
        addBookToLibrary(t, a, p);
        displayBooks();
        //store();


})





function handleForm(event) {event.preventDefault();}
document.addEventListener('submit', handleForm);


let lol = JSON.stringify(myLibrary);
let lolol = JSON.parse(lol);
console.log(lolol);


