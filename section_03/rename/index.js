const fs = require('fs');

fs.rename('file.txt', 'new-file.txt', (err) => {
  if (err) {
    console.error(err);
    return;
  }
})

console.log('File renamed successfully!');