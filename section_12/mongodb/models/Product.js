const conn = require('../db/conn');
const { ObjectId } = require('mongodb');

class Product {
  constructor(name, price, description, image) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }

  async create() {
    const product = await conn.db().collection('products').insertOne({
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image
    })

    return product;
  }

  async update(id) {
    await conn.db().collection('products').updateOne({ _id: new ObjectId(id) }, {
      $set: this
    });
  }

  static async findById(id) {
    const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) });

    return product;
  }

  static async findAll() {
    const products = await conn.db().collection('products').find().toArray();

    return products;
  }

  static async destroy(id) {
    await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;