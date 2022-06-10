let myLibrary = [];
const bookDisplay = document.getElementById("books");

//Book Object
function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.isRead = function() {
    console.log("here");
    if (this.read === "Unread"){
        this.read = "Read!"
    } else { this.read = "Unread";
   }
};

lebook = new Book ("a", "b", 10);

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


    const objects = JSON.parse(window.localStorage.getItem('myLibrary'));
    for (let element of objects){
        if(element !== null) {
            myLibrary.push( new Book(element.title, element.author, element.pages, element.read));
        }

    }
}



// adds a new book to the myLibrary array
function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages, "Unread");
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

//input a DOM element and get which # child it is of it's parent
function findChildNum(target) {
    return [...target.parentNode.children].indexOf(target);
}

// checking any card button clicked
document.addEventListener('click', function(event) {

    // if we hit a delete button
    if (event.target.classList.contains("delete")) {
        const bookCard = event.target.parentNode;
        const bookNum = findChildNum(bookCard);
        deleteBook(bookNum);
    }

    // if we toggle read status
    else if (event.target.classList.contains("read")) {
        const bookCard = event.target.parentNode;
        const bookNum = findChildNum(bookCard);
        const book = myLibrary[bookNum];
       console.log(myLibrary[bookNum].read)
        book.isRead();
        console.log(myLibrary[bookNum].read)
        const readText = bookCard.querySelector("p.read");
        readText.innerText = book.read;
        console.log(myLibrary)
        store();

    }




})





//function handleForm(event) {event.preventDefault();}
//document.addEventListener('submit', handleForm);

