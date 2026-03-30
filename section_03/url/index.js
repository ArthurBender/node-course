const url = require('url');
const address = 'https://www.google.com.br/search?q=nodejs';

const parsedUrl = new url.URL(address);

console.log(parsedUrl);