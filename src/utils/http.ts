import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'
import { authResponse } from 'src/types/auth.types'
import { clearAccessToken, getAccessToken, saveAccessToken } from './auth'

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

				if (url === '/login' || url === '/register') {
					this.access_token = (response.data as authResponse).data.access_token
					saveAccessToken(this.access_token)
				} else if (url === '/logout') {
					this.access_token = ''
					clearAccessToken()
				}

				return response
			},
			function (error: AxiosError) {
				if (error?.response?.status !== HttpStatusCode.UnprocessableEntity) {
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
