import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/authSlice';
import { productSlice } from './features/productSlice';

export const store = configureStore({
	reducer: {
		[productSlice.name]: productSlice.reducer,
		[authSlice.name]: authSlice.reducer
	}
});
