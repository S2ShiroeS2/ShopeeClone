import { authResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<authResponse>('/register', body)

export const login = (body: { email: string; password: string }) => http.post<authResponse>('./login', body)
