const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'ProductImages',
		// allowedFormats: ['jpg', 'jpeg', 'png'],
		public_id: (req, file) => {
			return `${file.originalname}-${Date.now()}`;
		},
		tranformation:[{
			height:200,
			width:200
		}]
		
	},
});

const userStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'UserImages',
		// allowedFormats: ['jpg', 'jpeg', 'png'],
		// public_id: (req, file) => {
		// 	console.log(file);
		// 	return `${file.originalname}-${Date.now()}`;
		// },
		public_id: (req, file) => {
			return `${file.originalname}-${Date.now()}`;
		},
	},
});

module.exports = {
	uploadProductImages: multer({ storage: productStorage }),
	uploadUserImages: multer({ storage: userStorage }),
};
