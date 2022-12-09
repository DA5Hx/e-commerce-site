const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		username:{
			type:String,
			required:true
		},
		rating: {
			type: Number,
			required: [true, 'Enter the rating'],
			max: [5, 'Rating cannot exceed 5'],
		},
		comment: {
			type: String,
			required: [true, 'Add a comment'],
		},
	},
	{ timestamps: true }
);

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter the name of Product'],
		},
		price: {
			type: Number,
			required: [true, 'Please enter the price of Product'],
			max: [1000000, 'Price cannot exceed 1 million'],
		},
		rating: {
			type: Number,
			default: 0,
			max: [5, 'rating cannot be more than 5'],
		},
		description: {
			type: String,
			required: [true, 'Please enter Product description'],
		},
		imagesPath: [
			{
				url: {
					type: String,
					required: true,
				},
			},
		],
		category: {
			type: String,
			required: [true, 'Please select a Product Category'],
		},
		stock: {
			type: Number,
			default: 0,
			max: [1000, 'Stock cannot exceed 1000'],
		},
		reviews: [reviewSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
