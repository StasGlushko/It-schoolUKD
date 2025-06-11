import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICourse } from '../../../types/Types'

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5065/api/' }),
  endpoints: (builder) => ({
    getCourses: builder.query<ICourse[], void>({
      query: () => 'Courses',
    }),
    getCourseById: builder.query<ICourse, number>({
      query: (id) => `Courses/${id}`,
    }),
  }),
})

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi
