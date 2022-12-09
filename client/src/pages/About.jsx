import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const About = () => {
	return (
		<Box className="about" sx={{ margin: '1em' }}>
			<Typography
				variant={'h4'}
				sx={{
					fontWeight: '600',
					fontFamily: 'Inter',
				}}
			>
				About
			</Typography>
			<Typography sx={{ margin: '.5em',maxWidth:'60%' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Lorem dolor sed viverra ipsum. Scelerisque eu ultrices vitae
				auctor. Eget gravida cum sociis natoque penatibus et magnis.
				Sagittis aliquam malesuada bibendum arcu vitae elementum
				curabitur vitae nunc. Diam vel quam elementum pulvinar etiam non
				quam lacus suspendisse. Quis vel eros donec ac odio tempor orci.
				Malesuada pellentesque elit eget gravida cum sociis natoque
				penatibus et. Nullam vehicula ipsum a arcu. Vulputate eu
				scelerisque felis imperdiet proin. Ornare suspendisse sed nisi
				lacus. Commodo quis imperdiet massa tincidunt nunc pulvinar
				sapien. Diam ut venenatis tellus in. 
			</Typography>
			<Typography sx={{ margin: '.5em',maxWidth:'70%' }}>
				Suspendisse faucibusinterdum posuere lorem ipsum dolor sit. Pretium aenean pharetra
				magna ac placerat vestibulum lectus. Ullamcorper velit sed
				ullamcorper morbi tincidunt ornare massa eget egestas. Aliquam
				sem fringilla ut morbi. Id diam vel quam elementum pulvinar
				etiam non. Convallis a cras semper auctor neque vitae tempus
				quam pellentesque. Suspendisse sed nisi lacus sed viverra
				tellus. Vitae tempus quam pellentesque nec nam. Fames ac turpis
				egestas maecenas pharetra convallis posuere morbi. Turpis massa
				tincidunt dui ut ornare lectus sit amet. Odio facilisis mauris
				sit amet massa vitae tortor condimentum. 
			</Typography>
			<Typography sx={{ margin: '.5em',maxWidth:'70%' }}>
				Quam lacus suspendisse faucibus interdum posuere. Tellus mauris a diam maecenas sed
				enim ut sem viverra. Bibendum est ultricies integer quis auctor.
				Luctus accumsan tortor posuere ac ut consequat semper viverra
				nam. Leo vel orci porta non pulvinar neque laoreet suspendisse.
				Tellus in metus vulputate eu scelerisque felis imperdiet proin.
				Donec massa sapien faucibus et molestie ac feugiat. Nunc id
				cursus metus aliquam eleifend. Turpis massa sed elementum
				tempus. Egestas dui id ornare arcu odio ut sem. Viverra ipsum
				nunc aliquet bibendum enim facilisis. Duis ultricies lacus sed
				turpis tincidunt id.
			</Typography>
		</Box>
	);
};

export default About;
