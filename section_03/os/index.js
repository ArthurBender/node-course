const os = require('os');

console.log(os.cpus().length);
console.log(os.freemem() / 1024 / 1024 / 1024);
console.log(os.homedir());
console.log(os.type());
console.log(os.machine())