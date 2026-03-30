const PORT = 3000;

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('message.html', function (err, data) {
    if (err) {
      console.error(err);
      res.end();
      return;
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})