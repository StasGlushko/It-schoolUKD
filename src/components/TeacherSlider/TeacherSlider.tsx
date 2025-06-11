import { FC, useEffect, useRef, useState } from 'react'
import s from './TeacherSlider.module.scss'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export const TeacherSlider: FC = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const sliderRef = useRef<HTMLDivElement>(null)

	const handlePrev = () => {
		setCurrentIndex(prev => (prev === 0 ? teachers.length - 1 : prev - 1))
	}

	const handleNext = () => {
		setCurrentIndex(prev => (prev === teachers.length - 1 ? 0 : prev + 1))
	}

	useEffect(() => {
		if (sliderRef.current) {
			const scrollPosition = currentIndex * (250 + 16) // card width + gap
			sliderRef.current.scrollTo({
				left: scrollPosition,
				behavior: 'smooth',
			})
		}
	}, [currentIndex])

	return (
		<div className={s.sliderContainer}>
			<div className={s.sliderControls}>
				<button
					className={s.sliderButton}
					aria-label='Previous teacher'
					onClick={handlePrev}>
					<BiChevronLeft className={s.sliderIcon} />
				</button>
				<button
					className={s.sliderButton}
					aria-label='Next teacher'
					onClick={handleNext}>
					<BiChevronRight className={s.sliderIcon} />
				</button>
			</div>

			<div className={s.sliderTrack} ref={sliderRef}>
				{teachers.map(teacher => (
					<div key={teacher.id} className={s.teacherCard}>
						<div className={s.teacherImageWrapper}>
							<img
								src={teacher.image || '/placeholder.svg'}
								alt={teacher.name}
								width={200}
								height={200}
								className={s.teacherImage}
							/>
						</div>
						<h3 className={s.teacherName}>{teacher.name}</h3>
						<p className={s.teacherCourse}>{teacher.course}</p>
					</div>
				))}
			</div>
		</div>
	)
}

// Sample teacher data
const teachers = [
	{
		id: 1,
		name: 'Олександр Петренко',
		course: 'Frontend розробка',
		image: '/placeholder.svg?height=200&width=200',
	},
	{
		id: 2,
		name: 'Марія Коваленко',
		course: 'UX/UI дизайн',
		image: '/placeholder.svg?height=200&width=200',
	},
	{
		id: 3,
		name: 'Андрій Шевченко',
		course: 'Backend розробка',
		image: '/placeholder.svg?height=200&width=200',
	},
	{
		id: 4,
		name: 'Ірина Мельник',
		course: 'Python програмування',
		image: '/placeholder.svg?height=200&width=200',
	},
	{
		id: 5,
		name: 'Василь Іваненко',
		course: 'Тестування ПЗ (QA)',
		image: '/placeholder.svg?height=200&width=200',
	},
	{
		id: 6,
		name: 'Василь Іваненко',
		course: 'Тестування ПЗ (QA)',
		image: '/placeholder.svg?height=200&width=200',
	},
	{
		id: 7,
		name: 'Василь Іваненко',
		course: 'Тестування ПЗ (QA)',
		image: '/placeholder.svg?height=200&width=200',
	},
]
