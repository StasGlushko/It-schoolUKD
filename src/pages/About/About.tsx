import { FC } from 'react'
import s from './About.module.scss'
import { TeacherSlider } from '../../components/TeacherSlider/TeacherSlider'

export const About: FC = () => {
	return (
		<main className={s.main}>
			{/* Hero Section */}
			<section className={s.heroSection}>
				<div className={s.container}>
					<div className={s.heroContent}>
						<div className={s.heroText}>
							<h1 className={s.heroTitle}>
								ІТ-школа УКД: розвивайся, грай та підкорюй світ
								технологій!
							</h1>
							<p className={s.heroDescription}>
								Приєднуйся до нашої інноваційної спільноти, де навчання
								стає захоплюючим процесом, а твої IT-навички допоможуть
								досягати нових вершин. Від інтерактивних занять до
								захопливих проєктів — розвивай свій потенціал і готуйся
								підкорювати світ технологій разом із нами!
							</p>
						</div>
						<div className={s.heroImageWrapper}>
							<img
								src='/placeholder.svg?height=400&width=600'
								alt='IT-школа УКД'
								width={600}
								height={400}
								className={s.heroImage}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className={s.teamSection}>
				<div className={s.container}>
					<h2 className={s.sectionTitle}>Команда викладачів</h2>

					<TeacherSlider />
				</div>
			</section>

			{/* Advantages Section */}
			<section className={s.advantagesSection}>
				<div className={s.container}>
					<h2 className={s.sectionTitle}>Переваги нашої It-школи</h2>

					<div className={s.advantagesGrid}>
						<div className={s.advantageCard}>
							<div className={s.advantageImageWrapper}>
								<img
									src='/placeholder.svg?height=300&width=400'
									alt='Ранній старт у програмуванні'
									width={400}
									height={300}
									className={s.advantageImage}
								/>
							</div>
							<h3 className={s.advantageTitle}>
								Ранній старт у програмуванні
							</h3>
							<p className={s.advantageDescription}>
								Навчання з раннього віку дає змогу вашим дітям освоїти
								основи сучасних технологій, які стануть ключем до
								майбутньої професії. Вміння працювати з кодом, логічно
								мислити та вирішувати складні завдання відкриває
								безмежні можливості.
							</p>
						</div>

						<div className={s.advantageCard}>
							<div className={s.advantageImageWrapper}>
								<img
									src='/placeholder.svg?height=300&width=400'
									alt='Побудова впевненості у власних силах'
									width={400}
									height={300}
									className={s.advantageImage}
								/>
							</div>
							<h3 className={s.advantageTitle}>
								Побудова впевненості у власних силах
							</h3>
							<p className={s.advantageDescription}>
								Участь у навчальних проєктах, створення власних програм
								чи ігор мотивує дітей та допомагає відчути гордість за
								свої досягнення. Вже зараз ваша дитина зможе мати власне
								портфоліо з простими IT-проєктами, що стане перевагою
								під час вступу до профільних навчальних закладів.
							</p>
						</div>

						<div className={s.advantageCard}>
							<div className={s.advantageImageWrapper}>
								<img
									src='/placeholder.svg?height=300&width=400'
									alt='Підготовка до IT-професій'
									width={400}
									height={300}
									className={s.advantageImage}
								/>
							</div>
							<h3 className={s.advantageTitle}>
								Підготовка до IT-професій
							</h3>
							<p className={s.advantageDescription}>
								Курси допоможуть вашим дітям зрозуміти основи IT, які
								знадобляться для подальшого навчання в університеті або
								для участі у конкурсах та олімпіадах.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
