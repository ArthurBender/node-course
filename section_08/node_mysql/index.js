const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const app = express();
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/books/delete/:id', (req, res) => {
  const sql = "DELETE FROM books WHERE ?? = ?";
  const data = ['id', req.params.id];

  pool.query(sql, data, (err, data) => {
    if (err) throw err;
    res.redirect('/books');
  })
})

app.post('/books/update/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const pages = req.body.pages;

  const sql = "UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?";
  const data = ['title', title, 'pages', pages, 'id', id];

  pool.query(sql, data, (err, data) => {
    if (err) throw err;
    res.redirect('/books');
  })
});

app.get('/books/edit/:id', (req, res) => {
  const sql = "SELECT * FROM books WHERE ?? = ?";
  const data = ['id', req.params.id];

  pool.query(sql, data, (err, data) => {
    if (err) throw err;
    else if (data.length == 0) throw new Error('Book not found');
    res.render('book-edit', { book: data[0] });
  })
});

app.get('/books/:id', (req, res) => {
  const sql = "SELECT * FROM books WHERE ?? = ?";
  const data = ['id', req.params.id];

  pool.query(sql, data, (err, data) => {
    if (err) throw err;
    else if (data.length == 0) throw new Error('Book not found');
    res.render('book', { book: data[0] });
  })
});

app.get('/books', (req, res) => {
  const sql = "SELECT * FROM books";
  pool.query(sql, (err, data) => {
    if (err) throw err;
    res.render('books', { books: data });
  })
});

app.post('/books', (req, res) => {
  const title = req.body.title;
  const pages = req.body.pages;

  const sql = "INSERT INTO books (??, ??) VALUES (?, ?)";
  const data = ["title", "pages", title, pages];

  pool.query(sql, data, (err) => {
    if (err) throw err;
    res.redirect('/books');
  })
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});