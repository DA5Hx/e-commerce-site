import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import React from 'react';

const Error = ({error}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				height: '60vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography
				className="error"
				variant="h5"
				fontFamily={'Palanquin Dark'}
				component={motion.h5}
				initial={{ opacity: 0 }}
				animate={{ scale: [1, 1.1, 1], opacity: 1, color: '#e97777' }}
				transition={{ duration: 0.4 }}
			>
				{error}
			</Typography>
		</Box>
	);
};

export default Error;
