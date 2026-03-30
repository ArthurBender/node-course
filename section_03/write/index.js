const PORT = 3000;

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile('index.html', function (err, data) {
      if (err) {
        console.error(err);
        res.end();
        return;
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    })
  } else {
    fs.writeFile('name.txt', name, () => {
      res.writeHead(302, {'Location': '/'});
      res.end();
    })
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})