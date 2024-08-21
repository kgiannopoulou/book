// server.js (Express application)
const express = require('express');
const app = express();
const port = 3000;

// Mock data
const books = [
  { isbn: '123', title: 'Book One', author: 'Author A' },
  { isbn: '456', title: 'Book Two', author: 'Author B' },
];

// Endpoint to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// server.js (Express application)
app.get('/books/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  res.json(book);
});
// server.js (Express application)
app.get('/books/author/:author', (req, res) => {
  const authorBooks = books.filter(b => b.author === req.params.author);
  res.json(authorBooks);
});
// server.js (Express application)
app.get('/books/title/:title', (req, res) => {
  const titleBooks = books.filter(b => b.title.includes(req.params.title));
  res.json(titleBooks);
});
// server.js (Express application)
const reviews = {
  '123': 'Great book!',
  '456': 'Interesting read.',
};

app.get('/reviews/:isbn', (req, res) => {
  const review = reviews[req.params.isbn];
  res.json({ review });
});
// server.js (Express application)
const users = []; // Array to store users

app.post('/register', express.json(), (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: 'User registered successfully!' });
});
// server.js (Express application)
app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful!', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
// server.js (Express application)
app.post('/reviews/:isbn', express.json(), (req, res) => {
  const { review } = req.body;
  reviews[req.params.isbn] = review;
  res.json({ message: 'Review added/modified successfully!' });
});
// server.js (Express application)
app.delete('/reviews/:isbn', (req, res) => {
  delete reviews[req.params.isbn];
  res.json({ message: 'Review deleted successfully!' });
});
// getBooks.js
const axios = require('axios');

async function getAllBooks() {
  try {
    const response = await axios.get('http://localhost:3000/books');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getAllBooks();
// searchByISBN.js
const axios = require('axios');

function searchByISBN(isbn) {
  return axios.get(`http://localhost:3000/books/${isbn}`);
}

searchByISBN('123').then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
// searchByAuthor.js
const axios = require('axios');

async function searchByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:3000/books/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

searchByAuthor('Author A');
// searchByTitle.js
const axios = require('axios');

async function searchByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:3000/books/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

searchByTitle('Book One');
