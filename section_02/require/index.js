const internalModule = require('./internal-module');

internalModule.sum(5, 6);

const sum = internalModule.sum;

sum(1, 2);
sum(3, 4);
