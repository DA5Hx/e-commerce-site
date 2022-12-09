const express = require('express');
const { uploadProductImages } = require('../multer/multer');
const {
	createProduct,
	getProducts,
	getProductById,
	updateProductById,
	deleteProductById,
	addreview,
} = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

//Get all products
router.get('/', getProducts);

//Get a product from id
router.get('/:id', getProductById);

router.use(auth);

//addreview
router.post('/add-review/:id',addreview);

//Create a new product --Admin
router.post('/create', uploadProductImages.array('images'), createProduct);

//Update a product from id --Admin
router.patch('/:id', uploadProductImages.array('images'), updateProductById);

//Delete a product by Id --Admin
router.delete('/:id', deleteProductById);

module.exports = router;
