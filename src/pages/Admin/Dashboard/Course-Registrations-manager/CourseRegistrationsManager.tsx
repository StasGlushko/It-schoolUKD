import s from './CourseRegistrationsManager.module.scss'
import {
	useDeleteTeacherMutation,
	useGetTeachersQuery,
} from '../../../../store/features/teachers/teachersApi'
import { useDeleteCourseRegistrationsByIdMutation, useGetCourseRegistrationsQuery } from '../../../../store/features/course-registrations/course-registrationsApi'

// interface Teacher {
// 	id: number
// 	firstName: string
// 	lastName: string
// 	description: string
// }

export const CourseRegistrationsManager = () => {
	const [deleteCourseRegistrationsById] = useDeleteCourseRegistrationsByIdMutation()
	const { data: CourseRegistrations = [], isLoading, isError } = useGetCourseRegistrationsQuery()
	const reversArr = [...CourseRegistrations].reverse()

	if (isLoading) return <p>Завантаження реєстраці на курси...</p>
	if (isError) return <p>Сталася помилка при завантаженні реєстрації на курси</p>

	const handleDelete = async (id: number) => {
		if (confirm('Ви впевнені, що хочете видалити цю реєстрацію?')) {
			try {
				await deleteCourseRegistrationsById(id).unwrap()
				alert('Реєстрація успішно видалений!')
			} catch (error) {
				console.error('Помилка при видаленні реєстрації:', error)
				alert('Не вдалося видалити реєстрацію. Спробуйте ще раз.')
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.header}>
				<div>
					<h2 className={s.title}>Управління реєстрацією</h2>
					<p className={s.description}>
						Переглядайте та видаляйте реєстрацію на курси
					</p>
				</div>
			</div>

			<div className={s.tableContainer}>
				<table className={s.table}>
					<thead>
						<tr>
							<th>Ім'я</th>
							<th>Прізвище</th>
							<th>Вибраний крус</th>
							<th>Номер телефону</th>
							<th>Дії</th>
						</tr>
					</thead>
					<tbody>
						{reversArr.map(courseReg => (
							<tr key={courseReg.id}>
								<td className={s.nameCell}>{courseReg.firstName}</td>
								<td>{courseReg.lastName}</td>
								<td>{courseReg.courseTitle}</td>
								<td>{courseReg.phoneNumber}</td>
								<td>
									<div className={s.actions}>
										<button
											className={s.deleteBtn}
											onClick={() => handleDelete(courseReg.id)}>
											<svg
												className={s.actionIcon}
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
												/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
