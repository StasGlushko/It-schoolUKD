import { FC } from 'react'
import s from './AdvantageCard.module.scss'

interface IProps {
	number: number
	text: string
}

export const AdvantageCard: FC<IProps> = ({ number, text }) => {
	return <li className={s.card}>{number} {text}</li>
}
