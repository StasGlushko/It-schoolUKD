import type React from 'react'
import { useState } from 'react'
import s from './TeachersManager.module.scss'
import {
	useCreateTeacherMutation,
	useDeleteTeacherMutation,
	useGetTeachersQuery,
	useUpdateTeacherMutation,
} from '../../../../store/features/teachers/teachersApi'

interface Teacher {
	id: number
	firstName: string
	lastName: string
	description: string
}

export const TeachersManager = () => {
	const [updateTeacher] = useUpdateTeacherMutation()
	const [createTeacher] = useCreateTeacherMutation()
	const [deleteTeacher] = useDeleteTeacherMutation()
	const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
	const { data: teachers = [], isLoading, isError } = useGetTeachersQuery()
   const reversTeachersArr = [...teachers].reverse()

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		description: '',
	})

	if (isLoading) return <p>Завантаження викладачів...</p>
	if (isError) return <p>Сталася помилка при завантаженні викладачів</p>

	const resetForm = () => {
		setFormData({
			firstName: '',
			lastName: '',
			description: '',
		})
		setSelectedImageFile(null)
		setEditingTeacher(null)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const submissionData = new FormData()
		submissionData.append('firstName', formData.firstName)
		submissionData.append('lastName', formData.lastName)
		submissionData.append('description', formData.description)

		if (selectedImageFile) {
			submissionData.append('image', selectedImageFile)
		}

		submissionData.append('courses', JSON.stringify([])) // або з масиву

      try {
			if (editingTeacher) {
				await updateTeacher({
					id: editingTeacher.id,
					data: submissionData,
				}).unwrap()
				alert('Інформаці викладача оновлено!')
			} else {
				await createTeacher(submissionData).unwrap()
				alert('Викладача створено!')
			}
		} catch (err) {
			console.error('Помилка:', err)
			alert('Помилка при створенні викладача')
		}

		setIsDialogOpen(false)
		resetForm()
	}

	const handleEdit = (teacher: Teacher) => {
		setEditingTeacher(teacher)
		setFormData({
			firstName: teacher.firstName,
			lastName: teacher.lastName,
			description: teacher.description,
		})
		setIsDialogOpen(true)
	}

	const handleDelete = async (id: number) => {
		if (confirm('Ви впевнені, що хочете видалити викладача?')) {
			try {
				await deleteTeacher(id).unwrap()
				alert('Викладач успішно видалений!')
			} catch (error) {
				console.error('Помилка при видаленні викладача:', error)
				alert('Не вдалося видалити викладача. Спробуйте ще раз.')
			}
		}
	}

	const getInitials = (firstName: string, lastName: string) => {
		return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
	}

	return (
		<div className={s.container}>
			<div className={s.header}>
				<div>
					<h2 className={s.title}>Управління викладачами</h2>
					<p className={s.description}>
						Створюйте, редагуйте та видаляйте викладачів
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
					Додати викладача
				</button>
			</div>

			<div className={s.tableContainer}>
				<table className={s.table}>
					<thead>
						<tr>
							<th>Фото</th>
							<th>Ім'я</th>
							<th>Прізвище</th>
							<th>Опис</th>
							<th>Дії</th>
						</tr>
					</thead>
					<tbody>
						{reversTeachersArr.map(teacher => (
							<tr key={teacher.id}>
								<td>
									<div className={s.avatar}>
										{teacher.imageUrl ? (
											<img
												src={teacher.imageUrl || '/placeholder.svg'}
												alt={`${teacher.firstName} ${teacher.lastName}`}
												className={s.avatarImage}
											/>
										) : (
											<div className={s.avatarFallback}>
												{getInitials(
													teacher.firstName,
													teacher.lastName,
												)}
											</div>
										)}
									</div>
								</td>
								<td className={s.nameCell}>{teacher.firstName}</td>
								<td>{teacher.lastName}</td>
								<td>{teacher.description}</td>
								<td>
									<div className={s.actions}>
										<button
											className={s.editBtn}
											onClick={() => handleEdit(teacher)}>
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
											onClick={() => handleDelete(teacher.id)}>
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
								{editingTeacher
									? 'Редагувати викладача'
									: 'Створити нового викладача'}
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
									<label className={s.label}>Ім'я</label>
									<input
										type='text'
										className={s.input}
										value={formData.firstName}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												firstName: e.target.value,
											}))
										}
										required
									/>
								</div>
								<div className={s.field}>
									<label className={s.label}>Прізвище</label>
									<input
										type='text'
										className={s.input}
										value={formData.lastName}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												lastName: e.target.value,
											}))
										}
										required
									/>
								</div>
							</div>

							<div className={s.field}>
								<label className={s.label}>Опис</label>
								<textarea
									className={s.textarea}
									rows={3}
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

							<div className={s.field}>
								<label className={s.label}>Зображення (файл)</label>
								<input
									type='file'
									accept='image/*'
									className={s.input}
									onChange={e => {
										const file = e.target.files?.[0]
										if (file) setSelectedImageFile(file)
									}}
								/>
							</div>

							<div className={s.formActions}>
								<button
									type='button'
									className={s.cancelBtn}
									onClick={() => setIsDialogOpen(false)}>
									Скасувати
								</button>
								<button type='submit' className={s.submitBtn}>
									{editingTeacher
										? 'Зберегти зміни'
										: 'Створити викладача'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
