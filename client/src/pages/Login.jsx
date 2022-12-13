import { LoadingButton } from '@mui/lab';
import {
	Box,
	Button,
	Card,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import { shadows } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../slice/userSlice';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const { user, loading, error, token } = useSelector((state) => state.user);

	const handlesubmit = () => {
		dispatch(login({ email, password }));
		// console.log(token, error);
	};

	useEffect(()=>{
		if(user)
			navigate(-1);
	},[user]);

	return (
		<Container
			maxWidth="false"
			sx={{
				maxWidth: '30%',
				// height:'calc(100vh-152px)',
				display: 'flex',
				marginTop: '10vh',
				flexDirection: 'column',
				alignItems: 'center',
				border: '2px solid #e97777',
				boxShadow:
					'0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)',
				padding: '2em',
			}}
		>
			<Typography
				sx={{ font: '600 1.5rem Palanquin Dark', color: '#e97777' }}
			>
				Sign In
			</Typography>
			<TextField
				sx={{ margin: '1.5em' }}
				label="E-mail"
				placeholder="Enter your E-mail"
				variant="standard"
				helperText={
					(error === 'Field is empty' && email === '') ||
					error === 'Not a valid email'
						? error
						: ''
				}
				fullWidth
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				label="Password"
				placeholder="Enter your password"
				type="password"
				variant="standard"
				helperText={
					(error === 'Field is empty' && password === '') ||
					error === 'Password does not match'
						? error
						: ''
				}
				fullWidth
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{(error === 'Cannot SignIn' ||
				error === 'User does not Exists') && (
				<Typography
					sx={{
						font: '600 1rem Inter',
						color: '#e97777',
						marginTop: '1em',
					}}
				>
					{error}
				</Typography>
			)}
			<LoadingButton
				loading={loading}
				disabled={loading}
				sx={{
					color: '#e97777',
					border: '3px solid #e97777',
					margin: '3.5em 0',
					fontSize: '1.1rem',
					textTransform: 'none',
					transition: '.5s ease-in',
					':hover': {
						// color: '#e97777',
						border: '2px solid #e97777',
						backgroundColor: '#e97777',
						color: '#fff',
					},
				}}
				variant="outlined"
				fullWidth
				onClick={handlesubmit}
			>
				Sign In
			</LoadingButton>
			<Typography sx={{ '& a': { color: '#e97777' } }}>
				Dont have an account ?<Link to="/signup">SignUp here</Link>
			</Typography>
		</Container>
	);
};

export default Login;
