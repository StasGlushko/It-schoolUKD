import { FC } from 'react'
import s from './Home.module.scss'
import { CourseInfoCard } from '../../components/CourseInfoCard/CourseInfoCard'
import { IAdvantagesInfo, ICoursesInfo } from '../../types/Types'
import { AdvantageCard } from '../../components/AdvantageCard/AdvantageCard'
import { NavLink } from 'react-router'
import { Paths } from '../../routing/paths'
import { FaStar } from 'react-icons/fa'
import { BiPlay } from 'react-icons/bi'
import { BsPlayBtn, BsPlayFill } from 'react-icons/bs'
import { CommentsSection } from '../../components/CommentsSection/CommentsSection'

// const corsesInfo: ICoursesInfo[] = [
// 	{
// 		id: 1,
// 		name: 'Інформаційні технології та програмування',
// 		description:
// 			'Навчимо створювати ігри та додатки, працювати з 3D-моделями та анімацією!',
// 	},
// 	{
// 		id: 2,
// 		name: 'Робототехніка',
// 		description:
// 			'Хочете створювати роботів? На курсі ви навчитеся конструювати та програмувати їх, реалізуючи власні проєкти!',
// 	},
// 	{
// 		id: 3,
// 		name: 'Англійська мова',
// 		description:
// 			'Покращуйте знання англійської для IT! Навчимо розуміти технічні терміни та спілкуватися з друзями з інших країн.',
// 	},
// 	{
// 		id: 4,
// 		name: 'Мобільна фотографія',
// 		description:
// 			'Дізнайтеся, як створювати круті фото та редагувати їх прямо на смартфоні!',
// 	},
// ]

// const advantagesInfo: IAdvantagesInfo[] = [
// 	{
// 		id: 1,
// 		text: 'Безпека та комфорт: сучасна інфраструктура, включаючи 2 укриття та резервне живлення, забезпечує безперервність навчального процесу і безпеку учнів. На даний момент це позиція НОМЕР 1!!!!',
// 	},
// 	{
// 		id: 2,
// 		text: 'Програма розроблена з урахуванням сучасних тенденцій в IT-індустрії, що забезпечує актуальні знання та навички. Кожного року програма переглядається та змінюється відповідно до вимог ІТ-ринку.',
// 	},
// 	{
// 		id: 3,
// 		text: 'Професійні викладачі: викладачі мають досвід роботи в IT-сфері, що дозволяє їм ділитися практичними знаннями та навичками. Переважна більшість наших викладачів є випускниками університету.',
// 	},
// 	{
// 		id: 4,
// 		text: 'Інноваційні методи навчання: використання сучасних технологій та інтерактивних методів викладання робить навчання більш цікавим та ефективним.',
// 	},
// 	{
// 		id: 5,
// 		text: "Сучасне технічне обладнання: комп'ютерні класи оснащені потужною технікою, усі аудиторії обладнані мультимедійними проекторами, а для відтворення результатів навчання також є 3D-принтер.",
// 	},
// 	{
// 		id: 6,
// 		text: 'Випускники школи отримують не лише знання, а й можливість продовжити навчання у Фаховому коледжі або університеті, що відкриває перед ними широкі кар’єрні можливості.',
// 	},
// ]

export const Home: FC = () => {
	return (
		<div className={s.homePage}>
			{/* Hero Section */}
			<section className={s.heroSection}>
				<div className={s.heroContent}>
					<div className={s.heroText}>
						<h1 className={s.heroTitle}>Welcome to UKD IT School</h1>
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
							src='/placeholder.svg?height=400&width=600'
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
					<div className={s.courseCard}>
						<div className={s.courseImageWrapper}>
							<img
								src='/placeholder.svg?height=200&width=350'
								alt='Інформаційні технології та програмування'
								width={350}
								height={200}
								className={s.courseImage}
							/>
						</div>
						<div className={s.courseContent}>
							<h3 className={s.courseTitle}>
								Інформаційні технології та програмування
							</h3>
							<p className={s.courseDescription}>
								Навчимо створювати ігри та додатки, працювати з
								3D-графікою.
							</p>
						</div>
					</div>

					<div className={s.courseCard}>
						<div className={s.courseImageWrapper}>
							<img
								src='/placeholder.svg?height=200&width=350'
								alt='Робототехніка'
								width={350}
								height={200}
								className={s.courseImage}
							/>
						</div>
						<div className={s.courseContent}>
							<h3 className={s.courseTitle}>Робототехніка</h3>
							<p className={s.courseDescription}>
								Хочете створювати роботів? На курсі ви навчитесь
								конструювати та програмувати їх, реалізуючи власні ідеї.
							</p>
						</div>
					</div>

					<div className={s.courseCard}>
						<div className={s.courseImageWrapper}>
							<img
								src='/placeholder.svg?height=200&width=350'
								alt='Англійська мова'
								width={350}
								height={200}
								className={s.courseImage}
							/>
						</div>
						<div className={s.courseContent}>
							<h3 className={s.courseTitle}>Англійська мова</h3>
							<p className={s.courseDescription}>
								Покращуйте знання англійської для IT! Навчимо розуміти
								технічні терміни та спілкуватися з друзями.
							</p>
						</div>
					</div>

					<div className={s.courseCard}>
						<div className={s.courseImageWrapper}>
							<img
								src='/placeholder.svg?height=200&width=350'
								alt='Мобільна фотографія'
								width={350}
								height={200}
								className={s.courseImage}
							/>
						</div>
						<div className={s.courseContent}>
							<h3 className={s.courseTitle}>Мобільна фотографія</h3>
							<p className={s.courseDescription}>
								Дізнайтеся, як створювати круті фото та редагувати їх
								прямо на смартфоні!
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Video Section */}
			<section className={s.videoSection}>
				<div className={s.videoWrapper}>
					<div className={s.videoOverlay}>
						<button className={s.playButton} aria-label='Play video'>
							<BsPlayFill className={s.playIcon} />
						</button>
					</div>
					<img
						src='/placeholder.svg?height=600&width=1200'
						alt='UKD IT School Video'
						className={s.videoThumbnail}
					/>
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
			<section className={s.commentsSection}>
				<h2 className={s.sectionTitle}>Відгуки наших учнів</h2>
				<CommentsSection />
			</section>
		</div>
	)
}
