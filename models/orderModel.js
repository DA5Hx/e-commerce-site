const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.ObjectId,
			required: true,
		},
		items: [
			{
				productId: {
					type: String,
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
				url: {
					type: String,
					required: true,
				},
			},
		],
		total: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model('Order', orderSchema);
