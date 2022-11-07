import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	productInfo: {
		id: '',
		title: '',
		content: '',
		image: ''
	}
	// title: '',
	// content: '',
	// image: ''
	// loading: false
	// todo, put title, content, image, loading state to the component
};

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.products = [...state.products, action.payload];
		},
		setProductInfo: (state, action) => {
			state.productInfo = {
				...state.productInfo,
				id: String(Math.random()),
				title: action.payload.title,
				content: action.payload.content,
				image: action.payload.image
			};
		},
		deleteProduct: (state, action) => {
			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
		},
		deleteSelectedProducts: (state, action) => {
			// console.log(action);
			state.products = state.products.filter(
				(product) => !action.payload.includes(product.id)
			);
		},
		updateProduct: () => {}
	}
});

// todo, import this state in the component with useSelector()
export const {
	addProduct,
	setProductInfo,
	deleteProduct,
	deleteSelectedProducts
} = productSlice.actions;
