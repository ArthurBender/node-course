const minimist = require('minimist');
const sum = require('./sum').sum;

const args = minimist(process.argv.slice(2));

const a = parseInt(args.a);
const b = parseInt(args.b);

if (isNaN(a) || isNaN(b)) {
  console.error('Usage: node index.js --a=<number> --b=<number>');
} else {
  sum(a, b);
}
