const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/";
const DATABASE_NAME = "olx_clone";

async function main() {
  await mongoose.connect(MONGODB_URI + DATABASE_NAME);

  console.log("Connected to MongoDB successfully!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
