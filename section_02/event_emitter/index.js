const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
  console.log('Starting...');
});

console.log("---------")

eventEmitter.emit('start');

console.log("---------")