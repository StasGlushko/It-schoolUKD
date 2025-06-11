import { FC } from 'react'
import s from './CourseInfoCard.module.scss'

interface IProps {
	name: string
	description: string
}

export const CourseInfoCard: FC<IProps> = ({ name, description }) => {
	return (
		<li className={s.card}>
			<div className={s.imgBlock}></div>
			<div className={s.info}>
				<h3 className={s.name}>{name}</h3>
				<p className={s.description}>{description}</p>
			</div>
		</li>
	)
}
