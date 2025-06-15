import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITeachers } from '../../../types/Types'

export const teachersApi = createApi({
	reducerPath: 'teachersApi',
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
	tagTypes: ['Teachers'],
	endpoints: builder => ({
		getTeachers: builder.query<ITeachers[], void>({
			query: () => 'Teachers',
			providesTags: ['Teachers'],
		}),
		getTeacherById: builder.query<ITeachers, number>({
			query: id => `Teachers/${id}`,
		}),
		createTeacher: builder.mutation<void, FormData>({
			query: formData => ({
				url: `Teachers`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Teachers'],
		}),
		updateTeacher: builder.mutation<void, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `Teachers/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Teachers'],
		}),
		deleteTeacher: builder.mutation<void, number>({
			query: id => ({
				url: `Teachers/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Teachers'],
		}),
	}),
})

export const {
	useGetTeachersQuery,
	useGetTeacherByIdQuery,
	useDeleteTeacherMutation,
	useCreateTeacherMutation,
	useUpdateTeacherMutation,
} = teachersApi
