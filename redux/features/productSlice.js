import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getProducts,
	addNewProduct,
	deleteSingleProduct,
	deleteSelectedProducts,
	getSingleProduct,
	updateSingleProduct
} from '../../api-functions';

const initialState = {
	products: [],
	productInfo: {
		id: '',
		title: '',
		content: '',
		image: ''
	},
	product: {}
};
export const getProductsAsync = createAsyncThunk(
	'data/getProductsAsync',
	async (payload) => await getProducts(payload)
);

export const getSingleProductAsync = createAsyncThunk(
	'data/getSingleProductAsync',
	async (payload) => await getSingleProduct(payload)
);

export const addProductAsync = createAsyncThunk(
	'data/addProductAsync',
	async (payload) => await addNewProduct(payload)
);

export const deleteProductAsync = createAsyncThunk(
	'data/deleteProductAsync',
	async (payload) => await deleteSingleProduct(payload)
);

export const deleteSelectedProductsAsync = createAsyncThunk(
	'data/deleteSelectedProductsAsync',
	async (payload) => await deleteSelectedProducts(payload)
);
export const updateSingleProductsAsync = createAsyncThunk(
	'data/updateSingleProductsAsync',
	async (payload, product) => await updateSingleProduct(payload, product)
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
				image: action.payload.image
				// author: {
				// 	email: action.payload.author.email
				// }
			};
		},
		updateProduct: () => {}
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsync.fulfilled, (state, action) => {
			state.products = action.payload;
		}),
			builder.addCase(getSingleProductAsync.fulfilled, (state, action) => {
				state.product = action.payload;
			});
		builder.addCase(addProductAsync.fulfilled, (state, action) => {
			console.log(action);
			state.products = [...state.products, action.payload];
		}),
			builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
				console.log(action);
				state.products = state.products.filter(
					(product) => product.id !== action.payload
				);
			}),
			builder.addCase(
				deleteSelectedProductsAsync.fulfilled,
				(state, action) => {
					console.log(action);
					state.products = state.products.filter(
						(product) => !action.payload.includes(product.id)
					);
				}
			);
	}
});
export const { setProductInfo } = productSlice.actions;
