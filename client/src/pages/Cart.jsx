import { Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from '../components/CartProduct';
import Checkout from '../components/Checkout';
import Error from '../components/Error';
import { getCartItems } from '../slice/cartSlice';

const Cart = () => {
	const { user, token } = useSelector((state) => state.user);
	const { items, total, loading, error } = useSelector((state) => state.cart);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCartItems(token));
	}, []);

	return !user ? (
		<Error error={'Login to access the cart'} />
	) : loading ? (
		<Skeleton height={'87vh'} sx={{ margin: '0 5em' }}></Skeleton>
	) : error ? (
		<Error error={error} />
	) : (
		<Box>
			<Typography
				variant={'h4'}
				sx={{
					fontWeight: '600',
					fontFamily: 'Inter',
					margin: '1em',
				}}
			>
				Cart
			</Typography>
			{items && items.length === 0 ? (
				<Error error={'Your cart is empty'} />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={8}>
						{items.map((item) => (
							<CartProduct item={item} key={item._id} />
						))}
					</Grid>
					<Grid item xs={4}>
						<Checkout />
					</Grid>
				</Grid>
			)}
		</Box>
	);
};

export default Cart;
