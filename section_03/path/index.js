const path = require('path');

const customPath = "/home/user/projects/file.pdf";

console.log(path.dirname(customPath));
console.log(path.basename(customPath));
console.log(path.extname(customPath));



console.log(path.resolve("test.txt"));
const midFolder = "files"
const filename = "file.txt"

console.log(path.join("/", "home", midFolder, filename));