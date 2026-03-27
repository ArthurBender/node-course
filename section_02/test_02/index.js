const inquirer = require('inquirer');
const chalk = require('chalk');

function print(text, error = false) {
  if (error) {
    console.log(chalk.bgRed(text));
  } else {
    console.log(chalk.bgYellow.black(text));
  }
}

inquirer.prompt([
  {name: "name", message: "What's your name?"},
  {name: "age", message: "What's your age?"},
]).then((answers) => {
  if (answers.name == "" || answers.age == "") {
    print("Name and age are required.", true);
  } else if (Number.isNaN(parseInt(answers.age))) {
    print("Age must be an integer number.", true);
  } else {
    print(`User ${answers.name} is ${answers.age} years old.`);
  }
}).catch(err => print(err, true));