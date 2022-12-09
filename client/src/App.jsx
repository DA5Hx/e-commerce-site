import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './slice/productSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import Home from './pages/Home';
import Nav from './components/Nav';
import './App.css';
import Login from './pages/Login';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Order from './pages/Order';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Products from './components/Products';

function App() {
	const {user}= useSelector(state=>state.user);
	return (
		<div className="App">
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact-us" element={<ContactUs />} />
					{/* <Route path="/login" element={!user ? <Login /> : <Home/>} /> */}
					<Route path="/login" element={ <Login />} />
					<Route path="/signup" element={<Signup /> } />
					{/* <Route path="/signup" element={!user ? <Signup /> : <Home/>} /> */}
					<Route path="/search/:keyword" element={<Products />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/orders" element={<Order />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer/>
			</BrowserRouter>
		</div>
	);
}

export default App;
