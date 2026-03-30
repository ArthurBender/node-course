const PORT = 3000;

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;


  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  if (name) {
    res.end(`<h1 style="color: red;">Hello <b>${name}</b>!</h1>`);
    return;
  } else {
    res.end(`
      <h1>Fill in your name: </h1>
      <form method="GET">
        <input type="text" name="name">
        <button type="submit">Send</button>
      </form>
    `);
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})