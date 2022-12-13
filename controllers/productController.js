const { default: mongoose } = require('mongoose');
const productModel = require('../models/productModel');
const Product = require('../models/productModel');
const userModel = require('../models/userModel');

//Create a Product
const createProduct = async (req, res) => {
	const { _id } = req.user;
	const body = JSON.parse(req.body.request);
	// console.log(body);
	try {
		// console.log(_id);
		// console.log(req.files);
		const { isAdmin } = await userModel.findById(_id);
		if (isAdmin) {
			const product = await Product.create({
				...body,
				imagesPath: req.files
					? req.files.map((file) => ({ url: file.path }))
					: [{ url: req.file.path }],
			});
			res.status(200).json({ product: product });
		} else throw Error('User is not an Admin');
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
};

//Get all Products
const getProducts = async (req, res) => {
	try {
		const keyword = req.query.keyword
			? {
					name: {
						$regex: req.query.keyword,
						$options: 'i',
					},
				}
			: {};
		// console.log(keyword)
		const productsList = await Product.find({...keyword});
		res.status(200).json({
			products: productsList,
		});
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
};

//Get a product by id
const getProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		res.status(200).json({
			product: product,
		});
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
};

// Update a product by id
const updateProductById = async (req, res) => {
	const { _id } = req.user;
	try {
		const id = req.params.id;
		const body = JSON.parse(req.body.request);
		const { isAdmin } = await userModel.findById(_id);
		// console.log(body);
		if (isAdmin) {
			const updatedProduct = await Product.findByIdAndUpdate(
				id,
				{
					...body,
					imagesPath: req.files
						? req.files.map((file) => ({ url: file.path }))
						: [{ url: file.path }],
				},
				{ new: true }
			);
			// console.log(updatedProduct);
			res.status(200).json({
				updatedProduct: updatedProduct,
			});
		} else throw Error('User is not Admin');
	} catch (err) {
		res.status(400).json({
			mss: 'Cannot update the product',
			err: err.message,
		});
	}
};

const deleteProductById = async (req, res) => {
	const { _id } = req.user;
	try {
		const id = req.params.id;
		const { isAdmin } = await userModel.findById(_id);
		if (isAdmin) {
			const deletedProduct = await Product.findOneAndDelete(id);
			res.status(200).json({
				deletedProduct: deletedProduct,
			});
		} else throw Error('User is not Admin');
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
};

const addreview = async (req, res) => {
	const { _id } = req.user;
	try {
		const {id }= req.params;
		const {rating,comment}=req.body;
		const product = await productModel.findById(id);
		// console.log(product);
		const {username}= await userModel.findById(_id);
		product.reviews.push({username,rating,comment});
		product.rating=(product.rating+rating)/(product.reviews.length);
		const newproduct= await product.save();
		res.status(200).json({ product:newproduct });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	updateProductById,
	deleteProductById,
	addreview
};
