const express = require('express');
const app = express();

const port = 5000;

app.use(express.static('public'));
const router = require('./router');
app.use(router);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})