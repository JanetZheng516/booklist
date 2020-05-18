class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Creat tr element
        const row = document.createElement('tr');
        // Insert cols   
        // If you want to add function "number of book in your list"  <td>(${book.copies || 1}) ${book.title}</td>
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove(); 
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

function compareBooks(book1, book2) {
    return book1.title === book2.title && book1.author === book2.author && book1.isbn === book2.isbn;
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        // const uniqueBooks = [];

        // for (let i = 0; i < books.length; i++) {
        //     const book1 = books[i];
        //     book1.id = book1.title + book1.author + book1.isbn;
        //     book1.copies = 0;

        //     // compare with other books
        //     for (let j = 0; j < books.length; j++) {
        //         const book2 = books[j];

        //         if (compareBooks(book1, book2)) {
        //             book1.copies++;
        //         }
        //     }

        //     // add as unique book
        //     const hasBook = uniqueBooks.find(book => book.id === book1.id);
        //     if (!hasBook) {
        //         uniqueBooks.push(book1);
        //     }
        // }

        // Instantiate UI
        const ui = new UI ();

        // uniqueBooks.forEach(function(book){
        //     ui.addBookToList(book);
        
        books.forEach(function(book){
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
           if(book.isbn === isbn) {
               books.splice(index, 1);
           }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event Listeners
document.getElementById('book-form').addEventListener('submit',
function(e){
    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    // Instantiate Book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI ();
    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
         // Add book to list
          ui.addBookToList(book);
         // Add book to local storage
         Store.addBook(book);
         // Success alert
          ui.showAlert('Book Added!', 'success');
         // Clear Fields 
          ui.clearFields();
    }

});

document.getElementById('book-list').addEventListener
('click', function(e){
    e.preventDefault();
    // Instantiate UI
    const ui = new UI ();
    // Delete book
    ui.deleteBook(e.target);
    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Success alert
    ui.showAlert('Book Removed!', 'success');

})