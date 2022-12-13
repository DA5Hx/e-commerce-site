import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
	MdLogin,
	MdOutlineShoppingCart,
	MdProductionQuantityLimits,
} from 'react-icons/md';
import { motion, useVisualElementContext } from 'framer-motion';
import { Badge, Box, Button, Typography } from '@mui/material';
import Search from './Search';
import { color } from '@mui/system';
import { IconContext } from 'react-icons/lib';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slice/userSlice';
import { getCartItems } from '../slice/cartSlice';

const Nav = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [nav, setNav] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 90) setNav(true);
			else setNav(false);
		});
		return () => {
			window.removeEventListener('scroll');
		};
	}, []);
	const { token, user } = useSelector((state) => state.user);
	const {items}= useSelector(state=>state.cart);
	return (
		<div className={`nav ${nav ? 'active' : ''}`}>
			<motion.h4
				initial={{ x: -1000 }}
				animate={{ x: 0 }}
				transition={{ type: 'spring', damping: 20 }}
			>
				<Link to={'/'} className="logo">
					E-commerce
				</Link>
			</motion.h4>
			<motion.div
				className="navlinks"
				initial={{ y: -1000 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', damping: 20 }}
			>
				<NavLink to={'/'} className="link">
					<motion.span
						whileHover={{ borderBottom: '5px solid #e97777' }}
						transition={{ duration: 0.3 }}
					>
						Home
					</motion.span>
				</NavLink>
				<NavLink to={'/about'} className="link">
					<motion.span
						whileHover={{ borderBottom: '5px solid #e97777' }}
						transition={{ duration: 0.3 }}
					>
						About
					</motion.span>
				</NavLink>
				<NavLink to={'/contact-us'} className="link">
					<motion.span
						whileHover={{ borderBottom: '5px solid #e97777' }}
						transition={{ duration: 0.3 }}
					>
						Contact
					</motion.span>
				</NavLink>
			</motion.div>
			<Search />
			<motion.div
				className="right"
				initial={{ x: 500 }}
				animate={{ x: 0 }}
				transition={{ type: 'spring', damping: 20 }}
			>
				{token ? (
					<Box
						display={'flex'}
						gap={'1em'}
						sx={{ alignItems: 'center' }}
					>
						<Typography
							sx={{
								textTransform: 'capitalize',
								font: '600 1rem Palanquin Dark',
								'& a':{
									color: '#e97777',
								},
								marginLeft: '.3em',
							}}
						>
							<Link to="/profile">{user.username}</Link>
						</Typography>
						<Button
							sx={{
								color: '#333',
								border: '3px solid #333',
								padding: '.3em .7em',
								textTransform: 'none',
								':hover': {
									// color: '#e97777',
									border: '3px solid #e97777',
									backgroundColor: '#e97777',
									color: '#fff',
									'& path': {
										color: '#fff',
									},
									'& .css-9tj150-MuiButton-endIcon': {
										marginLeft: 'none',
									},
								},
							}}
							variant="outlined"
							onClick={() => {
								dispatch(logout());
								// console.log(user);
							}}
							endIcon={<MdLogin className="icon" />}
							className="logout"
						>
							Logout
						</Button>
					</Box>
				) : (
					<Button
						sx={{
							color: '#333',
							border: '3px solid #333',
							padding: '.3em .7em',

							textTransform: 'none',
							':hover': {
								// color: '#e97777',
								border: '3px solid #e97777',
								backgroundColor: '#e97777',
								color: '#fff',
								'& path': {
									color: '#fff',
								},
							},
						}}
						variant="outlined"
						onClick={() => navigate('/login')}
						endIcon={<MdLogin className="icon" />}
						className="signin"
					>
						Sign In
					</Button>
				)}
				{token && (
					<Typography
						sx={{
							textTransform: 'capitalize',
							font: '600 1rem Palanquin Dark',
							'& a': {
								color: '#e97777',
							},
						}}
					>
						<Link to="/orders">My Order</Link>
					</Typography>
				)}
				<Badge
					badgeContent={items ? items.length : 'none'}
					component={motion.div}
					sx={{
						'& .MuiBadge-badge': {
							backgroundColor: '#e97777',
							color: '#fff',
						},
					}}
					whileHover={{ scale: [1, 1.2, 1] }}
					transition={{ ease: 'easeInOut', duration: 0.5 }}
					onClick={() => {
						dispatch(getCartItems(token));
						navigate('/cart');
					}}
				>
					<IconContext.Provider value={{ size: '1.5em' }}>
						<MdOutlineShoppingCart className="cart" />
					</IconContext.Provider>
				</Badge>
			</motion.div>
		</div>
	);
};

export default Nav;
