const chalk = require('chalk');

const grade = 4;

if (grade >= 7) {
  console.log(chalk.green('Approved!'));
} else {
  console.log(chalk.bgRed('Rejected. Try again!'));
}