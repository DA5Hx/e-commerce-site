import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	formControlLabelClasses,
	Grid,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
	const navigate = useNavigate();
	const [img, setImg] = useState(product && product.imagesPath.length>0 ? product.imagesPath[0].url : '');
	// useEffect(() => {
	// 	setInterval(() => {
	// 		setImg((prevImg) =>
	// 			product.imagesPath.indexOf(prevImg) ===
	// 			(product.imagesPath.length-1)
	// 				? product.imagesPath[0]
	// 				: product.imagesPath[product.imagesPath.indexOf(prevImg) + 1]
	// 		);
	// 	}, 3000);
	// }, []);
	return (
		<Grid item xs={2.68} className="product" component={Card} sx={{margin:'1em'}}>
			<CardActionArea onClick={() => navigate(`/product/${product._id}`)}>
				<CardMedia component="img" height={'200px'} image={img} />
				<CardContent>
					<Typography
						sx={{
							color: '#333',
							textTransform: 'capitalize',
							margin: '.3em 0',
							font: '500 1.2em Inter',
						}}
					>
						{product.name}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<BiRupee />
						<Typography>{product.price}</Typography>
					</Box>
					<Typography>{product.category}</Typography>
				</CardContent>
			</CardActionArea>
		</Grid>
	);
};

export default ProductCard;
