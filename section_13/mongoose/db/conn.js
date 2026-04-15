const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/node_mongoose');
  console.log('Connected successfully to MongoDB.');
}

main().catch(err => console.error(err));

module.exports = mongoose;