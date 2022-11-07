import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getProducts,
	addNewProduct,
	deleteSingleProduct
} from '../../api-functions';

const initialState = {
	products: [],
	productInfo: {
		id: '',
		title: '',
		content: '',
		image: ''
	}
	// todo, put title, content, image, loading state to the component
};
export const getProductsAsync = createAsyncThunk(
	'data/getProductsAsync',
	async () => await getProducts()
);

export const addProductAsync = createAsyncThunk(
	'data/addProductAsync',
	async (payload) => await addNewProduct(payload)
);

export const deleteProductAsync = createAsyncThunk(
	'data/deleteProductAsync',
	async (payload) => await deleteSingleProduct(payload)
);
export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProductInfo: (state, action) => {
			state.productInfo = {
				...state.productInfo,
				id: String(Math.random()),
				title: action.payload.title,
				content: action.payload.content,
				image: action.payload.image,
				author: {
					email: 'sample@email'
				}
			};
		},
		deleteSelectedProducts: (state, action) => {
			state.products = state.products.filter(
				(product) => !action.payload.includes(product.id)
			);
		},
		updateProduct: () => {}
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsync.fulfilled, (state, action) => {
			state.products = action.payload;
		}),
			builder.addCase(addProductAsync.fulfilled, (state, action) => {
				console.log(action);
				state.products = [...state.products, action.payload];
			}),
			builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
				console.log(action);
				state.products = state.products.filter(
					(product) => product.id !== action.payload
				);
			});
	}
});

// todo, import this state in the component with useSelector()
export const {
	addProduct,
	setProductInfo,
	deleteProduct,
	deleteSelectedProducts
} = productSlice.actions;
