import { useState, useEffect } from 'react'
import { GoArrowRight } from 'react-icons/go'
import { HiMenu, HiX } from 'react-icons/hi'
import s from './Header.module.scss'
import { Link } from './Link/Link'
import { Paths } from '../../routing/paths'
import { useLocation } from 'react-router-dom'

interface ILink {
	path: string
	name: string
}

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	const location = useLocation()

	const links: ILink[] = [
		{ path: Paths.home, name: 'Головна' },
		{ path: Paths.about, name: 'Про нас' },
		{ path: Paths.courses, name: 'Курси' },
	]

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 900)
		}

		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)

		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	useEffect(() => {
		if (!isMenuOpen) return

		setIsMenuOpen(false)
	}, [location.pathname])

	const toggleMenu = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header className={s.header}>
			<img src='/logo.png' alt='Logo' className={s.logo} />

			{/* Desktop navigation */}
			<ul className={s.links}>
				{!isMobile &&
					links.map(({ name, path }) => (
						<Link key={path} name={name} path={path} />
					))}
			</ul>

			{/* Mobile burger menu button */}
			{isMobile && (
				<button className={s.burgerButton} onClick={toggleMenu}>
					{isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
				</button>
			)}

			{/* Mobile menu */}
			{isMobile && isMenuOpen && (
				<div className={s.mobileMenu} onClick={e => e.stopPropagation()}>
					<ul className={s.mobileLinks}>
						{links.map(({ name, path }) => (
							<Link key={path} name={name} path={path} />
						))}
						<li className={s.mobileSdoLink}>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href='https://online.ukd.edu.ua/'
								className={s.sdoLink}>
								СДО <GoArrowRight />
							</a>
						</li>
					</ul>
				</div>
			)}

			{/* СДО link (visible only on desktop) */}
			{!isMobile && (
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://online.ukd.edu.ua/'
					className={s.sdoLink}>
					СДО <GoArrowRight />
				</a>
			)}
		</header>
	)
}
