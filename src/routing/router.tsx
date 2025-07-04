import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '../pages/Router-error-page/Error-page'
import { Paths } from './paths'
import { App } from '../pages/App'
import { Home } from '../pages/Home/Home'
import { About } from '../pages/About/About'
import { Courses } from '../pages/Courses/Courses'
import { CourseDetail } from '../pages/Courses/CourseDetail/CourseDetail'
import { AdminLogin } from '../pages/Admin/Login/Login'
import { AdminDashboard } from '../pages/Admin/Dashboard/Dashboard'

export const router = createBrowserRouter(
	[
		{
			path: Paths.home,
			element: <App />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: '',
					element: <Home />,
				},
				{
					path: Paths.about,
					element: <About />,
				},
				{
					path: Paths.courses,
					element: <Courses />,
				},
				{
					path: Paths.course,
					element: <CourseDetail />,
				},
			],
		},
		{
			path: Paths.admin,
			element: <AdminLogin />,
			errorElement: <ErrorPage />,
		},
		{
			path: Paths.adminDashboard,
			element: <AdminDashboard />,
			errorElement: <ErrorPage />,
		},
	],
	{
		basename: '/It-schoolUKD', // ← ОЦЕ додай
	},
)
