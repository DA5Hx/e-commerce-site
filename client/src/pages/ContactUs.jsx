import { Box, Typography } from '@mui/material';
import React from 'react';

const ContactUs = () => {
	return (
		<Box className="about" sx={{ margin: '1em' }}>
			<Typography
				variant={'h4'}
				sx={{
					fontWeight: '600',
					fontFamily: 'Inter',
				}}
			>
				Contact-us
			</Typography>
			<Typography sx={{ margin: '.5em', maxWidth: '60%' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
				ipsum suspendisse ultrices gravida dictum fusce ut placerat
				orci. Facilisis volutpat est velit egestas dui id ornare arcu
				odio. Mauris augue neque gravida in. Urna nec tincidunt praesent
				semper feugiat. Mattis nunc sed blandit libero volutpat sed
				cras. Elementum integer enim neque volutpat. Est velit egestas
				dui id ornare arcu. Placerat in egestas erat imperdiet.
				Scelerisque purus semper eget duis at tellus at. Velit
				scelerisque in dictum non. Sed nisi lacus sed viverra. Sed
				tempus urna et pharetra pharetra massa massa ultricies.
				Ullamcorper eget nulla facilisi etiam dignissim diam. Egestas
				purus viverra accumsan in nisl nisi scelerisque. Viverra ipsum
				nunc aliquet bibendum enim. Morbi tristique senectus et netus et
				malesuada. Mauris rhoncus aenean vel elit.
			</Typography>
			<Typography sx={{ margin: '.5em', maxWidth: '70%' }}>
				Pellentesque pulvinarpellentesque habitant morbi tristique
				senectus et netus et. Quis imperdiet massa tincidunt nunc
				pulvinar sapien et ligula. Nec nam aliquam sem et tortor
				consequat id porta nibh. Sed id semper risus in hendrerit. Cras
				fermentum odio eu feugiat pretium nibh ipsum consequat. Praesent
				tristique magna sit amet purus. Malesuada fames ac turpis
				egestas sed tempus urna et pharetra. Arcu bibendum at varius
				vel. Pretium fusce id velit ut tortor pretium. Dignissim diam
				quis enim lobortis scelerisque fermentum dui faucibus in.
				Ultrices neque ornare aenean euismod elementum nisi quis
				eleifend. Libero volutpat sed cras ornare arcu dui. Suspendisse
				ultrices gravida dictum fusce ut placerat orci.
			</Typography>
		</Box>
	);
};

export default ContactUs;
