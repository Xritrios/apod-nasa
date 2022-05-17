import { configureStore } from '@reduxjs/toolkit';
import { getAPODReducer } from './reducers/getAPOD';

export const store = configureStore({
	reducer: {
		getAPOD: getAPODReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
