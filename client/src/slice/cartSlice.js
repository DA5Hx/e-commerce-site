import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async (token, { rejectWithValue }) => {
		const res = await fetch('/api/cart/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		console.log(data);
		if (res.ok) {
			if(data.cart)
				localStorage.setItem('cart', JSON.stringify(data.cart));
			return data.cart;
		}
		return rejectWithValue(data.err);
	}
);

export const addCartItem = createAsyncThunk(
	'cart/addCartItem',
	async (body, { rejectWithValue }) => {
		console.log(body);
		const { productId, quantity, token } = body;
		const res = await fetch('/api/cart/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				productId,
				quantity,
			}),
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			localStorage.setItem('cart', JSON.stringify(data.cart));
			return data.cart;
		}
		return rejectWithValue(data.err);
	}
);

export const deleteCartItem = createAsyncThunk(
	'cart/deleteCartItem',
	async (body, { rejectWithValue }) => {
		const { id, token } = body;
		const res = await fetch(`api/cart/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		if (res.ok) {
			if (data.cart) localStorage.setItem('cart', JSON.stringify(data.cart));
			return data.cart;
		}
		return rejectWithValue(data.err);
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		loading: false,
		total: localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart')).total
			: null,
		error: null,
		items: localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart')).items
			: [],
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCartItems.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				const { items, total } = action.payload;
				state.loading = false;
				state.error = null;
				state.items = items;
				state.total = total;
			})
			.addCase(getCartItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
					? action.payload
					: 'Cannot get Cart Items';
			})
			.addCase(addCartItem.pending, (state) => {
				state.loading = true;
			})
			.addCase(addCartItem.fulfilled, (state, action) => {
				const { items, total } = action.payload;
				console.log(action.payload);
				state.loading = false;
				state.error = null;
				state.items = items;
				state.total = total;
			})
			.addCase(addCartItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
					? action.payload
					: 'Cannot get Cart Items';
			})
			.addCase(deleteCartItem.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteCartItem.fulfilled, (state, action) => {
				const { items, total } = action.payload;
				state.loading = false;
				state.error = null;
				state.items = items;
				state.total = total;
			})
			.addCase(deleteCartItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
					? action.payload
					: 'Cannot get Cart Items';
			});
	},
});

export default cartSlice.reducer;
