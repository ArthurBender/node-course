const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/ProductsController');

router.get('/details/:id', ProductsController.showProduct);
router.post('/create', ProductsController.createProduct);
router.get('/new', ProductsController.newProduct);
router.get('/edit/:id', ProductsController.editProduct);
router.post('/update/:id', ProductsController.updateProduct);
router.post('/delete/:id', ProductsController.destroyProduct);
router.get('/', ProductsController.listProducts);

module.exports = router;