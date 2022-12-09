import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/productSlice';
import userReducer from './slice/userSlice';
import cartReducer from './slice/cartSlice';
import orderReducer from './slice/orderSlice';


export const store = configureStore({
	reducer: combineReducers({
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
        order:orderReducer
    }),
});
