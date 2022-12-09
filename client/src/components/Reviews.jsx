import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import { MdBorderClear, MdStar } from 'react-icons/md';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import { motion } from 'framer-motion';
import { addreview, getProductById } from '../slice/productSlice';
const Reviews = ({ product }) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch= useDispatch();
	const {token}= useSelector(state=>state.user); 

	const handlesubmit = ()=>{
		dispatch(addreview({id:product._id,rating,comment,token}));
		// dispatch(getProductById(product._id));
	}
	
	return (
		<Box sx={{ margin: '2em 5.1em' }}>
			<Grid container>
				<Grid item xs={8}>
					<Typography
						sx={{
							color: '#e97777',
							margin: '.3em 0',
							font: '600 1.4em Palanquin Dark',
						}}
					>
						Reviews :
					</Typography>
					<Divider />
					{product &&
						product.reviews.map((review) => {
							return (
								<Box key={review._id}>
									<Divider />
									<Box
										display="flex"
										sx={{ gap: '.7em', margin: '1em 0' }}
									>
										<Typography
											sx={{
												color: '#eb9393',
												textTransform: 'Capitalize',
												marginRight: '.4em',
												font: '600 1.2em Inter',
											}}
										>
											{review.username}
										</Typography>
										<Box
											display="flex"
											sx={{
												alignItems: 'center',
												justifyContent: 'center',
												minWidth: '3em',
												borderRadius: '10px',
												marginLeft: 'auto',
												backgroundColor: '#e97777',
											}}
										>
											<Typography
												sx={{
													color: '#fff',
													marginRight: '.2em',
													font: '1em Inter',
												}}
											>
												{review.rating}
											</Typography>
											<MdStar
												className="icon--white"
												size={'1em'}
											/>
										</Box>
									</Box>
									<Box
										display="flex"
										sx={{ gap: '.7em', margin: '1.3em 0' }}
									>
										<Typography
											sx={{
												color: '#333',
												font: '400 1.1em Inter',
											}}
										>
											{review.comment}
										</Typography>
										<Typography
											sx={{
												color: '#333',
												marginLeft: 'auto',
												font: '1em Inter',
											}}
										>
											{moment(
												review.createdAt.toString()
											).calendar()}
										</Typography>
									</Box>
									<Divider />
								</Box>
							);
						})}
				</Grid>
				<Grid item xs={4} sx={{ padding: '0 5em' }}>
					{token ? (
						<Box>
							<Typography
								sx={{
									color: '#e97777',
									margin: '.3em 0 .7em 0',
									font: '600 1.4em Palanquin Dark',
								}}
							>
								Add a Review
							</Typography>
							<FormControl>
								<Select
									value={rating}
									onChange={(e) => setRating(e.target.value)}
									sx={{ fontSize: '1rem' }}
								>
									<MenuItem value={0} disabled>
										Rate the Product
									</MenuItem>

									<MenuItem value={1}>1 Worst</MenuItem>
									<MenuItem value={2}>2 Poor</MenuItem>
									<MenuItem value={3}>3 Decent</MenuItem>
									<MenuItem value={4}>4 Good</MenuItem>
									<MenuItem value={5}>5 Excellent</MenuItem>
								</Select>
							</FormControl>
							<TextField
								variant="standard"
								placeholder="Write you comment..."
								sx={{
									display: 'block',
									'& .MuiInputBase-input': {
										fontSize: '1.1rem',
										marginTop: '.7em',
									},
								}}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
							<Button
								sx={{
									color: '#e97777',
									border: '3px solid #e97777',
									margin: '3.5em 0',
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
								onClick={handlesubmit}
							>
								Submit
							</Button>
						</Box>
					) : (
						<Typography
							className="error"
							variant="h5"
							fontFamily={'Palanquin Dark'}
							component={motion.h5}
							initial={{ opacity: 0 }}
							animate={{
								scale: [1, 1.1, 1],
								opacity: 1,
								color: '#e97777',
							}}
							transition={{ duration: 0.4 }}
						>
							Login to Add a Review
						</Typography>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Reviews;
