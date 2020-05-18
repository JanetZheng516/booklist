// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book){
 const list = document.getElementById('book-list');
 // Creat tr element
 const row = document.createElement('tr');
 // Insert cols
 row.innerHTML = `
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>${book.isbn}</td>
 <td><a href="#" class="delete">X</a></td>
 `;
 list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function(message, className) {
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

// Delete Book
UI.prototype.deleteBook = function(target) {
    console.log(target);
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove(); 
    }
}

// Clear Fields 
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit',
function(e){
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
         // Success alert
          ui.showAlert('Book Added!', 'success');
         // Clear Fields 
          ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
/* we have something that's going to show up more than once with the same class or 
something that is not there when the page loads but it's dynamically added 
We're going to have to use event delegation */

document.getElementById('book-list').addEventListener
('click', function(e){
    // Instantiate UI
    const ui = new UI ();
    // Delete book
    ui.deleteBook(e.target);
    // Success alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
})