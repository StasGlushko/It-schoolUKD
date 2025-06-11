import { FC } from 'react'
import s from './Courses.module.scss'
import { CourseCard } from '../../components/CourseCard/CourseCard'
import { useGetCoursesQuery } from '../../store/features/courses/coursesApi'

export const Courses: FC = () => {
	const { data: courses, error, isLoading } = useGetCoursesQuery()

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error: {(error as any).message}</p>	

	return (
		<main className={s.main}>
			<div className={s.container}>
				<h1 className={s.title}>Наші курси</h1>
				<p className={s.description}>
					Обирайте курс, який відповідає вашим цілям та почніть свій шлях у
					світі технологій вже сьогодні!
				</p>

				<div className={s.courseGrid}>
					{courses?.map(course => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
			</div>
		</main>
	)
}
