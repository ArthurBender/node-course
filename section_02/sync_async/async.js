const fs = require('fs');

console.log("Start");

fs.writeFile('text.txt', 'Hello World!', () => {
  setTimeout(() => {
    console.log("Actual End");
  }, 3000);
})

console.log("End");