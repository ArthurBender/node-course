const express = require('express');
const router = express();

const path = require('path');
const basePath = path.join(__dirname, '../templates');

router.get('/new', (req, res) => {
  res.sendFile(`${basePath}/form.html`)
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`Looking for user: ${id}`);

  res.sendFile(`${basePath}/user.html`)
})

router.post('/', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  console.log(`Name: ${name}, Age: ${age}`);

  res.redirect('/users/1');
})

module.exports = router;