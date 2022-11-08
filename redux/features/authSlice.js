import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../../api-functions';

const initialState = {
	userInfo: {
		email: '',
		password: ''
	}
};

export const createNewUserAsync = createAsyncThunk(
	'data/createNewUserAsync',
	async (payload) => await registerUser(payload)
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = {
				...state.userInfo,
				id: String(Math.random()),
				email: action.payload.email,
				password: action.payload.password
			};
		}
	}
});

export const { setUserInfo } = authSlice.actions;
