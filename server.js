//imports
const app = require('./app');
const mongoose = require('mongoose');
const path = require('path')

//connect to db and start listening
mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		app.get('*', (req, res) => {
			console.log('listening');
			res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
		});
		
		app.listen(process.env.PORT, (err) => {
			if (err) {
				console.log(err);
			}
			console.log(`server is running on ${process.env.PORT}`);
		});
	})
	.catch((err) => console.log(err));
