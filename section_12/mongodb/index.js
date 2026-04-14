const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/conn');

const hbs = exphbs.create({ partialsDir: ['views/partials'] });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productsRoutes = require('./routes/productsRoutes');
app.use('/products', productsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);