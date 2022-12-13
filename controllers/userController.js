const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'7d'})
}

const login = async (req, res) => {
	const { email, password } = req.body;
    try{
        const user = await userModel.login(email,password);

        const token= createToken(user._id);
        res.status(200).json({user,token})
    } catch( err){
        res.status(400).json({err:err.message})
    }
};

const signup = async (req, res) => {
	const { username, email, password } = req.body;
	// console.log()
	try {
		const user =await userModel.signup(username,email,password);
        const token = createToken(user._id);
		res.status(200).json({user,token});
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
};

module.exports = { login, signup };
