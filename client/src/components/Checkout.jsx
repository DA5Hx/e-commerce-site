import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { BiRupee } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
	Elements,
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { motion, useTime } from 'framer-motion';
import Payment from './Payment';
const Checkout = () => {
	const { items, total } = useSelector((state) => state.cart);
	const [message, setMessage] = useState('');
	const STRIPE_PUBLISHABLE_KEY =
		'pk_test_51MCeyNSJ2eQ0fJckYh6YK5FLIfNT2xONktUjOYP6tlFYqfSEODOqRecQmWbWMzt7TC0TRMRCQRuzR065OVu2HFsV00C19c789P';
	const { token } = useSelector((state) => state.user);
	let quantity = 0;
	items.forEach((item) => (quantity += item.quantity));
	const dispatch = useDispatch();
	const [clientsecret, setClientSecret] = useState('');
	const addpaymentintent = () => {
		fetch('http://localhost:4000/api/orders/create-payment-intent', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.client_secret))
			.catch((err) =>{ setMessage(err.message); console.log(err)});
		setTimeout(() => setMessage(''), 1000);
	};

	return (
		<Box sx={{ margin: '.5em auto', maxWidth: '50%' }}>
			<Typography
				sx={{
					color: '#e97777',
					margin: '.3em 0',
					font: '600 1.6rem Palanquin Dark',
				}}
			>
				Checkout
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					sx={{
						color: '#eb9393',
						font: '600 1.3rem Palanquin Dark',
					}}
				>
					Items:
				</Typography>
				<Typography
					sx={{
						marginLeft: 'auto',
						color: '#333',
						font: '600 1.3rem Inter',
					}}
				>
					{items.length}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					sx={{
						color: '#eb9393',
						font: '600 1.3rem Palanquin Dark',
					}}
				>
					Quantity:
				</Typography>
				<Typography
					sx={{
						marginLeft: 'auto',
						color: '#333',
						font: '600 1.3rem Inter',
					}}
				>
					{quantity}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					sx={{
						color: '#e97777',
						font: '600 1.5em Palanquin Dark',
					}}
				>
					Total:
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginLeft: 'auto',
					}}
				>
					<BiRupee size={'1.5em'} />
					<Typography
						sx={{
							color: '#333',
							font: '600 1.5rem Inter',
						}}
					>
						{total}
					</Typography>
				</Box>
			</Box>
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
			{!clientsecret && (
				<Button
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
					onClick={addpaymentintent}
				>
					Checkout
				</Button>
			)}
			{clientsecret && (
				<Elements
					stripe={loadStripe(STRIPE_PUBLISHABLE_KEY)}
					options={{ clientSecret: clientsecret }}
				>
					<Typography
						sx={{
							color: '#e97777',
							margin: '1em 0',
							font: '600 1.6rem Palanquin Dark',
						}}
					>
						Card Details
					</Typography>
					<Payment token={token} />
				</Elements>
			)}
		</Box>
	);
};

export default Checkout;
