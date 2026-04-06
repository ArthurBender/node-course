const express = require('express');
const app = express();

const port = 3000;

const path = require('path');
const basePath = path.join(__dirname, 'templates');

const checkAuth = function (req, res, next) {
  req.authStatus = false;

  if (req.authStatus) {
    console.log("The user is logged in!");
  } else {
    console.log("The user is not logged in!");
  }

  next();
}

// app.use(checkAuth);

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static middleware
app.use(express.static('public'));

const usersRouter = require('./users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.use(function (req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})