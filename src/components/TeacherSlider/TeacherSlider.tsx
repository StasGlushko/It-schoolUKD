import { FC, useEffect, useRef, useState } from 'react'
import s from './TeacherSlider.module.scss'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useGetTeachersQuery } from '../../store/features/teachers/teachersApi'

export const TeacherSlider: FC = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const sliderRef = useRef<HTMLDivElement>(null)
	const { data: teachers = [], isLoading, isError } = useGetTeachersQuery()

	const handlePrev = () => {
		setCurrentIndex(prev => (prev === 0 ? teachers.length - 1 : prev - 1))
	}

	const handleNext = () => {
		setCurrentIndex(prev => (prev === teachers.length - 1 ? 0 : prev + 1))
	}

	useEffect(() => {
		if (sliderRef.current) {
			const scrollPosition = currentIndex * (250 + 16)
			sliderRef.current.scrollTo({
				left: scrollPosition,
				behavior: 'smooth',
			})
		}
	}, [currentIndex])

	if (isLoading) return <p>Завантаження викладачів...</p>
	if (isError) return <p>Сталася помилка при завантаженні викладачів</p>

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
					<div key={teacher.description} className={s.teacherCard}>
						<div className={s.teacherImageWrapper}>
							<img
								src={teacher.imageUrl || '/placeholder.svg'}
								alt={teacher.lastName}
								width={200}
								height={200}
								className={s.teacherImage}
							/>
						</div>
						<h3 className={s.teacherName}>
							{teacher.firstName + ' ' + teacher.lastName}
						</h3>

						{teacher.courses.map(
							(course: { title: string; id: number }) => {
								return <p key={course.id} className={s.teacherCourse}>{course.title}</p>
							},
						)}
					</div>
				))}
			</div>
		</div>
	)
}
