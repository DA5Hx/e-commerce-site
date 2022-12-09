import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { BiRupee } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '../slice/cartSlice';

const CartProduct = ({item}) => {
	const dispatch =  useDispatch();
	const {token} = useSelector(state=>state.user)
	
	return (
		<Box sx={{ padding: '1em' }}>
			<Grid container>
				<Grid item xs={3}>
					<Box
						component={'img'}
						src={item.url}
						sx={{ objectFit: 'fill', maxWidth: '100%',minWidth:'100%'}}
						alt={'product'}
					/>
				</Grid>
				<Grid item xs={9}>
					<Box display={'flex'} sx={{ alignItems: 'center' }}>
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
						<Box sx={{ marginLeft: 'auto' }}>
							<IconButton
								onClick={() =>
									dispatch(
										deleteCartItem({
											token,
											id: item.productId,
										})
									)
								}
								sx={{
									borderRadius: '50%',
								}}
							>
								<MdDelete />
							</IconButton>
						</Box>
					</Box>
					<Box
						display={'flex'}
						sx={{ alignItems: 'center', marginTop: '1em' }}
					>
						<Typography
							sx={{
								color: '#eb9393',
								font: '600 1.1rem Palanquin Dark',
								margin:'0 .7em'
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
								sx={{ color: '#333', font: '600 1.4rem Inter',marginLeft:'-.2em' }}
							>
								{item.price}
							</Typography>
						</Box>
						<Typography
							sx={{
								color: '#eb9393',
								marginLeft: 'auto',
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
					</Box>
				</Grid>
			</Grid>
			<Divider sx={{ margin: '1em 0 0 0' }} />
		</Box>
	);
};

export default CartProduct;
