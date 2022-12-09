import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ThemeProvider
			theme={createTheme({
				typography: { fontFamily: 'Inter' },
			})}
		>
			<App />
		</ThemeProvider>
	</Provider>
);
