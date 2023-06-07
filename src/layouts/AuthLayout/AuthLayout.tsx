/* Layout for Login and Register pages */

import React from 'react'
import Footer from 'src/components/Footer'
import AuthHeader from 'src/components/Header/AuthHeader'

interface Props {
	children?: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
	return (
		<>
			<AuthHeader />
			{children}
			<Footer />
		</>
	)
}
