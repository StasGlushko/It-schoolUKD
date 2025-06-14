import styles from './courseDetail.module.scss'
import { Paths } from '../../../routing/paths'
import { NavLink, useParams } from 'react-router-dom'
import { FC } from 'react'
import { useGetCourseByIdQuery } from '../../../store/features/courses/coursesApi'

// interface IProps {}

export const CourseDetail: FC = () => {
	const { id } = useParams()

	const userId: number = id ? Number(id) : -1
	const { data: course, isLoading, error } = useGetCourseByIdQuery(userId)

	if (isLoading) return <p>Завантаження...</p>
	if (error) return <p>Помилка: {(error as any).message}</p>
	if (!course) return <p>Курс не знайдено</p>

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<NavLink to={Paths.courses} className={styles.backLink}>
					← Назад до курсів
				</NavLink>

				<div className={styles.courseImageContainer}>
					<img
						src={course.imageUrl || '/placeholder.svg'}
						alt={course.title}
						className={styles.courseImage}
					/>
				</div>

				<h1 className={styles.title}>{course.title}</h1>
				<div className={styles.metaInfo}>
					<span className={styles.metaTag}>{course.duration}</span>
					{course.price && (
						<span className={styles.metaTag}>{course.price}</span>
					)}
				</div>

				<p className={styles.description}>{course.shortDescription}</p>

				{course.description && (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Про курс</h2>
						<p className={styles.sectionText}>{course.description}</p>
					</div>
				)}

				{/* {course.curriculum && course.curriculum.length > 0 && (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Програма курсу</h2>
						<ul className={styles.curriculumList}>
							{course.curriculum.map((item, index) => (
								<li key={index} className={styles.curriculumItem}>
									{item}
								</li>
							))}
						</ul>
					</div>
				)} */}

				<div className={styles.actionContainer}>
					<NavLink to='#' className={styles.registerButton}>
						Зареєструватися на курс
					</NavLink>
				</div>
			</div>
		</main>
	)
}

// {
// 	id: '1',
// 	title: 'Frontend розробка',
// 	description:
// 		'Вивчіть HTML, CSS, JavaScript та React для створення сучасних веб-інтерфейсів.',
// 	fullDescription:
// 		'Наш курс Frontend розробки надає вам всі необхідні навички для створення сучасних, інтерактивних веб-сайтів та додатків. Ви вивчите основи HTML, CSS та JavaScript, а потім перейдете до сучасних фреймворків, таких як React. Курс включає практичні проекти, які допоможуть вам побудувати портфоліо для майбутнього працевлаштування.',
// 	duration: '6 місяців',
// 	price: '12000 грн',
// 	image: '/placeholder.svg?height=400&width=800',
// 	curriculum: [
// 		'Основи HTML та CSS',
// 		'JavaScript: основи та просунуті концепції',
// 		'Адаптивний дизайн та CSS фреймворки',
// 		'React: компоненти, стан, хуки',
// 		'Робота з API та асинхронним кодом',
// 		'Фінальний проект: створення повноцінного веб-додатку',
// 	],
// },
