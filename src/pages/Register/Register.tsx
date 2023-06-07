import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputField from 'src/components/InputField'
import omit from 'lodash/omit'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = Schema

export const Register = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	})

	const registerAccountMutation = useMutation({
		mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
	})

	const onSubmit = handleSubmit(
		(data) => {
			const body = omit(data, ['confirm_password'])
			registerAccountMutation.mutate(body, {
				onSuccess: (data) => {
					console.log('Success: >>', data)
				},
				onError: (error) => {
					if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
						const fromError = error.response?.data.data

						if (fromError) {
							Object.keys(fromError).forEach((key) => {
								setError(key as keyof Omit<FormData, 'confirm_password'>, {
									message: fromError[key as keyof Omit<FormData, 'confirm_password'>],
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
		<div className='bg-white '>
			<div className='container'>
				<div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
					<div className='lg:col-span-2 lg:col-start-4'>
						<form
							className='rounded-lg bg-white p-10 shadow-md shadow-slate-400'
							onSubmit={onSubmit}
							noValidate
						>
							<div className='text-2xl'>Đăng ký</div>
							<InputField
								className='mt-8'
								type='email'
								name='email'
								placeholder='Email'
								register={register}
								errorMessage={errors?.email?.message}
							/>
							<InputField
								className='mt-2'
								type='password'
								complete='on'
								name='password'
								placeholder='Password'
								register={register}
								errorMessage={errors?.password?.message}
							/>
							<InputField
								className='mt-2'
								type='password'
								complete='on'
								name='confirm_password'
								placeholder='Confirm password'
								register={register}
								errorMessage={errors?.confirm_password?.message}
							/>
							<div className='mt-2'>
								<button
									type='submit'
									className='w-full rounded-full bg-blue-600 px-2 py-4 text-center uppercase text-white hover:bg-blue-700'
								>
									Đăng ký
								</button>
							</div>
							<div className='mt-8 flex items-center justify-center'>
								<span className='mr-2 text-gray-400'>Bạn đã có tài khoản? </span>
								<Link className='text-blue-400' to='/login'>
									Đăng nhập
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
