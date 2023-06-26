import React, { createContext, useState } from 'react'
import { getAccessToken } from 'src/utils/auth'

interface IAppContext {
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: IAppContext = {
	isAuthenticated: Boolean(getAccessToken()),
	setIsAuthenticated: () => null
}

export const AppContext = createContext<IAppContext>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

	return (
		<AppContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
