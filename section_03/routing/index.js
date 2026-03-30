const PORT = 3000;

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = q.pathname.substring(1);

  if (filename.includes('html') && fs.existsSync(filename)) {
    fs.readFile(filename, function (err, data) {
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
    fs.readFile('404.html', function (err, data) {
      if (err) {
        console.error(err);
        res.end();
        return;
      }

      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    })
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})