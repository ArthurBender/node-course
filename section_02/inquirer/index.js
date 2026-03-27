const inquirer = require('inquirer');

inquirer.prompt([
  { name: 'grade1', message: "What's your first grade?" },
  { name: 'grade2', message: "What's your second grade?" },
]).then((answers) => {
  const average = (parseInt(answers.grade1) + parseInt(answers.grade2)) / 2;

  console.log(`Your average is ${average}`);
}).catch(err => console.error(err));