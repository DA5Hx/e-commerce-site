import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../components/Error';

const NotFound = () => {
	return (
		<Box>
			<Typography
				variant={'h4'}
				sx={{
					fontWeight: '600',
					fontFamily: 'Inter',
					margin: '1em',
				}}
			>
				404 !! Oops Page Not Found
			</Typography>
			<Error error={'cannot find the page'} />
			<Typography
				sx={{
					'& a': { color: '#e97777' },
					textAlign: 'center',
					margin: '1em',
				}}
			>
				Go back to <Link to="/">Home</Link>
			</Typography>
		</Box>
	);
};

export default NotFound;
