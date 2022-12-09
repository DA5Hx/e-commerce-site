import React from 'react';
import { Box, Typography } from '@mui/material';
import Filter from '../components/Filter';
import { motion } from 'framer-motion';
import Products from '../components/Products';

const Home = () => {
	return (
		<Box className="home" sx={{ margin: '1em 0 0 1em' }}>
			<Typography variant="h4" fontFamily="Inter" fontWeight="600">
				All products
			</Typography>
			<Filter />
			<Products />
		</Box>
	);
};

export default Home;
