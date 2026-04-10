const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const Task = require('./models/Task');

const app = express();
const hbs = exphbs.create({partialsDir: ['views/partials']});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks',taskRoutes);

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));