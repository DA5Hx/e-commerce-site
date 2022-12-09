import { Box, Typography } from '@mui/material';
import React from 'react';
import { MdCopyright } from 'react-icons/md';

const Footer = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#f78f8f',
				minHeight: '2em',
				position: 'fixed',
				bottom: 0,
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					'& path': { color: '#fff' },
					alignItems: 'center',
					justifyContent: 'center',
					padding: '.5em',
				}}
			>
				<MdCopyright />
				<Typography
					sx={{
						color: '#fff',
						marginLeft: '.5em',
					}}
				>
					copyright Tanishq
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
