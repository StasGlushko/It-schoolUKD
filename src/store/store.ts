import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './features/courses/coursesSlice.ts'
import { coursesApi } from './features/courses/coursesApi'
import { authApi } from './features/api/authApi.ts'

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		[coursesApi.reducerPath]: coursesApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(coursesApi.middleware)
			.concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
