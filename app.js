const myLibrary = [];

const submitFormButton = document.querySelector("#submit"); 
const form = document.querySelector("form");
const libraryContainer = document.querySelector("#libraryDisplay");
let count = 0
submitFormButton.addEventListener("click", addToLibrary);


function addToLibrary(e){
    count++
//This function is meant to do everything. Create the library and display the books
    e.preventDefault();
    addBookToLibrary();
    form.reset();
    displayBooks();
    //delete functionality
    const deleteButtons = Array.from(document.querySelectorAll("#libraryDisplay div .delete"))
    deleteButtons.forEach(button => button.addEventListener('click', deleteCardElementHandeler))

    //toggle read functionality
    const toggleReadButtons = Array.from(document.querySelectorAll("#libraryDisplay div .read"))
    toggleReadButtons.forEach(button => button.addEventListener('click', toggleReadStatusHandeler))
}

function addBookToLibrary(){
//This function is meant to create the Library array from the objects that we create.
    //get the User Inputs and put it in their variables
    const bookInputs = Array.from(document.querySelectorAll("form input"));
    const statusInput = document.querySelector("form select");
    const descriptionInput = document.querySelector("form textarea");
    
    const bookTitle = bookInputs[0].value;
    const bookAuthor = bookInputs[1].value;
    const pageNumber = bookInputs[2].value;
    const statusInputValue = statusInput.value;
    const descriptionInputValue = descriptionInput.value; 

    //create the object
    let book = new Book(bookTitle, bookAuthor, pageNumber, statusInputValue, descriptionInputValue, count);

    //add object to array
    myLibrary.push(book);
}

function displayBooks(){
    const book = myLibrary[myLibrary.length - 1];
    //create card container
    const cardDiv = document.createElement('div');
    cardDiv.className = "book-card";
    cardDiv.dataset.key = count

    //create h2 book title
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    bookTitle.className = "book-card-h2";
    //create h3 author name
    const bookAuthor = document.createElement("h3");
    bookAuthor.textContent = book.author;
    bookAuthor.className = "book-card-h3";
    //create h3 page number
    const pageNumber = document.createElement("h3");
    pageNumber.textContent = `${book.pages} pages`;
    pageNumber.className = "book-card-h3";
    //create p description
    const description = document.createElement("p");
    description.textContent = book.summary;
    description.className = "book-card-p";
    //create read button
    const readButton = document.createElement("button");
    readButton.textContent = book.status;
    readButton.className = "read";
    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete book";
    deleteButton.className = "delete";

    //append all elements to the container
    cardDiv.append(bookTitle, bookAuthor, pageNumber, description, readButton,deleteButton);

    //append the container to the dom element
    libraryContainer.append(cardDiv);
};

class Book{
	constructor(title, author, pages, status, summary, data){
		this.title = title 
        this.author = author
        this.pages = pages 
        this.summary = summary
        this.status = status
        this.data = data 
	}
}

function deleteCardElementHandeler(){
    const parentElement = this.parentElement
    parentElement.remove()
}

function toggleReadStatusHandeler(){
    if (this.className === "read") {
        this.className = "unread";
        //change the textContent
        this.textContent = "Unread";
    }      
    else {
        this.className = "read";
        //change the textContent
        this.textContent = "Read";
    }  
}
