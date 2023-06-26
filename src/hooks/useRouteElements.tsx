import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import AuthLayout from 'src/layouts/AuthLayout'
import MainLayout from 'src/layouts/MainLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Profile from 'src/pages/Profile'
import Register from 'src/pages/Register'

const ProtectedRoute = () => {
	const { isAuthenticated } = useContext(AppContext)

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

const RejectedRoute = () => {
	const { isAuthenticated } = useContext(AppContext)

	return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElements = () => {
	const routeElements = useRoutes([
		{
			path: '/',
			index: true,
			element: (
				<MainLayout>
					<ProductList />
				</MainLayout>
			)
		},
		{
			path: '',
			element: <RejectedRoute />,
			children: [
				{
					path: '/login',
					element: (
						<AuthLayout>
							<Login />
						</AuthLayout>
					)
				},
				{
					path: '/register',
					element: (
						<AuthLayout>
							<Register />
						</AuthLayout>
					)
				}
			]
		},
		{
			path: '',
			element: <ProtectedRoute />,
			children: [
				{
					path: '/profile',
					element: (
						<MainLayout>
							<Profile />
						</MainLayout>
					)
				}
			]
		}
	])
	return routeElements
}

export default useRouteElements
