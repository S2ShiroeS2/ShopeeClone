import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'
import { authResponse } from 'src/types/auth.types'
import { clearLocalStorage, getAccessToken, saveAccessToken, saveProfile } from './auth'
import pathConfig from 'src/constants/path'

class Http {
	instance: AxiosInstance
	private access_token: string
	constructor() {
		this.access_token = getAccessToken()

		this.instance = axios.create({
			baseURL: 'https://api-ecom.duthanhduoc.com',
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Add a request interceptor
		this.instance.interceptors.request.use(
			(config) => {
				if (config.headers && this.access_token) {
					config.headers.Authorization = this.access_token
					return config
				}
				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)

		// Add a response interceptor
		this.instance.interceptors.response.use(
			(response) => {
				const { url } = response.config
				const data = response.data as authResponse

				if (url === pathConfig.login || url === pathConfig.register) {
					this.access_token = data.data.access_token

					saveAccessToken(this.access_token)
					saveProfile(data.data.user)
				} else if (url === pathConfig.logout) {
					this.access_token = ''
					clearLocalStorage()
				}

				return response
			},
			function (error: AxiosError) {
				if (error?.response?.status !== HttpStatusCode.UnprocessableEntity) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const errorData: any | undefined = error.response?.data
					const errorMessage = errorData?.message || error?.message

					toast.error(errorMessage)
				}
				return Promise.reject(error)
			}
		)
	}
}

const http = new Http().instance

export default http
