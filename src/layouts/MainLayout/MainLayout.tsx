import React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header/MainHeader'

interface Props {
	children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default MainLayout
