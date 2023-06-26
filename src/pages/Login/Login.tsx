import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import InputField from 'src/components/InputField'
import { loginSchema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'

type FormData = Omit<Schema, 'confirm_password'>

export const Login = () => {
	const { setIsAuthenticated } = useContext(AppContext)
	const navigate = useNavigate()

	const {
		register,
		setError,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(loginSchema)
	})

	const loginMoutation = useMutation({
		mutationFn: (body: FormData) => login(body)
	})

	const onSubmit = handleSubmit(
		(data) => {
			loginMoutation.mutate(data, {
				onSuccess: () => {
					setIsAuthenticated(true)
					navigate('/')
				},
				onError: (error) => {
					if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
						const formError = error.response?.data.data

						if (formError) {
							Object.keys(formError).forEach((key) => {
								setError(key as keyof FormData, {
									message: formError[key as keyof FormData],
									type: 'Server'
								})
							})
						}
					}
				}
			})
		},
		(error) => {
			console.log('Error: >>>', error)
		}
	)

	return (
		<div className='bg-white'>
			<div className='container'>
				<div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
					<div className='lg:col-span-2 lg:col-start-4'>
						<form
							className='rounded-lg bg-white p-10 shadow-md shadow-slate-400'
							onSubmit={onSubmit}
							noValidate
						>
							<div className='text-2xl'>Đăng nhập</div>
							<InputField
								type='email'
								name='email'
								className='mt-8'
								placeholder='Email'
								register={register}
								errorMessage={errors.email?.message}
							/>
							<InputField
								type='password'
								name='password'
								complete='on'
								className='mt-2'
								placeholder='Password'
								register={register}
								errorMessage={errors.password?.message}
							/>
							<div className='mt-2'>
								<button
									type='submit'
									className='w-full rounded-full bg-blue-600 px-2 py-4 text-center uppercase text-white hover:bg-blue-700'
								>
									Đăng nhập
								</button>
							</div>
							<div className='mt-8 flex items-center justify-center'>
								<span className='mr-2 text-gray-400'>Bạn chưa có tài khoản? </span>
								<Link className='text-blue-400' to='/register'>
									Đăng ký
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
