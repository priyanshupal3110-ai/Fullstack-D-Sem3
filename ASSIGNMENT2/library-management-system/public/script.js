const API_URL = '/api/books';

// DOM Elements
const form = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const bookIdInput = document.getElementById('book-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const booksContainer = document.getElementById('books-container');

// Load books on startup (GET Method)
document.addEventListener('DOMContentLoaded', fetchBooks);

// Function to Fetch and Display all books (GET)
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Function to Render books to the UI
function renderBooks(books) {
    booksContainer.innerHTML = '';
    
    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No books available. Add one above!</p>';
        return;
    }

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <div class="card-actions">
                <button class="btn edit-btn" onclick="startEdit(${book.id}, '${book.title.replace(/'/g, "\\'")}', '${book.author.replace(/'/g, "\\'")}')">Edit</button>
                <button class="btn delete-btn" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        `;
        booksContainer.appendChild(card);
    });
}

// Handle Form Submission (POST or PUT)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const id = bookIdInput.value;
    const bookData = {
        title: titleInput.value,
        author: authorInput.value
    };

    if (id) {
        // ID exists, so UPDATE (PUT Method)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
    } else {
        // No ID, so CREATE (POST Method)
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
    }

    resetForm();
    fetchBooks(); // Refresh the list
});

// Function to Delete a book (DELETE Method)
async function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchBooks(); // Refresh the list
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
}

// Setup Form for Editing
function startEdit(id, title, author) {
    bookIdInput.value = id;
    titleInput.value = title;
    authorInput.value = author;
    
    formTitle.textContent = "Update Book Details";
    submitBtn.textContent = "Update Book";
    cancelBtn.classList.remove('hidden');
    
    // Scroll smoothly to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset Form to Default State
function resetForm() {
    form.reset();
    bookIdInput.value = '';
    formTitle.textContent = "Add a New Book";
    submitBtn.textContent = "Add Book";
    cancelBtn.classList.add('hidden');
}

// Cancel Edit Button Logic
cancelBtn.addEventListener('click', resetForm);