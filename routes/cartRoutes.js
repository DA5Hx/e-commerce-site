const express= require('express');
const { getCartItems, addCartItem, deleteCartItem } = require('../controllers/cartController');
const auth = require('../middleware/auth');

const router = express.Router();


//authorization middleware
router.use(auth);

router.get('/',getCartItems)
router.post('/',addCartItem)
router.delete('/:productId',deleteCartItem)

module.exports = router;