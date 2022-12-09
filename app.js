const express = require('express');
const cors = require('cors');

//config
require('dotenv').config({ path: '.env' });

//import routes
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const auth = require('./middleware/auth');
const path = require('path');

//creating express app
app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.use(auth);

//routes middleware
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// app.get('/', (req, res) => {
// 	res.json({ mssg: 'welcome' });
// });

module.exports = app;
