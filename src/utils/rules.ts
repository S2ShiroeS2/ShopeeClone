// import type { UseFormGetValues, RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
// 	email: {
// 		required: {
// 			value: true,
// 			message: 'Email là bắt buộc!'
// 		},
// 		pattern: {
// 			value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
// 			message: 'Email không đúng định dạng!'
// 		},
// 		maxLength: {
// 			value: 160,
// 			message: 'Độ dài phải từ 5 -> 160 ký tự!'
// 		},
// 		minLength: {
// 			value: 5,
// 			message: 'Độ dài phải từ 5 -> 160 ký tự!'
// 		}
// 	},
// 	password: {
// 		required: {
// 			value: true,
// 			message: 'Password là bắt buộc!'
// 		},
// 		pattern: {
// 			value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
// 			message: 'Password không hợp lệ!'
// 		},
// 		maxLength: {
// 			value: 160,
// 			message: 'Độ dài phải từ 6 -> 160 ký tự!'
// 		},
// 		minLength: {
// 			value: 6,
// 			message: 'Độ dài phải từ 6 -> 160 ký tự!'
// 		}
// 	},
// 	confirm_password: {
// 		required: {
// 			value: true,
// 			message: 'Nhập lại Password là bắt buộc!'
// 		},
// 		maxLength: {
// 			value: 160,
// 			message: 'Độ dài phải từ 6 -> 160 ký tự!'
// 		},
// 		minLength: {
// 			value: 6,
// 			message: 'Độ dài phải từ 6 -> 160 ký tự!'
// 		},
// 		validate:
// 			typeof getValues === 'function'
// 				? (value) => value === getValues('password') || 'Nhập lại, password không khớp!'
// 				: undefined
// 	}
// })

export const schema = yup.object({
	email: yup
		.string()
		.required('Email là bắt buộc!')
		.email('Email không đúng định dạng!')
		.min(5, 'Độ dài phải từ 5 -> 160 ký tự!')
		.max(160, 'Độ dài phải từ 5 -> 160 ký tự!'),
	password: yup
		.string()
		.required('Password là bắt buộc!')
		.min(6, 'Độ dài phải từ 6 -> 160 ký tự!')
		.max(160, 'Độ dài phải từ 6 -> 160 ký tự!'),
	confirm_password: yup
		.string()
		.required('Password là bắt buộc!')
		.min(6, 'Độ dài phải từ 6 -> 160 ký tự!')
		.max(160, 'Độ dài phải từ 6 -> 160 ký tự!')
		.oneOf([yup.ref('password')], 'Nhập lại, password không khớp!')
})

//Login schema
export const loginSchema = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
