const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and serve frontend files from the 'public' folder
app.use(express.json());
app.use(express.static('public')); 

// In-memory "database"
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" }
];
let nextId = 3;

// 1. GET - Display all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// 2. POST - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author required" });

    const newBook = { id: nextId++, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 3. PUT - Update book details
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    // Update the book
    books[bookIndex] = { id, title, author };
    res.json(books[bookIndex]);
});

// 4. DELETE - Delete a book
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.status(200).json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});