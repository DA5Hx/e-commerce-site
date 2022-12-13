import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//get all products
export const getProducts = createAsyncThunk(
	'product/getProducts',
	async (keyword, { rejectWithValue }) => {
		// console.log(keyword)
		const res = await fetch(`/api/product/?keyword=${keyword?keyword:''}`);
		const data = await res.json();
		// console.log(data)
		if (res.ok) return data.products;
		return rejectWithValue(data.err);
	}
);

//get single product
export const getProductById = createAsyncThunk(
	'product/getProductById',
	async (id, { rejectWithValue }) => {
		// console.log('funtion called4');
		const res = await fetch(`/api/product/${id}`);
		const data = await res.json();
		// console.log(data);
		if (res.ok) return data.product;
		return rejectWithValue(data.err);
	}
);

//add a review
export const addreview = createAsyncThunk(
	'product/addreview',
	async (body, {rejectWithValue}) => {
		// console.log(body);
		const {id,rating,comment,token}=body;
		// console.log(id,rating,comment,token);
		const res = await fetch(
			`/api/product/add-review/${id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({
					rating,
					comment,
				}),
			}
		);
		const data = await res.json();
		// console.log(data);
		if (res.ok) return data.product;
		return rejectWithValue(data.err);
	}
);

//create a product --Admin
export const createProduct= createAsyncThunk(
	'product/createProduct',
	async (obj, {rejectWithValue}) => {
		const {token , body,images}=obj;
		//console.log(obj)
		// console.log(id,rating,comment,token);
		const formData = new FormData();
		// console.log(formData);
		// images.foreach(image=>{
		// 	formData.append(`images`,image);
		// })
		// let imagesfinal=[];
		for (const key of Object.keys(images)) {
			formData.append('images',images[key]);
		}
		// console.log(imagesfinal)
		// formData.append('images',imagesfinal);
		formData.append('request',JSON.stringify(body.request));
		// console.log(...formData);
		const res = await fetch(
			`/api/product/create/`,
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
				body: formData,
			}
		);
		const data = await res.json();
		// console.log(data);
		if (res.ok) return data.product;
		return rejectWithValue(data.err);
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState: {
		products: [],
		product: null,
		loading: false,
		error: '',
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
				state.error='';
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
				? action.payload
				: 'Cannot get Products at the moment';
			})
			.addCase(getProductById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
				state.error='';
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
				? action.payload
				: 'Could not get Product Details';
			})
			.addCase(addreview.pending, (state) => {
				state.loading = true;
			})
			.addCase(addreview.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
				state.error = '';
			})
			.addCase(addreview.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
					? action.payload
					: 'Could add a review';
			});
	},
});

// export const {getProducts} = productSlice.actions;
export default productSlice.reducer;
