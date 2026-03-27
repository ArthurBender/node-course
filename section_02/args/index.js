// Call with node index.js --name=<name> --age=<age>

const args = process.argv.slice(2)

const nameArg = args[0].split('=')[1]
const ageArg = args[1].split('=')[1]

console.log(`User ${nameArg} is ${ageArg} years old.`);