const fs = require('fs');

console.log("Start.")

fs.writeFileSync('text.txt', 'Hello World!');

console.log("End.")