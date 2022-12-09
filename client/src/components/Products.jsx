import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../slice/productSlice';
import Error from './Error';
import ProductCard from './ProductCard';

const Products = () => {
	const {keyword}= useParams();
	const { products, loading, error } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts(keyword !== undefined ? keyword : ''));
	}, [keyword !== undefined ? keyword : '']);
	return loading ? (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<Skeleton height={'38vw'} />
			</Grid>
			<Grid item xs={4}>
				<Skeleton height={'38vw'} />
			</Grid>
			<Grid item xs={4}>
				<Skeleton height={'38vw'} />
			</Grid>
		</Grid>
	) : // <Box sx={{ display: 'flex', gap: '2em', flexWrap: 'wrap' }}>
	// 	<Skeleton width={'30vw'} height={'50vh'} />
	// 	<Skeleton width={'30vw'} height={'50vh'} />
	// 	<Skeleton width={'30vw'} height={'50vh'} />
	// 	<Skeleton width={'30vw'} height={'50vh'} />
	// </Box>
	error ? (
		<Error error={error} />
	) : (
		<Box className="Products">
			<Grid
				sx={{ padding: '2em .5em' }}
				container
				// spacing={6}
				alignItems="stretch"
			>
				{products && products.length === 0 ? (
					<Box
						margin={'auto'}
					>
						<Error error={'No Product to Show'} />
					</Box>
				) : (
					products.map((product) => {
						return (
							// <Grid item xs={3} key={product._id}>
							<ProductCard
								product={{ ...product }}
								key={product._id}
							/>
							/* </Grid> */
						);
					})
				)}
			</Grid>
		</Box>
	);
};

export default Products;
