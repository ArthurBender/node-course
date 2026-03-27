const x = 10;
const y = "Text";
const z = [1, 2, 3];

console.log(x, y, z);

// Counting
console.count("Times called");
console.count("Times called");

// Template string
console.log(`X value is ${x}`);

// Variable on string
console.log("Y value is %s", y);

// Clean console
setTimeout(() => {
  console.clear();
}, 2000);