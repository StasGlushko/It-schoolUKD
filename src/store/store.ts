import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './features/courses/coursesSlice.ts'
import { coursesApi } from './features/courses/coursesApi'
import { authApi } from './features/api/authApi.ts'
import { teachersApi } from './features/teachers/teachersApi.ts'
import { courseRegistrationsApi } from './features/course-registrations/course-registrationsApi.ts'

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		[coursesApi.reducerPath]: coursesApi.reducer,
		[teachersApi.reducerPath]: teachersApi.reducer,
		[courseRegistrationsApi.reducerPath]: courseRegistrationsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(coursesApi.middleware)
			.concat(teachersApi.middleware)
			.concat(courseRegistrationsApi.middleware)
			.concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
