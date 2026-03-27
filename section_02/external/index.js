const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const nameArg = args.name;
const ageArg = args.age;

if (!nameArg || !ageArg) {
  console.error('Usage: node index.js --name=<name> --age=<age>');
} else {
  console.log(`User ${nameArg} is ${ageArg} years old.`);
}
