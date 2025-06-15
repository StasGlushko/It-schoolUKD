import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICourse } from '../../../types/Types'

export const coursesApi = createApi({
	reducerPath: 'coursesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5065/api',
		prepareHeaders: headers => {
			const token = localStorage.getItem('adminToken') // або інша назва
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Course'],
	endpoints: builder => ({
		getCourses: builder.query<ICourse[], void>({
			query: () => 'Courses',
			providesTags: ['Course'],
		}),
		getCourseById: builder.query<ICourse, number>({
			query: id => `Courses/${id}`,
		}),
		createCourse: builder.mutation<void, FormData>({
			query: formData => ({
				url: `Courses`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Course'],
		}),
		updateCourse: builder.mutation<void, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `Courses/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Course'],
		}),
		deleteCourse: builder.mutation<void, number>({
			query: id => ({
				url: `Courses/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Course'],
		}),
	}),
})

export const {
	useGetCoursesQuery,
	useGetCourseByIdQuery,
	useDeleteCourseMutation,
	useCreateCourseMutation,
	useUpdateCourseMutation,
} = coursesApi
