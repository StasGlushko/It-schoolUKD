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
	endpoints: builder => ({
		getCourses: builder.query<ICourse[], void>({
			query: () => 'Courses',
		}),
		getCourseById: builder.query<ICourse, number>({
			query: id => `Courses/${id}`,
		}),
		deleteCourse: builder.mutation<void, number>({
			query: id => ({
				url: `Courses/${id}`,
				method: 'DELETE',
			}),
			// invalidatesTags: ['Course'], // якщо додаси tag у getCourses
		}),
	}),
})

export const { useGetCoursesQuery, useGetCourseByIdQuery, useDeleteCourseMutation } = coursesApi
