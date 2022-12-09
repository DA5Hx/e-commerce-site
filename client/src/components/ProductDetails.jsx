import {
	Avatar,
	Button,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BiMagnet, BiRupee } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { BsFillStarFill, BsStarFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { MdOutlineShoppingCart, MdStar } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addCartItem } from '../slice/cartSlice';

const ProductDetails = ({ product }) => {
	// const firstimg=product.imagesPath[0];
	// console.log(firstimg)
	const [img, setImg] = useState(product && product.imagesPath.length>0 ? product.imagesPath[0].url : '');
	const [rating, setRating] = useState(product ? product.rating : 0);
	console.log(product);
	const [quantity, setQuantity] = useState(1);

	const [error,setError]= useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {token} = useSelector(state=>state.user)
	const addToCart = () => {
		if (token) {
			dispatch(addCartItem({productId:product._id,quantity,token}));
			navigate('/cart');
		}
		else{
			console.log(error)
			setError('Login to add item to cart');
			setTimeout(()=>{
				setError(null);
				console.log(error)
			},1000);
			console.log(error)
		}
	};

	return (
		<Grid container spacing={5} sx={{ padding: '3em 5em' }}>
			<Grid item xs={6}>
				<Box sx={{ display: 'grid', gridTemplateColumns: '2fr 10fr' }}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateRepeat: 'repeat(4,1fr)',
							gap: '.3em',
						}}
					>
						{product && product.imagesPath.length>0 &&
							product.imagesPath.map((obj) => (
								<Box
									key={obj._id}
									component="img"
									src={obj.url}
									sx={{
										height: '100%',
										width: '100%',
										minHeight: '100px',
										objectFit: 'cover',
										border: '2px solid #333',
										margin: '.3em',
									}}
									variant="square"
									onClick={() => setImg(obj.url)}
								/>
							))}
						{product && 5 - product.imagesPath.length > 0
							? [...Array(5 - product.imagesPath.length)].map(
									() => (
										<Box
											// className='check'
											sx={{
												height: '100%',
												width: '100%',
												minHeight: '100px',
												objectFit: 'cover',
												border: '2px solid #333',
												margin: '.3em',
											}}
											key={uuid()}
										/>
									)
							)
							: '' && Array.clear()}
					</Box>
					<Box
						component="img"
						src={img}
						sx={{
							height: '100%',
							width: '100%',
							objectFit: 'contain',
							margin: '0 1em',
						}}
					/>
				</Box>
			</Grid>
			<Grid item xs={6}>
				<Box sx={{ margin: '2em' }}>
					<Typography
						component="h1"
						sx={{
							color: '#e97777',
							textTransform: 'capitalize',
							margin: '.3em 0',
							font: '600 1.4em Palanquin Dark',
						}}
					>
						{product && product.name}
					</Typography>
					<Box display="flex" sx={{ gap: '.7em' }}>
						<Box
							display="flex"
							sx={{
								alignItems: 'center',
								justifyContent: 'center',
								minWidth: '3em',
								borderRadius: '10px',
								backgroundColor: '#e97777',
							}}
						>
							<Typography
								sx={{
									color: '#fff',
									marginRight: '.2em',
									font: '1.1em Inter',
								}}
							>
								{product && product.rating}
							</Typography>
							<MdStar className="icon--white" size={'1.1em'} />
						</Box>
						<Typography
							sx={{
								color: '#eb9393',
								marginRight: '.4em',
								font: '600 1.2em Inter',
							}}
						>
							{product &&
								`${product.reviews.length} review${
									product.reviews.length == 1 ? '' : 's'
								}`}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							margin: '1.3em -.5em',
						}}
					>
						<BiRupee size={'2.5em'} />
						<Typography
							sx={{ color: '#333', font: '600 2rem Inter' }}
						>
							{product && product.price}
						</Typography>
					</Box>
					<Typography
						sx={{
							color: '#eb9393',
							font: '500 1.3rem Palanquin Dark',
						}}
					>
						Description :
					</Typography>
					<Typography
						sx={{
							color: '#333',
							font: '500 1.1rem Inter',
							margin: '.3em 0',
						}}
					>
						{product && product.description}
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Harum dignissimos, sed aliquam temporibus dolorum culpa
						omnis mollitia quia maxime provident.
					</Typography>
					<Box
						display={'flex'}
						sx={{
							gap: '.4em',
							alignItems: 'center',
							margin: '1.3em 0 0 0 ',
						}}
					>
						<Typography
							sx={{
								color: '#eb9393',
								font: '600 1.1rem Palanquin Dark',
							}}
						>
							Stock :
						</Typography>
						<Typography
							sx={{
								color: '#333',
								font: '500 1rem Inter',
								padding: '.2em 0 0 0',
							}}
						>
							{product && product.stock > 0
								? `In Stock (${product.stock})`
								: 'Out of Stock'}
						</Typography>
					</Box>
					<Box
						display={'flex'}
						sx={{
							gap: '.4em',
							alignItems: 'center',
							margin: '.1em 0',
						}}
					>
						<Typography
							sx={{
								color: '#eb9393',
								font: '600 1.1rem Palanquin Dark',
							}}
						>
							Category :
						</Typography>
						<Typography
							sx={{
								color: '#333',
								font: '500 1rem Inter',
								padding: '.2em 0 0 0',
							}}
						>
							{product && product.category}
						</Typography>
					</Box>
					{product && product.stock>0 && (
						<Box sx={{ marginTop: '.5em' }}>
							<Select
								// variant='select'
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
							>
								{[...Array(product.stock)].map((x, ind) => (
									<MenuItem value={ind + 1} key={uuid()}>
										{ind + 1}
									</MenuItem>
								))}
							</Select>
						</Box>
					)}
					{error && (
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
							{error}
						</Typography>
					)}
					<Button
						sx={{
							color: '#e97777',
							border: '3px solid #e97777',
							font: '500 1em Inter',
							margin: '2em 0',
							textTransform: 'none',
							':hover': {
								// color: '#e97777',
								border: '2px solid #e97777',
								backgroundColor: '#e97777',
								color: '#fff',
								'& path': {
									color: '#fff',
								},
							},
							':disabled': {
								cursor: 'not-allowed',
								pointerEvents: 'all',
							},
							'& path': {
								color: '#e97777',
							},
						}}
						disabled={product && product.stock == 0}
						onClick={addToCart}
						endIcon={<MdOutlineShoppingCart />}
					>
						Add to Cart
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ProductDetails;
