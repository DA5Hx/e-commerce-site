import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BsEmojiNeutralFill } from 'react-icons/bs';

export const signup = createAsyncThunk(
	'user/signup',
	async (body, { rejectWithValue }) => {
		const res = await fetch('/api/user/signup/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(data));
			return data;
		} else return rejectWithValue(data.err);
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (body, { rejectWithValue }) => {
		const res = await fetch('/api/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const data = await res.json();

		// console.log(data.token);
		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(data));
			return data;
		} else return rejectWithValue(data.err);
	}
);
const userSlice = createSlice({
	name: 'user',
	initialState: {
		loading: false,
		user: localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user')).user
			: null,
		error: '',
		token: localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user')).token
			: null,
	},
	reducers:{
		logout: (state)=>{
			localStorage.removeItem('user');
			localStorage.removeItem('cart');
			localStorage.removeItem('orders');
			state.user=null;
			state.token=null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.loading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.loading = false;
				state.error = '';
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload : 'Cannot SignUp';
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.loading = false;
				state.error = '';
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload : 'Cannot SignIn';
			});
	},
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;
