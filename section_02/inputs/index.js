const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("What's your favorite programming language?\n", language => {
  switch (language) {
    case 'Ruby':
      console.log("Sheeesh dog, Ruby is indeed the best!");
      break;
    case 'Java':
      console.log("Call 911, we have a psychopath here!");
      break;
    case 'Python':
      console.log("Good choice!");
      break;
    default:
      console.log(`User's favorite programming language is ${language}`);
  }

  readline.close();
})