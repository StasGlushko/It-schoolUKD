import type React from 'react'
import { useState, useEffect } from 'react'
import s from './CourseRegistrationForm.module.scss'
import { useParams } from 'react-router-dom'
import { useGetCoursesQuery } from '../../store/features/courses/coursesApi'
import { useCreateCourseRegistrationsMutation } from '../../store/features/course-registrations/course-registrationsApi'

// Приклад даних курсів - замініть на ваші реальні дані

interface ICourseRegistrationForm {
	currentCourseId?: number
}

export const CourseRegistrationForm = ({
	currentCourseId,
}: ICourseRegistrationForm) => {
	const params = useParams()
	const { data: courses = [], isLoading, isError } = useGetCoursesQuery()
	const [createCourseRegistration] = useCreateCourseRegistrationsMutation()
	const [isOpen, setIsOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		// message: '',
		courseId: 0,
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	// Автоматично вибираємо курс на основі URL параметра
	useEffect(() => {
		const courseId =
			currentCourseId ||
			(params?.id ? Number.parseInt(params.id as string, 10) : 0)
		if (courseId && courses.find(course => course.id === courseId)) {
			setFormData(prev => ({ ...prev, courseId }))
		}
	}, [currentCourseId, params?.id])

	const handleInputChange = (field: string, value: string | number) => {
		setFormData(prev => ({
			...prev,
			[field]:
				field === 'courseId' ? Number.parseInt(value as string, 10) : value,
		}))
		// Очищаємо помилку при введенні
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }))
		}
	}

	const validateForm = () => {
		const newErrors: Record<string, string> = {}

		if (!formData.firstName.trim()) {
			newErrors.firstName = "Ім'я є обов'язковим"
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Прізвище є обов'язковим"
		}
		if (!formData.phoneNumber.trim()) {
			newErrors.phoneNumber = "Номер телефону є обов'язковим"
		} else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phoneNumber)) {
			newErrors.phoneNumber = 'Введіть коректний номер телефону'
		}
		if (!formData.courseId || formData.courseId === 0) {
			newErrors.courseId = 'Оберіть курс'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) return

		setIsSubmitting(true)

		try {
			await createCourseRegistration({
				firstName: formData.firstName,
				lastName: formData.lastName,
				phoneNumber: formData.phoneNumber,
				courseId: formData.courseId,
			}).unwrap()

			alert("Дякуємо за реєстрацію! Ми зв'яжемося з вами найближчим часом.")

			// Очистити форму та закрити модальне вікно
			setIsOpen(false)
			setFormData({
				firstName: '',
				lastName: '',
				phoneNumber: '',
				courseId: formData.courseId, // залишаємо вибраний курс
			})
			setErrors({})
		} catch (error) {
			console.error('Помилка відправки:', error)
			alert('Сталася помилка. Спробуйте ще раз.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const selectedCourse = courses.find(
		course => course.id === formData.courseId,
	)

	if (isLoading) return <p>Завантаження курсів...</p>
	if (isError) return <p>Сталася помилка при завантаженні курсів</p>

	return (
		<>
			<button className={s.registerButton} onClick={() => setIsOpen(true)}>
				Зареєструватися на курс
			</button>

			{isOpen && (
				<div className={s.overlay} onClick={() => setIsOpen(false)}>
					<div className={s.modal} onClick={e => e.stopPropagation()}>
						<div className={s.modalHeader}>
							<h2 className={s.modalTitle}>Реєстрація на курс</h2>
							<p className={s.modalDescription}>
								Заповніть форму нижче, щоб зареєструватися на курс. Ми
								зв'яжемося з вами найближчим часом.
							</p>
							<button
								className={s.closeButton}
								onClick={() => setIsOpen(false)}>
								×
							</button>
						</div>

						<form onSubmit={handleSubmit} className={s.form}>
							<div className={s.formRow}>
								<div className={s.formGroup}>
									<label htmlFor='firstName' className={s.label}>
										Ім'я *
									</label>
									<input
										id='firstName'
										type='text'
										className={`${s.input} ${
											errors.firstName ? s.inputError : ''
										}`}
										value={formData.firstName}
										onChange={e =>
											handleInputChange('firstName', e.target.value)
										}
										placeholder="Введіть ваше ім'я"
									/>
									{errors.firstName && (
										<span className={s.errorText}>
											{errors.firstName}
										</span>
									)}
								</div>

								<div className={s.formGroup}>
									<label htmlFor='lastName' className={s.label}>
										Прізвище *
									</label>
									<input
										id='lastName'
										type='text'
										className={`${s.input} ${
											errors.lastName ? s.inputError : ''
										}`}
										value={formData.lastName}
										onChange={e =>
											handleInputChange('lastName', e.target.value)
										}
										placeholder='Введіть ваше прізвище'
									/>
									{errors.lastName && (
										<span className={s.errorText}>
											{errors.lastName}
										</span>
									)}
								</div>
							</div>

							<div className={s.formGroup}>
								<label htmlFor='phoneNumber' className={s.label}>
									Номер телефону *
								</label>
								<input
									id='phoneNumber'
									type='tel'
									className={`${s.input} ${
										errors.phoneNumber ? s.inputError : ''
									}`}
									value={formData.phoneNumber}
									onChange={e =>
										handleInputChange('phoneNumber', e.target.value)
									}
									placeholder='+380 XX XXX XX XX'
								/>
								{errors.phoneNumber && (
									<span className={s.errorText}>
										{errors.phoneNumber}
									</span>
								)}
							</div>

							<div className={s.formGroup}>
								<label htmlFor='course' className={s.label}>
									Курс *
								</label>
								<select
									id='course'
									className={`${s.select} ${
										errors.courseId ? s.inputError : ''
									}`}
									value={formData.courseId}
									onChange={e =>
										handleInputChange('courseId', e.target.value)
									}>
									<option value={0}>Оберіть курс</option>
									{courses.map(course => (
										<option key={course.id} value={course.id}>
											{course.title}
										</option>
									))}
								</select>
								{errors.courseId && (
									<span className={s.errorText}>
										{errors.courseId}
									</span>
								)}
								{selectedCourse && (
									<p className={s.selectedCourse}>
										Обраний курс: {selectedCourse.title}
									</p>
								)}
							</div>

							{/* <div className={s.formGroup}>
								<label htmlFor='message' className={s.label}>
									Повідомлення
								</label>
								<textarea
									id='message'
									className={s.textarea}
									value={formData.message}
									onChange={e =>
										handleInputChange('message', e.target.value)
									}
									placeholder="Додаткові питання або коментарі (необов'язково)"
									rows={4}
								/>
							</div> */}

							<div className={s.formActions}>
								<button
									type='button'
									className={s.cancelButton}
									onClick={() => setIsOpen(false)}
									disabled={isSubmitting}>
									Скасувати
								</button>
								<button
									type='submit'
									className={s.submitButton}
									disabled={isSubmitting}>
									{isSubmitting ? 'Реєструємо...' : 'Зареєструватися'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
