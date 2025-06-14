import { FC } from 'react'
import { ICourse } from '../../types/Types'
import s from './CourseCard.module.scss'
import { NavLink } from 'react-router-dom'
import { Paths } from './../../routing/paths'

interface IProps {
	course: ICourse
}

export const CourseCard: FC<IProps> = ({ course }) => {
	const { shortDescription, duration, id, imageUrl, title } = course

	return (
		<div className={s.courseCard}>
			<div className={s.courseImageContainer}>
				<img
					src={imageUrl || '/placeholder.svg'}
					alt={title}
					className={s.courseImage}
				/>
			</div>
			<div className={s.courseContent}>
				<div>
					<h3 className={s.courseTitle}>{title}</h3>
					<p className={s.courseDescription}>{shortDescription}</p>
				</div>
				<div className={s.courseFooter}>
					<span className={s.courseDuration}>{duration}</span>
					<NavLink
						to={Paths.courses + '/' + id}
						className={s.courseButton}>
						Детальніше
					</NavLink>
				</div>
			</div>
		</div>
	)
}
