import {
	Box,
	Button,
	Card,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import {LoadingButton} from '@mui/lab'
import { shadows } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../slice/userSlice';

const Signup = () => {
	const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const {user,error,loading,token}= useSelector(state=>state.user);

    const handlesubmit= ()=>{
		console.log(username,email,password)
        dispatch(signup({username,email,password}));
        console.log(token,error)
    }

	useEffect(() => {
		if (user) navigate(-1);
	}, [user]);

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
				Sign Up
			</Typography>
			<TextField
				sx={{ margin: '1.5em' }}
				label="Username"
				placeholder="Enter your Username"
				variant="standard"
				helperText={
					error === 'Field is empty' && username === '' ? error : ''
				}
				fullWidth
				required
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<TextField
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
				sx={{ margin: '1.5em' }}
				label="Password"
				type={'password'}
				placeholder="Enter your password"
				variant="standard"
				helperText={
					(error === 'Field is empty' && password === '') ||
					error === 'Not a strong password'
						? error
						: ''
				}
				fullWidth
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{(error === 'Cannot SignUp' || error === 'User already Exists') && (
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
					margin: '2em 0',
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
				Sign Up
			</LoadingButton>
			<Typography sx={{ '& a': { color: '#e97777' } }}>
				Already have an account ?{' '}
				<Link to="/login" variant="">
					SignIn here
				</Link>
			</Typography>
		</Container>
	);
};

export default Signup;
