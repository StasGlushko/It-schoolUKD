import type React from 'react'
import { useState } from 'react'
import s from './login.module.scss'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../store/features/api/authApi'

export const AdminLogin = () => {
	const [credentials, setCredentials] = useState({ username: '', password: '' })
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [login] = useLoginMutation()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			const result = await login(credentials).unwrap()

			// Зберігаємо токен на 1 день
			const expiry = new Date()
			expiry.setDate(expiry.getDate() + 1)

			localStorage.setItem('adminToken', result.token)
			localStorage.setItem('adminTokenExpiry', expiry.toISOString())
			localStorage.setItem('adminUsername', result.username)
			localStorage.setItem('adminRole', result.role)

			navigate('/admin/dashboard')
		} catch (err) {
			setError('Невірний логін або пароль')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={s.container}>
			<div className={s.card}>
				<div className={s.header}>
					<h1 className={s.title}>Адмін панель</h1>
					<p className={s.description}>
						Увійдіть для доступу до панелі управління
					</p>
					<div className={s.credentials}>
						<p>
							<strong>Логін:</strong> admin
						</p>
						<p>
							<strong>Пароль:</strong> admin123
						</p>
					</div>
				</div>

				<div className={s.content}>
					<form onSubmit={handleSubmit} className={s.form}>
						{error && <div className={s.error}>{error}</div>}

						<div className={s.field}>
							<label htmlFor='username' className={s.label}>
								Логін
							</label>
							<input
								id='username'
								type='text'
								className={s.input}
								value={credentials.username}
								onChange={e =>
									setCredentials(prev => ({
										...prev,
										username: e.target.value,
									}))
								}
								required
							/>
						</div>

						<div className={s.field}>
							<label htmlFor='password' className={s.label}>
								Пароль
							</label>
							<input
								id='password'
								type='password'
								className={s.input}
								value={credentials.password}
								onChange={e =>
									setCredentials(prev => ({
										...prev,
										password: e.target.value,
									}))
								}
								required
							/>
						</div>

						<button
							type='submit'
							className={s.submitBtn}
							disabled={isLoading}>
							{isLoading ? 'Вхід...' : 'Увійти'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
