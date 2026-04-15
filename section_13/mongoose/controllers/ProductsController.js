const Product = require('../models/Product');

class ProductsController {
  static async listProducts(req, res) {
    const products = await Product.find().lean();

    res.render('products/index', { products });
  }

  static newProduct(req, res) {
    res.render('products/new');
  }

  static async createProduct(req, res) {
    const { name, price, description, image } = req.body;
    const product = new Product({ name, price, description, image });
    await product.save();

    res.redirect('/products');
  }

  static async showProduct(req, res) {
    const product = await Product.findById(req.params.id).lean();

    res.render('products/show', { product });
  }

  static async destroyProduct(req, res) {
    await Product.deleteOne({_id: req.params.id});

    res.redirect('/products');
  }

  static async editProduct(req, res) {
    const product = await Product.findById(req.params.id).lean();

    res.render('products/edit', { product });
  }

  static async updateProduct(req, res) {
    const { name, price, description, image } = req.body;
    await Product.updateOne({_id: req.params.id}, { name, price, description, image });

    res.redirect('/products');
  }
}

module.exports = ProductsController;