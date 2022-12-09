import React from 'react';
import { Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const Filter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	return <div className="filters"></div>;
};

export default Filter;
