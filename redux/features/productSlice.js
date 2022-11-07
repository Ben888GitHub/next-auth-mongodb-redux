import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	productInfo: {
		title: '',
		content: ''
	}
	// todo, put title, content, image, loading state to the component
};
export const getProductsAsync = createAsyncThunk(
	'data/getProductsAsync',
	async () => {
		const res = await fetch(
			'https://next-auth-mongodb-redux-usages.vercel.app/api/products',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const allProducts = await res.json();
		console.log(allProducts.data);
		return allProducts.data;
	}
);

export const addProductAsync = createAsyncThunk(
	'data/addProductAsync',
	async (payload) => {
		console.log(payload);
		const res = await fetch(
			'https://next-auth-mongodb-redux-usages.vercel.app/api/products',
			{
				method: 'POST',
				body: JSON.stringify(payload)
			}
		);
		const newProduct = await res.json();
		console.log(newProduct);
		return payload;
	}
);
export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProductInfo: (state, action) => {
			state.productInfo = {
				...state.productInfo,
				title: action.payload.title,
				content: action.payload.content,
				author: {
					email: 'sample@email'
				}
			};
		},
		deleteProduct: (state, action) => {
			state.products = state.products.filter(
				(product) => product._id !== action.payload
			);
		},
		deleteSelectedProducts: (state, action) => {
			state.products = state.products.filter(
				(product) => !action.payload.includes(product._id)
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
