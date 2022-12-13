const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

const getCartItems = async (req, res) => {
	const { _id } = req.user;
	// console.log(_id);
	try {
		// const cart = await cartModel.findOneAndUpdate(
		// 	{ userId: _id },
		// 	{},
		// 	// { upsert: true },
		// 	{ new: true, upsert: true }
		// );
		// const cart = await cartModel.create({ userId: _id });
		const cart = await cartModel.findOne({ userId: _id });
		// console.log(cart);
		if (cart) res.status(200).json({ cart });
		else res.status(200).json({ cart:{items:[],total:null} });
	} catch (err) {
		res.status(404).json({ err: err.message });
	}
	// res.json({mssg:'yoyou'});
};

const addCartItem = async (req, res) => {
	const { _id } = req.user;
	const { productId, quantity } = req.body;

	// console.log(_id, body);

	try {
		// const { total, items } = await cartModel.findOneAndUpdate(
		// 	{ userId: _id },
		// 	{},
		// 	{ upsert: true, new: true }
		// );
		const cart = await cartModel.findOne({ userId: _id });
		const product = await productModel.findById(productId);
		if (!product) throw Error('Item not Found');
		const { price, name,imagesPath } = product;
		if (cart) {
			let oldquantity=0;
			if (
				cart.items.findIndex((item) => item.productId === productId) ===
				-1
			)
				cart.items.push({ productId, quantity, price, name,url:imagesPath[0].url });
			else
				cart.items.forEach((item) => {
					if (item.productId === productId) {
						oldquantity= item.quantity;
						item.quantity = quantity;
					}
				});
			cart.total +=(quantity- oldquantity) * price;
			await cart.save();
			res.status(200).json({ cart });
		} else {
			const newcart = await cartModel.create({
				userId: _id,
				items: [
					{
						productId,
						price,
						name,
						quantity,
						url: imagesPath[0].url,
					},
				],
				total: quantity * price,
			});
			res.status(200).json({ cart: newcart });
		}

		// const item = await cartModel.findOne(
		// 	{
		// 		userId: _id,
		// 		'items.productId': body.productId,
		// 	},
		// 	{ 'items.$': 1 }
		// );

		// if (item) {
		// 	const { quantity } = item.items[0];
		// 	const updatedCart = await cartModel.findOneAndUpdate(
		// 		{
		// 			userId: _id,
		// 			items: { $elemMatch: { productId: body.productId } },
		// 		},
		// 		{
		// 			$set: {
		// 				'items.$.quantity': quantity + body.quantity,
		// 			},
		// 			// total: total + body.price * body.quantity
		// 		},
		// 		{ new: true }
		// 	);
		// 	console.log(updatedCart);
		// 	res.status(200).json({ cart: updatedCart });
		// }
		// const updatedCart = await cartModel.findOneAndUpdate(
		// 	{ userId: _id },
		// 	{
		// 		items: [...items, body],
		// 		total: total + body.price * body.quantity,
		// 	},
		// 	{ new: true }
		// );

		// res.status(200).json({ cart: updatedCart });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

const deleteCartItem = async (req, res) => {
	const { _id } = req.user;
	const {productId }= req.params;

	try {
		const cart = await cartModel.findOne({ userId: _id });
		if (cart) {
			const { price, quantity } =
				cart.items.findIndex((item) => item.productId === productId) !==
				-1
					? cart.items[
							cart.items.findIndex(
								(item) => item.productId === productId
							)
					]
					: { price: 0, quantity: 0 };
			cart.items = cart.items.filter(
				(item) => item.productId !== productId
			);
			cart.total -= price * quantity;
			// console.log(price, quantity,cart.items);
			// console.log(cart);
			const newcart = await cart.save();
			res.status(200).json({ cart: newcart });
		} else throw Error('Cart not found');
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

module.exports = { getCartItems, addCartItem, deleteCartItem };
