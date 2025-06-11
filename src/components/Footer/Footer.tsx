import s from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.footerTop}>
				<div className={s.footerContainer}>
					<div className={s.footerGrid}>
						<div className={s.footerColumn}>
							<h3 className={s.footerTitle}>UKD IT School</h3>
							<p className={s.footerText}>
								Це місце, де учні не лише навчаються, але й готуються до
								успішної кар'єри в сфері технологій!
							</p>
						</div>
						<div className={s.footerColumn}>
							<h3 className={s.footerTitle}>Контакти</h3>
							<p className={s.footerText}>Email: info@ukd-it.school</p>
							<p className={s.footerText}>Телефон: +380 12 345 6789</p>
						</div>
						<div className={s.footerColumn}>
							<h3 className={s.footerTitle}>Слідкуйте за нами</h3>
							<div className={s.socialLinks}>
								<a href='#' className={s.socialLink}>
									Facebook
								</a>
								<a href='#' className={s.socialLink}>
									Instagram
								</a>
								<a href='#' className={s.socialLink}>
									Telegram
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={s.bottom}>
				© 2024. King Danylo University. All rights reserved.
			</div>
		</footer>
	)
}
