import { FC } from 'react'
import s from './Header.module.scss'
import { Paths } from '../../routing/paths'
import { GoArrowRight } from 'react-icons/go'
import { Link } from './Link/Link'

interface ILink {
	path: string
	name: string
}

export const Header: FC = () => {
	const links: ILink[] = [
		{ path: Paths.home, name: 'Home' },
		{ path: Paths.about, name: 'About' },
		{ path: Paths.courses, name: 'Courses' },
	]

	return (
		<header className={s.header}>
			<img src='/logo.png' alt='Logo' className={s.logo} />
			<ul className={s.links}>
				{links.map(({ name, path }) => (
					<Link key={path} name={name} path={path} />
				))}
			</ul>
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='https://online.ukd.edu.ua/'
				className={s.sdoLink}>
				СДО <GoArrowRight />
			</a>
		</header>
	)
}
