import { FC } from 'react'

import s from './Container.module.scss'
import classNames from 'classnames'
import { Header } from '../../components/Header/Header'
// import { Footer } from '../../components/Footer/Footer'

interface IProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export const Container: FC<IProps> = ({ children, ...props }) => {
	return (
		<div {...props} className={classNames(s.container, props.className)}>
			<Header />
			{children}
			{/* <Footer /> */}
		</div>
	)
}
