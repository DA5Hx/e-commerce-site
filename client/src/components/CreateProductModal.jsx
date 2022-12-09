import React, { createFactory, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Input, InputLabel, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../slice/productSlice';
import { motion } from 'framer-motion';

const CreateProductModal = () => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState('');
	const [description, setDescription] = useState('');
	const [images, setImages] = useState([]);
	const [message, setMessage] = useState('')


	const {token } = useSelector(state=>state.user)
	const dispatch = useDispatch();
	const handleSubmit = async ()=>{
		// console.log('submited');		
		// console.log(images);
		if(!name || !price || !category || !stock || !description)
		{
			setMessage('Fill all required fields')
			setTimeout(()=>setMessage(''),1000)
			return;
		}
		await dispatch(
			createProduct({
				body: {
					request: { name, price, stock, category, description },
				},
				images,
				token
			})
		);
		setOpen(false);
		setMessage('Successfully Added the Product');
		setTimeout(() => setMessage(''), 1000);
		return;
	}
	
	return (
		<div>
			<Button
				sx={{
					color: '#e97777',
					border: '3px solid #e97777',
					margin: '.5em 0 1em 0',
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
				onClick={() => setOpen(true)}
			>
				Create Product
			</Button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					overflow: 'scroll',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '70%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						// width: 400,
						width: '40%',
						bgcolor: 'background.paper',
						border: '2px solid #333',
						boxShadow: 24,
						p:4,
					}}
				>
					<Typography
						component="h1"
						sx={{
							color: '#e97777',
							margin: '.3em 0',
							font: '600 1.4em Palanquin Dark',
						}}
					>
						Create a Product
					</Typography>
					<Box sx={{ margin: '2em' }}>
						<InputLabel
							sx={{
								fontWeight: '600',
								color: '#FF9F9F',
								margin: '.5em 0 .3em 0',
							}}
						>
							Name :
						</InputLabel>
						<TextField
							variant="outlined"
							placeholder="Name of the product *"
							value={name}
							required
							onChange={(e) => setName(e.target.value)}
						/>
						<InputLabel
							sx={{
								fontWeight: '600',
								color: '#FF9F9F',
								margin: '.5em 0 .3em 0',
							}}
						>
							Price :
						</InputLabel>
						<TextField
							variant="outlined"
							// label="Name"
							type="number"
							placeholder="Price of the product *"
							required
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<InputLabel
							sx={{
								fontWeight: '600',
								color: '#FF9F9F',
								margin: '.5em 0 .3em 0',
							}}
						>
							Stock :
						</InputLabel>
						<TextField
							variant="outlined"
							// label="Name"
							type="number"
							placeholder="Stock *"
							required
							value={stock}
							onChange={(e) => setStock(e.target.value)}
						/>
						<InputLabel
							sx={{
								fontWeight: '600',
								color: '#FF9F9F',
								margin: '.5em 0 .3em 0',
							}}
						>
							Category :
						</InputLabel>
						<TextField
							variant="outlined"
							// label="Name"
							placeholder="Category *"
							required
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						{/* <Autocomplete
							// multiple
							// id="tags-filled"
							options={['check', 'child', 'copy', 'working']}
							// fullWidth
							freeSolo
							// value={category}
							onChange={(e, value) => setCategory(value)}
							renderInput={(params) => <TextField {...params} />}
						/> */}
						<InputLabel
							sx={{
								fontWeight: '600',
								color: '#FF9F9F',
								margin: '.5em 0 .3em 0',
							}}
						>
							Desctiption :
						</InputLabel>
						<TextField
							variant="outlined"
							// label="Name"
							multiline
							fullWidth
							rows={4}
							required
							placeholder="Add a Description *"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<InputLabel
							sx={{
								fontWeight: '600',
								color: '#FF9F9F',
								margin: '.5em 0 .3em 0',
							}}
						>
							Images :
						</InputLabel>
						<TextField
							type={'file'}
							// label="Name"
							inputProps={{
								multiple: true,
								accept: 'image/*',
							}}
							onChange={(e) => setImages(e.target.files)}
						/>
						{message && (
							<Typography
								className="message"
								fontFamily={'Palanquin Dark'}
								component={motion.p}
								initial={{ opacity: 0 }}
								animate={{
									scale: [1, 1.1, 1],
									opacity: 1,
									color: '#e97777',
								}}
								transition={{ duration: 0.4 }}
							>
								{message}
							</Typography>
						)}
						<Button
							sx={{
								color: '#e97777',
								border: '3px solid #e97777',
								margin: '2em 0',
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
							onClick={handleSubmit}
						>
							Create Product
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export default CreateProductModal;
