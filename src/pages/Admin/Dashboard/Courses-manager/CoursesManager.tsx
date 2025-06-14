import type React from 'react'
import { useState } from 'react'
import s from './CoursesManager.module.scss'
import {
	useDeleteCourseMutation,
	useGetCoursesQuery,
} from '../../../../store/features/courses/coursesApi'

interface Course {
	id: number
	title: string
	description: string
	shortDescription: string
	price: number
	duration: string
	imageUrl: string
}

export const CoursesManager = () => {
	const { data: courses = [], isLoading, isError } = useGetCoursesQuery()
	const [deleteCourse] = useDeleteCourseMutation()

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [editingCourse, setEditingCourse] = useState<Course | null>(null)
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		shortDescription: '',
		price: 0,
		duration: '',
		imageUrl: '',
	})

	if (isLoading) return <p>Завантаження курсів...</p>
	if (isError) return <p>Сталася помилка при завантаженні курсів</p>

	const resetForm = () => {
		setFormData({
			title: '',
			description: '',
			shortDescription: '',
			price: 0,
			duration: '',
			imageUrl: '',
		})
		setEditingCourse(null)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (editingCourse) {
			// setCourses(prev =>
			// 	prev.map(course =>
			// 		course.id === editingCourse.id
			// 			? { ...formData, id: editingCourse.id }
			// 			: course,
			// 	),
			// )
		} else {
			const newCourse: Course = {
				...formData,
				id: Date.now(),
			}
			// setCourses(prev => [...prev, newCourse])
		}

		setIsDialogOpen(false)
		resetForm()
	}

	const handleEdit = (course: Course) => {
		setEditingCourse(course)
		setFormData({
			title: course.title,
			description: course.description,
			shortDescription: course.shortDescription,
			price: course.price,
			duration: course.duration,
			imageUrl: course.imageUrl,
		})
		setIsDialogOpen(true)
	}

	const handleDelete = async (id: number) => {
		if (confirm('Ви впевнені, що хочете видалити цей курс?')) {
			try {
				await deleteCourse(id).unwrap()
				alert('Курс успішно видалений!')

				// setCourses(prev => prev.filter(course => course.id !== id)) // або перезапросити список
			} catch (error) {
				console.error('Помилка при видаленні курсу:', error)
				alert('Не вдалося видалити курс. Спробуйте ще раз.')
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.header}>
				<div>
					<h2 className={s.title}>Управління курсами</h2>
					<p className={s.description}>
						Створюйте, редагуйте та видаляйте курси
					</p>
				</div>
				<button
					className={s.addBtn}
					onClick={() => {
						resetForm()
						setIsDialogOpen(true)
					}}>
					<svg
						className={s.icon}
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 4v16m8-8H4'
						/>
					</svg>
					Додати курс
				</button>
			</div>

			<div className={s.tableContainer}>
				<table className={s.table}>
					<thead>
						<tr>
							<th>Назва</th>
							<th>Короткий опис</th>
							<th>Тривалість</th>
							<th>Ціна</th>
							<th>Дії</th>
						</tr>
					</thead>
					<tbody>
						{courses.map(course => (
							<tr key={course.id}>
								<td className={s.titleCell}>{course.title}</td>
								<td>{course.shortDescription}</td>
								<td>{course.duration}</td>
								<td>{course.price} грн</td>
								<td>
									<div className={s.actions}>
										<button
											className={s.editBtn}
											onClick={() => handleEdit(course)}>
											<svg
												className={s.actionIcon}
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
												/>
											</svg>
										</button>
										<button
											className={s.deleteBtn}
											onClick={() => handleDelete(course.id)}>
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

			{/* Modal */}
			{isDialogOpen && (
				<div className={s.modal}>
					<div
						className={s.modalOverlay}
						onClick={() => setIsDialogOpen(false)}
					/>
					<div className={s.modalContent}>
						<div className={s.modalHeader}>
							<h3 className={s.modalTitle}>
								{editingCourse
									? 'Редагувати курс'
									: 'Створити новий курс'}
							</h3>
							<button
								className={s.closeBtn}
								onClick={() => setIsDialogOpen(false)}>
								<svg
									className={s.closeIcon}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>

						<form onSubmit={handleSubmit} className={s.form}>
							<div className={s.formRow}>
								<div className={s.field}>
									<label className={s.label}>Назва курсу</label>
									<input
										type='text'
										className={s.input}
										value={formData.title}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												title: e.target.value,
											}))
										}
										required
									/>
								</div>
								<div className={s.field}>
									<label className={s.label}>Тривалість</label>
									<input
										type='text'
										className={s.input}
										value={formData.duration}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												duration: e.target.value,
											}))
										}
										required
									/>
								</div>
							</div>

							<div className={s.field}>
								<label className={s.label}>Короткий опис</label>
								<input
									type='text'
									className={s.input}
									value={formData.shortDescription}
									onChange={e =>
										setFormData(prev => ({
											...prev,
											shortDescription: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className={s.field}>
								<label className={s.label}>Повний опис</label>
								<textarea
									className={s.textarea}
									rows={4}
									value={formData.description}
									onChange={e =>
										setFormData(prev => ({
											...prev,
											description: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className={s.formRow}>
								<div className={s.field}>
									<label className={s.label}>Ціна (грн)</label>
									<input
										type='number'
										className={s.input}
										value={formData.price}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												price: Number(e.target.value),
											}))
										}
										required
									/>
								</div>
								<div className={s.field}>
									<label className={s.label}>URL зображення</label>
									<input
										type='url'
										className={s.input}
										value={formData.imageUrl}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												imageUrl: e.target.value,
											}))
										}
										required
									/>
								</div>
							</div>

							<div className={s.formActions}>
								<button
									type='button'
									className={s.cancelBtn}
									onClick={() => setIsDialogOpen(false)}>
									Скасувати
								</button>
								<button type='submit' className={s.submitBtn}>
									{editingCourse ? 'Зберегти зміни' : 'Створити курс'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
