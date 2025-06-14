import { Outlet } from 'react-router-dom'
import { Container } from '../layout/Container/Container'
import { Footer } from '../components/Footer/Footer'
import { FC } from 'react'

export const App: FC = () => {
	return (
		<>
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</>
	)
}
