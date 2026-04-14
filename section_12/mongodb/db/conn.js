const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/node_mongodb';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB.');
  } catch (err) {
    console.error(err);
  }
}

run();

module.exports = client;