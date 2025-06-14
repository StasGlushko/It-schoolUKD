import { FC } from 'react'
import s from './CourseInfoCards.module.scss'
import { useGetCoursesQuery } from '../../store/features/courses/coursesApi'

export const CourseInfoCards: FC = () => {
	const { data: courses, error, isLoading } = useGetCoursesQuery()

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error: {(error as any).message}</p>

	return (
		<>
			{courses?.map(({ title, description, imageUrl, id }, i) => {
				if (i > 3) return
				return (
					<div key={id} className={s.courseCard}>
						<div className={s.courseImageWrapper}>
							<img
								src={imageUrl}
								alt='Інформаційні технології та програмування'
								width={350}
								height={200}
								className={s.courseImage}
							/>
						</div>
						<div className={s.courseContent}>
							<h3 className={s.courseTitle}>{title} </h3>
							<p className={s.courseDescription}>{description}</p>
						</div>
					</div>
				)
			})}
		</>
	)
}
