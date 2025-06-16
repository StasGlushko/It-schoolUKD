import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICourseRegistrations } from '../../../types/Types'

export const courseRegistrationsApi = createApi({
	reducerPath: 'courseRegistrationsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://ukd-it-school.onrender.com/api',
		prepareHeaders: headers => {
			const token = localStorage.getItem('adminToken') // або інша назва
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['CourseRegistrations'],
	endpoints: builder => ({
		getCourseRegistrations: builder.query<ICourseRegistrations[], void>({
			query: () => 'CourseRegistrations',
			providesTags: ['CourseRegistrations'],
		}),
		createCourseRegistrations: builder.mutation<
			ICourseRegistrations,
			{
				firstName: string
				lastName: string
				phoneNumber: string
				courseId: number
			}
		>({
			query: body => ({
				url: `CourseRegistrations`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['CourseRegistrations'],
		}),
		deleteCourseRegistrationsById: builder.mutation<void, number>({
			query: id => ({
				url: `CourseRegistrations/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CourseRegistrations'],
		}),
	}),
})

export const {
	useCreateCourseRegistrationsMutation,
	useDeleteCourseRegistrationsByIdMutation,
	useGetCourseRegistrationsQuery,
} = courseRegistrationsApi
