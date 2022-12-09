import { Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import ProductDetails from '../components/ProductDetails';
import Reviews from '../components/Reviews';
import { getProductById } from '../slice/productSlice';

const Product = () => {
	const dispatch = useDispatch();
	const {product, error, loading} = useSelector(state=>state.product)
	const { id } = useParams();
	useEffect(()=>{
		dispatch(getProductById(id))
	},[])
	return loading ? (
		<Skeleton height={'87vh'} sx={{ margin: '0 5em' }}></Skeleton>
	) : error ? (
		<Error error={error} />
	) : (
		<div className="Product">
			<ProductDetails product={product} />
			<Reviews product={product} />
		</div>
	);
};

export default Product;
