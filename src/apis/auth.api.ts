import pathConfig from 'src/constants/path'
import { authResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) =>
	http.post<authResponse>(pathConfig.register, body)

export const login = (body: { email: string; password: string }) => http.post<authResponse>(pathConfig.login, body)

export const logout = () => http.post(pathConfig.logout)
