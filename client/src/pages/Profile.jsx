import { Box, Button, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateProductModal from '../components/CreateProductModal';
import Error from '../components/Error';

const Profile = () => {
    const {user,error,loading} = useSelector(state=>state.user);
	return loading ? (
		<Skeleton height={'87vh'} sx={{ margin: '0 5em' }}></Skeleton>
	) : error ? (
		<Error error={error} />
	) : (
		<Box>
			<Typography
				variant={'h4'}
				sx={{
					fontWeight: '600',
					fontFamily: 'Inter',
					margin: '1em',
				}}
			>
				User Details
			</Typography>
			<Box sx={{ margin: '2em' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography
						sx={{
							color: '#eb9393',
							font: '600 1.1rem Palanquin Dark',
						}}
					>
						Name:
					</Typography>
					<Typography
						sx={{
							color: '#333',
							textTransform: 'capitalize',
							font: '500 1rem Inter',
							padding: '0 1em',
						}}
					>
						{user && user.username}
					</Typography>
				</Box>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
					}}
				>
					<Typography
						sx={{
							color: '#eb9393',
							font: '600 1.1rem Palanquin Dark',
						}}
					>
						Email:
					</Typography>
					<Typography
						sx={{
							color: '#333',
							font: '500 1rem Inter',
							padding: '0 1em',
						}}
					>
						{user && user.email}
					</Typography>
				</Box>
			</Box>
			{user && user.isAdmin && (
				<Box>
					<Typography
						variant={'h4'}
						sx={{
							fontWeight: '600',
							fontFamily: 'Inter',
							margin: '1em',
						}}
					>
						Edit Products
					</Typography>
					<Box sx={{ margin: '2em' }}>
                        <CreateProductModal/>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Profile;
