import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Search = () => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	const handleCLick = (e) => {
		if (
			(e.type === 'keypress' && search.trim() && e.which == 13) ||
			(e.type === 'click' && search.trim() )
		) {
			navigate(`/search/${search}`);
		}
	};

	return (
		<motion.div
			className="search"
			initial={{ y: -1000 }}
			animate={{ y: 0 }}
			transition={{ type: 'spring', damping: 20 }}
		>
			<Input
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							sx={{ all: 'initial' }}
							onClick={handleCLick}
							disableTouchRipple
							size="small"
						>
							<FiSearch />
						</IconButton>
					</InputAdornment>
				}
				sx={{ paddingLeft: 1 }}
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyPress={handleCLick}
				// color='#e97777'
			/>
		</motion.div>
	);
};

export default Search;
