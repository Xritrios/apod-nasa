import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '..';
import { APOD } from '../../types';

export interface GetAPODState {
	apod: APOD;
	loaded: boolean;
	loading: boolean;
	error: string;
}

const initialState: GetAPODState = {
	apod: {
		url: '',
		title: '',
		description: '',
	},
	loaded: false,
	loading: false,
	error: '',
};

const getAPODSlice = createSlice({
	name: 'getAPOD',
	initialState,
	reducers: {
		getAPODRequestInit(state) {
			state.error = '';
			state.loading = true;
			state.loaded = false;
		},
		getAPODSuccess(state, { payload }) {
			state.apod = {
				url: payload.url,
				title: payload.title,
				description: payload.explanation,
			};
			state.loaded = true;
			state.loading = false;
		},
		getAPODFailure(state, { payload }) {
			state.error = payload;
			state.loaded = false;
			state.loading = false;
		},
	},
});

const { getAPODRequestInit, getAPODSuccess, getAPODFailure } =
	getAPODSlice.actions;

export const getAPODRequest =
	(date: string) => async (dispatch: AppDispatch) => {
		dispatch(getAPODRequestInit());
		try {
			const { data } = await axios.get(
				'https://api.nasa.gov/planetary/apod?api_key=' +
					process.env.REACT_APP_API_KEY +
					'&date=' +
					date
			);
			dispatch(getAPODSuccess(data));
		} catch (error: any) {
			dispatch(getAPODFailure(error.response.data.msg));
		}
	};

export const { reducer: getAPODReducer } = getAPODSlice;
