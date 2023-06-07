import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'

class Http {
	instance: AxiosInstance
	constructor() {
		this.instance = axios.create({
			baseURL: 'https://api-ecom.duthanhduoc.com',
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Add a response interceptor
		this.instance.interceptors.response.use(
			function (response) {
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
