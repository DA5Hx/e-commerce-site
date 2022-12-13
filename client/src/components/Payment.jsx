import { Box, Button, Typography } from '@mui/material';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItem, getCartItems } from '../slice/cartSlice';
import { addOrder } from '../slice/orderSlice';

const Payment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const {token} = useSelector(state=>state.user)
	const checkout = async () => {
		if (!stripe || !elements) return;

		setLoading(true);
		const { error } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		});
		// console.log(error);
		setLoading(false);
		if (error) {
			setMessage(error);
			setTimeout(() => setMessage(''), 1000);
		} else {
			await dispatch(addOrder(token));
            await dispatch(getCartItems(token));
            navigate('/orders');
			// navigate('/orders');
		}
	};
	return (
		<Box>
			<PaymentElement />
			{message && (
				<Typography
					className="error"
					fontFamily={'Palanquin Dark'}
					component={motion.p}
					initial={{ opacity: 0 }}
					animate={{
						scale: [1, 1.1, 1],
						opacity: 1,
						color: '#e97777',
					}}
					transition={{ duration: 0.4 }}
				>
					{message}
				</Typography>
			)}
			<Button
				disabled={loading}
				sx={{
					color: '#e97777',
					border: '3px solid #e97777',
					margin: '2em 0',
					textTransform: 'none',
					transition: '.5s ease-in',
					':hover': {
						// color: '#e97777',
						border: '2px solid #e97777',
						backgroundColor: '#e97777',
						color: '#fff',
					},
				}}
				variant="outlined"
				onClick={checkout}
			>
				{!loading ? 'Pay now' : 'Processing...'}
			</Button>
		</Box>
	);
};

export default Payment;
