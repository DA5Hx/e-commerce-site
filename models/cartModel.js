const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		unique:true,
		required: true,
	},
	items: [
		{
			productId: {
				type: String,
				unique:true,
				required: true,
			},
			name: {
				type: String,
			},
			quantity: {
				type: Number,
				required: true,
				min: [1, 'Quantity cannot be less than one'],
				default: 1,
			},
			price: {
				type: Number,
				required: true,
			},
			url:{
				type:String,
			}
		},
	],
	total: {
		type: Number,
		required: true,
		default: 0,
	},
});

module.exports = new mongoose.model('Cart',cartSchema);