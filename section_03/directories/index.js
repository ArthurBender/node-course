const fs = require('fs');

if (!fs.existsSync('new-directory')) {
  console.log("Directory doesn't exist, creating...");
  fs.mkdirSync('new-directory');
} else if (fs.existsSync('new-directory')) {
  console.log("Directory already exists!");
}