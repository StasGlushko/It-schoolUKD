import { FC, useRef, useState } from 'react'
import s from './Home.module.scss'
import { CourseInfoCards } from '../../components/CourseInfoCards/CourseInfoCards'
import { NavLink } from 'react-router-dom'
import { Paths } from '../../routing/paths'
import { FaStar } from 'react-icons/fa'
import { BsPlayFill } from 'react-icons/bs'
// import { CommentsSection } from '../../components/CommentsSection/CommentsSection'

export const Home: FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const handlePlay = () => {
		if (videoRef.current) {
			videoRef.current.muted = false // ← явно
			videoRef.current
				.play()
				.then(() => {
					setIsPlaying(!isPlaying)
				})
				.catch(err => {
					console.error('Помилка запуску відео:', err)
				})
		}
	}

	return (
		<div className={s.homePage}>
			{/* Hero Section */}
			<section className={s.heroSection}>
				<div className={s.heroContent}>
					<div className={s.heroText}>
						<h1 className={s.heroTitle}>
							Ласкаво просимо до <br />
							IT-школи УКД
						</h1>
						<p className={s.heroDescription}>
							Це місце, де учні не лише навчаються, але й готуються до
							успішної кар'єри в сфері технологій!
						</p>
						<NavLink to={Paths.about} className={s.heroButton}>
							Дізнатися більше
						</NavLink>
					</div>
					<div className={s.heroImageWrapper}>
						<img
							src={`${import.meta.env.BASE_URL}bigLogo.png`}
							alt='UKD IT School'
							width={600}
							height={400}
							className={s.heroImage}
						/>
					</div>
				</div>
			</section>

			{/* Courses Section */}
			<section className={s.coursesSection}>
				<div className={s.coursesHeader}>
					<h2 className={s.sectionTitle}>Наші курси</h2>
					<div className={s.coursesDescription}>
						<p>
							ІТ-школа УКД: розвивайся, грай та підкорюй світ технологій!
							Приєднуйся до нашої інноваційної спільноти, де навчання
							стає захоплюючим процесом, а твої IT-навички допоможуть
							досягати нових вершин. Від інтерактивних занять до
							захопливих проєктів — розвивай свій потенціал і готуйся
							підкорювати світ технологій разом із нами!
						</p>
					</div>
				</div>

				<div className={s.coursesGrid}>
					<CourseInfoCards />
				</div>
			</section>

			{/* Video Section */}
			<section className={s.videoSection}>
				<div className={s.videoWrapper} onClick={handlePlay}>
					<div className={s.videoOverlay}>
						{!isPlaying && (
							<div className={s.playButton}>
								<BsPlayFill className={s.playIcon} />
							</div>
						)}
					</div>
					<video
						ref={videoRef}
						className={s.videoThumbnail}
						// src='https://drive.google.com/uc?export=download&id=1k21H7I0BvaebbabEesnuG-d4yksPcH1O'
						controls={isPlaying}
						muted>
						<source
							src='https://res.cloudinary.com/dwulmhtt8/video/upload/v1750109751/ohfqryotvuvjcucud1ki.mp4'
							type='video/mp4'
						/>
						Ваш браузер не підтримує відтворення відео.
					</video>
				</div>
			</section>

			{/* Advantages Section */}
			<section className={s.advantagesSection}>
				<h2 className={s.sectionTitle}>Переваги ІТ-школи</h2>

				<div className={s.advantagesGrid}>
					<div className={s.advantageCard}>
						<div className={s.advantageIcon}>
							<FaStar className={s.icon} />
							<span className={s.advantageNumber}>1</span>
						</div>
						<div className={s.advantageContent}>
							<h3 className={s.advantageTitle}>Безпека та комфорт</h3>
							<p className={s.advantageDescription}>
								Сучасна інфраструктура, включаючи 2 укриття та резервне
								живлення, забезпечує безперервність навчального процесу
								і безпеку учнів. На даний момент це позиція НОМЕР 1!
							</p>
						</div>
					</div>

					<div className={s.advantageCard}>
						<div className={s.advantageIcon}>
							<FaStar className={s.icon} />
							<span className={s.advantageNumber}>2</span>
						</div>
						<div className={s.advantageContent}>
							<h3 className={s.advantageTitle}>Актуальна програма</h3>
							<p className={s.advantageDescription}>
								Програма розроблена з урахуванням сучасних тенденцій в
								IT-індустрії, що забезпечує актуальні знання та навички.
								Кожного року програма переглядається та змінюється
								відповідно до вимог ІТ-ринку.
							</p>
						</div>
					</div>

					<div className={s.advantageCard}>
						<div className={s.advantageIcon}>
							<FaStar className={s.icon} />
							<span className={s.advantageNumber}>3</span>
						</div>
						<div className={s.advantageContent}>
							<h3 className={s.advantageTitle}>Професійні викладачі</h3>
							<p className={s.advantageDescription}>
								Викладачі мають досвід роботи в IT-сфері, що дозволяє їм
								ділитися практичними знаннями та навичками. Переважна
								більшість наших викладачів є випускниками університету.
							</p>
						</div>
					</div>

					<div className={s.advantageCard}>
						<div className={s.advantageIcon}>
							<FaStar className={s.icon} />
							<span className={s.advantageNumber}>4</span>
						</div>
						<div className={s.advantageContent}>
							<h3 className={s.advantageTitle}>
								Інноваційні методи навчання
							</h3>
							<p className={s.advantageDescription}>
								Використання сучасних технологій та інтерактивних
								методів викладання робить навчання більш цікавим та
								ефективним.
							</p>
						</div>
					</div>

					<div className={s.advantageCard}>
						<div className={s.advantageIcon}>
							<FaStar className={s.icon} />
							<span className={s.advantageNumber}>5</span>
						</div>
						<div className={s.advantageContent}>
							<h3 className={s.advantageTitle}>
								Сучасне технічне обладнання
							</h3>
							<p className={s.advantageDescription}>
								Комп'ютерні класи оснащені потужною технікою, усі
								аудиторії обладнані мультимедійними проекторами, а для
								відтворення результатів навчання також є 3D-принтер.
							</p>
						</div>
					</div>

					<div className={s.advantageCard}>
						<div className={s.advantageIcon}>
							<FaStar className={s.icon} />
							<span className={s.advantageNumber}>6</span>
						</div>
						<div className={s.advantageContent}>
							<h3 className={s.advantageTitle}>Перспективи розвитку</h3>
							<p className={s.advantageDescription}>
								Випускники школи отримують не лише знання, а й
								можливість продовжити навчання у Фаховому коледжі або
								університеті, що відкриває перед ними широкі кар'єрні
								можливості.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Comments Section */}
			{/* <section className={s.commentsSection}>
				<h2 className={s.sectionTitle}>Відгуки наших учнів</h2>
				<CommentsSection />
			</section> */}
		</div>
	)
}
