const PORT = 3000;
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1 style="color: red;">Hello World!</h1>');
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})