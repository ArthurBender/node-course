const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  partialsDir: ['views/partials']
});

const app = express();
app.use(express.static('public'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const port = 3000;

app.get('/dashboard', (req, res) => {
  const approved = true;

  const items = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
    { id: 4, name: 'Item 4', price: 40 },
    { id: 5, name: 'Item 5', price: 50 },
  ]

  res.render('dashboard', { approved, items });
});


app.get('/', (req, res) => {
  const user = {
    name: 'John',
    surname: 'Doe',
    age: 30
  }

  const authStatus = true;

  res.render('home', { user, authStatus });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});