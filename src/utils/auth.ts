import { User } from 'src/types/user.types'

// Token
export const saveAccessToken = (access_token: string) => {
	localStorage.setItem('access_token', access_token)
}

export const getAccessToken = () => localStorage.getItem('access_token') || ''

// user
export const getProfile = () => {
	const result = localStorage.getItem('profile')

	return result ? JSON.parse(result) : null
}

export const saveProfile = (profile: User) => {
	localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearLocalStorage = () => {
	localStorage.removeItem('access_token')
	localStorage.removeItem('profile')
}
