import { User } from './user.types'
import { SuccessResponse } from './utils.type'

export type authResponse = SuccessResponse<{
	access_token: string
	expires: number
	refresh_token: string
	expires_refresh_token: number
	user: User
}>
