const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin:{
			type: Boolean,
			required:true,
			default:false,
		}
	},
	{
		timestamps: true,
	}
);

// const
userSchema.statics.signup = async function (username, email, password) {
	if (!username || !email || !password) throw Error('Field is empty');
	if (!validator.isEmail(email)) throw Error('Not a valid email');
	if (!validator.isStrongPassword(password))
		throw Error('Not a strong password');

	const userexists = await this.findOne({ email });
	if (userexists) throw Error('User already Exists');

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await this.create({ username, email, password: hash });
	return user;
};

userSchema.statics.login = async function (email, password) {
	if (!email || !password) throw Error('Field is empty');
	if (!validator.isEmail(email)) throw Error('Not a valid email');

	const user = await this.findOne({ email });
	if (!user) throw Error('User does not Exists');

	const passcheck = await bcrypt.compare(password, user.password);
	if (!passcheck) throw Error('Password does not match');

	return user;
};

module.exports = mongoose.model('User', userSchema);
