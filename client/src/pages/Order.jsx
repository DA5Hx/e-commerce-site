import { Box, Skeleton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import Error from '../components/Error';
import OrderProduct from '../components/OrderProduct';
import { getOrders } from '../slice/orderSlice';

const Order = () => {
	const { orders, loading, error } = useSelector((state) => state.order);
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user);
	console.log('in orders');
	useEffect(() => {
		dispatch(getOrders(token));
	}, []);
	return loading ? (
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
				Your Orders
			</Typography>
			{orders && orders.length === 0 ? (
				<Error error={'No orders Yet'} />
			) : (
				orders &&
				orders.map((order) =>
					order.items.map((item) => (
						<OrderProduct
							item={item}
							time={order.createdAt}
							key={item._id}
						/>
					))
				)
			)}
			<Typography
				sx={{
					'& a': { color: '#e97777' },
					textAlign: 'center',
					margin: '1em',
				}}
			>
				Continue shopping....Go to <Link to="/">Home</Link>
			</Typography>
		</Box>
	);
};

export default Order;
