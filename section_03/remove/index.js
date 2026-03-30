const fs = require('fs');

fs.unlink('file.txt', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('File removed successfully!');
})