import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './features/courses/coursesSlice.ts'
import { coursesApi } from './features/courses/coursesApi'

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coursesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch