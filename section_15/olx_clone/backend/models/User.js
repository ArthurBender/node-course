const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: String,
      required: true,
      select: false
    },
    avatarPath: {
      type: String
    }
  }, { timestamps: true })
)

module.exports = User;