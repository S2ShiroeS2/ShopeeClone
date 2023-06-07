import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface PropsType {
	name: string
	type: React.HTMLInputTypeAttribute
	placeholder?: string
	errorMessage?: string
	className?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: UseFormRegister<any>
	rules?: RegisterOptions
	complete?: string | undefined
}

const InputField = ({ name, type, placeholder, errorMessage, className, register, rules, complete }: PropsType) => {
	return (
		<div className={className}>
			<input
				type={type}
				className='w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
				placeholder={placeholder}
				autoComplete={complete}
				{...register(name, rules)}
			/>
			<div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
		</div>
	)
}

export default InputField
