import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TeachersManager } from './Teachers-manager/TeachersManager'
import { CoursesManager } from './Courses-manager/CoursesManager'
import s from './dashboard.module.scss'
import { CourseRegistrationsManager } from './Course-Registrations-manager/CourseRegistrationsManager'

export const AdminDashboard = () => {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState('courses')

	useEffect(() => {
		const token = localStorage.getItem('adminToken')
		if (!token) {
			navigate('/admin/login')
		}
	}, [navigate])

	const handleLogout = () => {
		localStorage.removeItem('adminToken')
		localStorage.removeItem('adminTokenExpiry')
		localStorage.removeItem('adminUsername')
		localStorage.removeItem('adminRole')
		navigate('/admin/login')
	}

	return (
		<div className={s.container}>
			<header className={s.header}>
				<div className={s.headerContent}>
					<h1 className={s.title}>Адмін панель</h1>
					<button className={s.logoutBtn} onClick={handleLogout}>
						<svg
							className={s.icon}
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
							/>
						</svg>
						Вийти
					</button>
				</div>
			</header>

			<main className={s.main}>
				<div className={s.tabs}>
					<div className={s.tabsList}>
						<button
							className={`${s.tab} ${
								activeTab === 'courses' ? s.tabActive : ''
							}`}
							onClick={() => setActiveTab('courses')}>
							<svg
								className={s.tabIcon}
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
								/>
							</svg>
							Курси
						</button>
						<button
							className={`${s.tab} ${
								activeTab === 'teachers' ? s.tabActive : ''
							}`}
							onClick={() => setActiveTab('teachers')}>
							<svg
								className={s.tabIcon}
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
								/>
							</svg>
							Викладачі
						</button>
						<button
							className={`${s.tab} ${
								activeTab === 'courseRegistrations' ? s.tabActive : ''
							}`}
							onClick={() => setActiveTab('courseRegistrations')}>
							<svg
								className={s.tabIcon}
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
								/>
							</svg>
							Реєстрація на курси
						</button>
					</div>

					<div className={s.tabContent}>
						{activeTab === 'courses' && <CoursesManager />}
						{activeTab === 'teachers' && <TeachersManager />}
						{activeTab === 'courseRegistrations' && <CourseRegistrationsManager />}
					</div>
				</div>
			</main>
		</div>
	)
}
