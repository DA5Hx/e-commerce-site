const express = require('express');
const { getOrders, addOrder, createpaymentintent } = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

//authorization middleware
router.use(auth);

router.get('/',getOrders);
router.get('/create-payment-intent',createpaymentintent);
router.post('/',addOrder);

module.exports = router
