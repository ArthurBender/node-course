const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Item = mongoose.model(
  "Item",
  new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    imagesPaths: {
      type: [String],
    },
    available: {
      type: Boolean,
      required: true
    },
    owner: {
      type: Object,
      required: true
    },
    buyer: {
      type: Object
    }
  }, { timestamps: true })
)

module.exports = Item;