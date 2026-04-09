const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const app = express();
const hbs = exphbs.create({partialsDir: ['views/partials']});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require('./models/User');
const Address = require('./models/Address');

app.get('/users/edit/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { raw: true });

  if (!user) {
    throw new Error('User not found');
  }

  res.render('users/edit', { user });
})

app.post('/users/update/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  const enabledNewsletter = req.body.enabledNewsletter === 'on';

  await User.update({ name, occupation, enabledNewsletter }, { where: { id } });
  res.redirect('/users');
})

app.get('/users/new', (req, res) => {
  res.render('users/new', { user: { enabledNewsletter: true } });
})

app.post('/users/create', async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const enabledNewsletter = req.body.enabledNewsletter === 'on';

  await User.create({ name, occupation, enabledNewsletter });
  res.redirect('/users');
})

app.post('/addresses/create', async (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  await Address.create({ street, number, city, UserId });
  res.redirect(`/users/${UserId}`);
})

app.get('/users/delete/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.redirect('/users');
})

app.get('/addresses/delete/:id', async (req, res) => {
  const address = await Address.findOne({ where: { id: req.params.id } });

  if (!address) {
    throw new Error('Address not found');
  }

  const UserId = address.UserId;
  await Address.destroy({ where: { id: req.params.id } });
  res.redirect(`/users/${UserId}`);
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id}, include: Address });

  if (!user) {
    throw new Error('User not found');
  }

  res.render('users/show', { user: user.get({ plain: true }) });
})

app.get('/users', async (req, res) => {
  const users = await User.findAll({ raw: true });

  res.render('users/index', { users });
})

app.get('/', (req, res) => {
  res.render('home');
});

conn
  .sync()
  // .sync({ force: true }) // deletes all data
  .then(() => {
  app.listen(3000);
}).catch(err => console.error(err));