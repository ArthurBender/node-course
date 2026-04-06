const express = require('express');
const router = express();

const path = require('path');
const basePath = path.join(__dirname, '../pages');

router.get('/like', (req, res) => {
  res.sendFile(`${basePath}/like.html`)
})

router.get('/dislike', (req, res) => {
  res.sendFile(`${basePath}/dislike.html`)
})

router.get('/', (req, res) => {
  res.sendFile(`${basePath}/home.html`)
})

router.use(function (req, res, next) {
  res.status(404).send('Page not found.')
})

module.exports = router;