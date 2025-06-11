// import React from 'react'

import { FC } from 'react'
import { NavLink } from 'react-router'

interface IProps {
	name: string
	path: string
}

export const Link: FC<IProps> = ({ name, path }) => {
	return (
		<li>
			<NavLink to={path}>{name}</NavLink>
		</li>
	)
}
