import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import { BiRupee } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '../slice/cartSlice';

const OrderProduct = ({ item,time }) => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user);

	return (
		<Box sx={{ padding: '1em', maxWidth: '70%', margin: 'auto' }}>
			<Grid container>
				<Grid item xs={3}>
					<Box
						component={'img'}
						src={item.url}
						sx={{
							objectFit: 'fill',
							maxWidth: '100%',
							minWidth: '100%',
						}}
						alt={'product'}
					/>
				</Grid>
				<Grid item xs={9}>
					<Typography
						sx={{
							color: '#e97777',
							textTransform: 'capitalize',
							margin: '.7em',
							font: '600 1.2rem Palanquin Dark',
						}}
					>
						{item.name}
					</Typography>
					<Box
						display={'flex'}
						sx={{ alignItems: 'center', marginTop: '1em' }}
					>
						<Typography
							sx={{
								color: '#eb9393',
								font: '600 1.1rem Palanquin Dark',
								margin: '0 .7em',
							}}
						>
							Price:
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<BiRupee size={'1.5em'} />
							<Typography
								sx={{
									color: '#333',
									font: '600 1.4rem Inter',
									marginLeft: '-.2em',
								}}
							>
								{item.price}
							</Typography>
						</Box>
					</Box>
					<Box
						display={'flex'}
						sx={{ alignItems: 'center', marginTop: '1em' }}
					>
						<Typography
							sx={{
								color: '#eb9393',
                                margin:'0 .7em',
								font: '600 1.1rem Palanquin Dark',
							}}
						>
							Quantity:
						</Typography>
						<Typography
							sx={{
								color: '#333',
								font: '500 1rem Inter',
								margin: '.7em',
							}}
						>
							{item.quantity}
						</Typography>
						<Typography
							sx={{
								color: '#333',
								marginLeft: 'auto',
								font: '1em Inter',
							}}
						>
							{moment(time.toString()).calendar()}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Divider sx={{ margin: '1em 0 0 0' }} />
		</Box>
	);
};

export default OrderProduct;
