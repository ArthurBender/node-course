//--------------- MODULES -----------------
const inquirer = require('inquirer');
const chalk = require('chalk');

const fs = require('fs');

//---------------- CALL -------------------

operation();

//------------- OPERATIONS ----------------

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: "What do you want to do?",
      choices: [
        { name: 'Create Account', value: 'create' },
        { name: 'Check Balance', value: 'check' },
        { name: 'Deposit to Account', value: 'deposit' },
        { name: 'Withdraw from Account', value: 'withdraw' },
        { name: 'Delete Account', value: 'delete' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]).then((answer) => {
    const choice = answer.operation;

    switch (choice) {
      case 'create':
        createAccount();
        break;
      case 'check':
        checkAccount();
        break;
      case 'deposit':
        deposit();
        break;
      case 'withdraw':
        withdraw();
        break;
      case 'delete':
        deleteAccount();
        break;
      case 'exit':
        console.log(chalk.bgBlue("Have a nice day!"));
        process.exit();
    }
  }).catch(err => console.error(err));
}

function createAccount() {
  console.log(chalk.yellow("For creating an account, please fill the form below:"));

  inquirer.prompt([
    {
      name: 'name',
      message: "What's the name of the account holder?"
    }
  ]).then((answer) => {
    const name = answer.name;

    if (checkAccountExists(name)) {
      console.log(chalk.bgRed("Account already exists. Please choose another name."));
      operation();
    } else {
      fs.writeFileSync(`accounts/${name}.json`, '{"balance": 0}');

      console.log(chalk.bgGreen("Account created successfully."));
      operation();
    }

  }).catch(err => console.error(err));
}

function checkAccount() {
  selectAccount().then(({ name, data }) => {
    if (name && data) {
      console.log(chalk.bgGreen(`${name}'s account balance: $${data.balance}`));
    }

    operation();
  })
}

function deposit () {
  selectAccount().then(({ name, data }) => {
    if (name && data) {
      inquirer.prompt([
        {
          name: 'amount',
          message: "How much do you want to deposit?"
        }
      ]).then((answer) => {
        const amount = parseFloat(answer.amount);

        if (Number.isNaN(amount)) {
          console.log(chalk.bgRed("Invalid amount."));
        } else {
          data.balance = parseFloat(data.balance) + amount;
          fs.writeFileSync(`accounts/${name}.json`, JSON.stringify(data));

          console.log(chalk.bgGreen(`Successfully deposited $${amount} to ${name}'s account. Total balance is now: $${data.balance}`));
        }

        operation();
      }).catch(err => console.error(err));
    } else {
      operation();
    }
  })
}

function withdraw () {
  selectAccount().then(({ name, data }) => {
    if (name && data) {
      inquirer.prompt([
        {
          name: 'amount',
          message: "How much do you want to withdraw?"
        }
      ]).then((answer) => {
        const amount = parseFloat(answer.amount);

        if (Number.isNaN(amount)) {
          console.log(chalk.bgRed("Invalid amount."));
        } else if (amount > parseFloat(data.balance)) {
          console.log(chalk.bgRed("Insufficient balance."));
        } else {
          data.balance = parseInt(data.balance) - amount;
          fs.writeFileSync(`accounts/${name}.json`, JSON.stringify(data));

          console.log(chalk.bgGreen(`Successfully withdrew $${amount} from ${name}'s account. Total balance is now: $${data.balance}`));
        }

        operation();
      }).catch(err => console.error(err));
    } else {
      operation();
    }
  })
}

function deleteAccount () {
  selectAccount().then(({ name, data }) => {
    if (name && data) {
      inquirer.prompt([
        {
          name: 'confirm',
          message: "Are you sure you want to delete this account? This action cannot be undone.",
          type: 'confirm'
        }
      ]).then((answer) => {
        if (answer.confirm) {
          fs.rmSync(`accounts/${name}.json`);
  
          console.log(chalk.bgGreen(`Successfully deleted ${name}'s account. The remaining balance of $${data.balance} will be withdrawn.`));
        }
  
        operation();
      }).catch(err => console.error(err));
    } else {
      operation();
    }
  })
}

//--------------- HELPERS -----------------

function checkAccountExists(name) {
  if (!fs.existsSync('accounts')) fs.mkdirSync('accounts');

  if (!fs.existsSync(`accounts/${name}.json`)) {
    return false;
  } else {
    return true;
  }
}

function selectAccount() {
  return inquirer.prompt([
    {
      name: 'name',
      message: "Please provide the name of the account holder."
    }
  ]).then((answer) => {
    const name = answer.name;

    if (!checkAccountExists(name)) {
      console.log(chalk.bgRed("Account not found. Please choose another name or create a new account."));

      return {name: name, data: null};
    } else {
      const account = JSON.parse(fs.readFileSync(`accounts/${name}.json`, {encoding: 'utf-8', flag: 'r'}));

      return {name: name, data: account};
    }
  }).catch(err => console.error(err));
}
