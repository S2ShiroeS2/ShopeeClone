import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import pathConfig from 'src/constants/path'

const AuthHeader = () => {
	const location = useLocation()

	return (
		<header className='border-b border-x-neutral-600 py-5'>
			<div className='container'>
				<nav className='flex items-end'>
					<Link to={pathConfig.home}>
						<span className='text-3xl font-semibold text-blue-600'>Chamomile </span>
					</Link>
					<div className='ml-5 text-xl text-slate-700 lg:text-2xl'>
						{location.pathname === pathConfig.login ? 'Đăng nhập' : 'Đăng ký'}
					</div>
				</nav>
			</div>
		</header>
	)
}

export default AuthHeader
