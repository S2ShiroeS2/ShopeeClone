import React, { createContext, useState } from 'react'
import { User } from 'src/types/user.types'
import { getAccessToken, getProfile } from 'src/utils/auth'

interface IAppContext {
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
	profile: User
	setProfile: React.Dispatch<React.SetStateAction<User>>
}

const initialAppContext: IAppContext = {
	isAuthenticated: Boolean(getAccessToken()),
	setIsAuthenticated: () => null,
	profile: getProfile(),
	setProfile: () => null
}

export const AppContext = createContext<IAppContext>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
	const [profile, setProfile] = useState<User>(initialAppContext.profile)

	return (
		<AppContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				profile,
				setProfile
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
