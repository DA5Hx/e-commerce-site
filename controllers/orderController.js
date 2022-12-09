const cartModel = require('../models/cartModel');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

// console.log(stripe)

const getOrders = async (req, res) => {
	const { _id } = req.user;
	try {
		const order = await orderModel
			.find({ userId: _id })
			.sort({ createdAt: -1 });
		res.status(200).json({ order });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
	// res.json({ mssg: 'whatev' });
};

const createpaymentintent = async (req, res) => {
	try{
		const {_id}=req.user;
		const {total}= await cartModel.findOne({userId:_id});
		const {email}= await userModel.findById(_id);
		const paymentIntents = await stripe.paymentIntents.create({
		amount: total * 100,
		receipt_email:email,
		payment_method_types: ['card'],
		currency: 'inr',
	});

	console.log(paymentIntents.client_secret);
	if (!paymentIntents) throw Error('Payment Failed');
	res.status(200).json({client_secret:paymentIntents.client_secret});
	}
	catch(err){
		res.status(400).json({err:err.message});
	}
};

const addOrder = async (req, res) => {
	const { _id } = req.user;
	try {
		const cart = await cartModel.findOne({ userId: _id });
		const { email } = userModel.findById(_id);
		if (cart) {
			// console.log(cart);
			const order = await orderModel.create({
				userId: _id,
				items: cart.items,
				total: cart.total,
			});
			cart.items.map(async(item)=>{
				const {stock}=await productModel.findById(item.productId);
				const product = await productModel.findByIdAndUpdate(item.productId,{stock:stock-item.quantity},{new:true});
				console.log(product);
			})
			const deleteCart = await cartModel.findByIdAndDelete(cart._id);
			res.status(200).json({ order });
		} else throw Error('No items in Cart to checkout');
	} catch (err) {
		res.status(400).json({ err: err.message });
	}

	// res.json({ mssg: 'aadsfohyoehleeo' });
};

module.exports = { getOrders, addOrder,createpaymentintent };
