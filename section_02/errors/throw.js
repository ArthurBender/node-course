const x = 10;

if (!Number.isInteger(x)) {
  throw new Error("X is not an integer");
}

console.log("End");