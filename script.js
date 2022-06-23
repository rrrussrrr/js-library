let myLibrary = [];
const bookDisplay = document.getElementById("books");
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalbutton");
const submitButton = document.getElementById("addbook");


//Book Object (using class now!)


class Book  {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    isRead() {
        if (this.read === false){
            this.read = true;
        } else { this.read = false;
       }
        
    }


}



///// INITIALIZATION
// if local storage is empty, add a placeholder book
if (localStorage.getItem('myLibrary') === null ) {
    addBookToLibrary("Crime and Punishment", "Fyodor Dostoyevsky", 448);
} 
// otherwise load from local storage
else {
    recall();

    // display all book cards
    for (const book in myLibrary) {
         displayBook(myLibrary[book]);
    }
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
    const newBook = new Book(title, author, pages, false);
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
        const titleText = document.createTextNode(`"` + book.title + `"`);
        bookTitle.append(titleText);
        bookCard.appendChild(bookTitle);

        //add author
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        const authorText = document.createTextNode("By: " + book.author);
        bookAuthor.append(authorText);
        bookCard.appendChild(bookAuthor);

        //add pages
        const bookPages = document.createElement("p");
        bookPages.classList.add("pages");
        const pagesText = document.createTextNode("Pages: " + book.pages);
        bookPages.append(pagesText);
        bookCard.appendChild(bookPages);

        //add read status
        const bookRead = document.createElement("p");
        bookRead.classList.add("read");
        const readText = document.createTextNode("");
        if (book.read === true) {
            bookCard.classList.add("readcard");
            readText.textContent = "Read";
        } else {
            bookCard.classList.add("unreadcard");
            readText.textContent = "Not Read";
        }
        bookRead.append(readText);
        bookCard.appendChild(bookRead);



/*         //add Read checkbox
        const readCheck = document.createElement("input");
        readCheck.classList.add("read");
        readCheck.type = "checkbox";
        readCheck.name = "readCheck";
        readCheck.value = "readCheck";
        readCheck.id = "readCheck";
        const checkLabel = document.createElement('label');
        checkLabel.htmlFor = "readCheck";
        checkLabel.appendChild(document.createTextNode('Read?'));
        bookCard.appendChild(checkLabel);
        bookCard.appendChild(readCheck); */

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

const form = document.getElementById("modalform");

form.addEventListener('submit', function(event){


        const t = event.target.elements.title.value;
        const a = event.target.elements.author.value;
        const p = event.target.elements.pages.value;
        addBookToLibrary(t, a, p);
        //displayBook();
        //store();
        modal.style.display = "none";
        form.reset();

})

//input a DOM element and get which # child it is of it's parent
function findChildNum(target) {
    return [...target.parentNode.children].indexOf(target);
}

// checking any card button clicked
document.addEventListener('click', function(event) {
    console.log(event.target);

    //if the modal is visible and click outside modal, close modal
    if (modal.style.display === "block") {
        if (event.target.classList.contains("modal")) {
            modal.style.display = "none";
        }
    }


    // if we hit a delete button
    if (event.target.classList.contains("delete")) {
        const bookCard = event.target.parentNode;
        const bookNum = findChildNum(bookCard) - 1;
        deleteBook(bookNum); //need -1 because of the addbook button being child #1
    }

    // if we toggle read status
    else if (event.target.classList.contains("read")) {
        const bookCard = event.target.parentNode;
        const bookNum = findChildNum(bookCard) - 1;
        const book = myLibrary[bookNum];

        book.isRead();

        const readText = bookCard.querySelector("p.read");
        if (book.read === true) {
            bookCard.classList.add("readcard");
            bookCard.classList.remove("unreadcard");
            readText.innerText = "Read";
        } else {
            bookCard.classList.add("unreadcard");
            bookCard.classList.remove("readcard");
            readText.innerText = "Not Read";
        }



        store();

    } else if (event.target.classList.contains("modalbutton")) {
        modal.style.display = "block";

    } 




})

//modalButton.onClick = function () {

  //  modal.style.display = "block";
//}

//submitButton.onClick = function () {

 //   modal.style.display = "none";
//}



function handleForm(event) {event.preventDefault();}
document.addEventListener('submit', handleForm);

