import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logout } from 'src/apis/auth.api'
import Popover from 'src/components/Popover'
import pathConfig from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

const Header = () => {
	const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext)

	const logoutMoutation = useMutation({
		mutationFn: () => logout(),
		onSuccess: () => {
			setIsAuthenticated(false)
		}
	})

	const handleLogout = () => {
		logoutMoutation.mutate()
	}

	return (
		<header className='sticky top-0 z-50'>
			<div className='flex h-20 items-center justify-between border-b-2 px-9 py-2 bg-blend-soft-light shadow-sm transition-transform duration-300'>
				<Link to={pathConfig.home}>
					<span className='text-3xl font-semibold text-blue-600'>Chamomile </span>
				</Link>
				<div className='mx-auto h-full w-2/4 overflow-hidden px-10 lg:block'>
					<form className='col-span-9 h-full'>
						<div className='relative flex h-full items-center rounded-lg bg-white p-1'>
							<input
								type='text'
								name='search'
								autoComplete='off'
								placeholder='Search here'
								className='h-full w-full flex-grow rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 pl-16 text-slate-700 placeholder-gray-500 transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-0 focus:ring-0'
							/>
							<button
								type='button'
								className='absolute left-0 h-full rounded-sm bg-transparent px-6  text-gray-600 hover:text-blue-600'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='h-6 w-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
				<Popover
					className='flex shrink-0 cursor-pointer items-center text-base font-normal text-slate-700 hover:text-blue-600'
					renderPopover={
						<div className='border-stroke rounded-10 relative border bg-white shadow-sm '>
							<div className='flex flex-col px-3 py-2'>
								<button className='px-3 py-2 hover:text-blue-600'>Tiếng việt</button>
								<button className='mt-2 px-3 py-2 hover:text-blue-600'>Tiếng anh</button>
							</div>
						</div>
					}
				>
					{/* Children */}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-5 w-5'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
						/>
					</svg>
					<span className='mx-1'>Tiếng việt</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-5 w-5'
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
					</svg>
				</Popover>
				{isAuthenticated && (
					<Popover
						className='ml-6 flex shrink-0 cursor-pointer items-center text-base font-normal text-slate-700 hover:text-blue-600'
						renderPopover={
							<div className='border-stroke rounded-10 relative border bg-white shadow-sm '>
								<div className='flex flex-col justify-start px-3 py-2'>
									<Link
										to={pathConfig.profile}
										className='px-3 py-2 text-center hover:bg-slate-100 hover:text-blue-600'
									>
										Tài khoản của tôi
									</Link>
									<Link
										to='/'
										className='mt-2 px-3 py-2 text-center hover:bg-slate-100 hover:text-blue-600'
									>
										Đơn mua
									</Link>
									<button
										type='button'
										onClick={handleLogout}
										className='mt-2 px-3 py-2 hover:bg-slate-100 hover:text-blue-600'
									>
										Đăng xuất
									</button>
								</div>
							</div>
						}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-5 w-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
						<span className='mx-1'>{profile?.name}</span>
					</Popover>
				)}
				{!isAuthenticated && (
					<div className='flex items-center'>
						<Link to={pathConfig.register} className='mx-3 capitalize text-slate-700 hover:text-blue-600'>
							Đăng ký
						</Link>
						<div className='h-4 border-r-[1px] border-r-white/40 bg-slate-700'></div>
						<Link to={pathConfig.login} className='mx-3 capitalize text-slate-700 hover:text-blue-600'>
							Đăng nhập
						</Link>
					</div>
				)}

				<Popover
					className='ml-6 flex shrink-0 cursor-pointer items-center text-base font-normal text-slate-700 hover:text-blue-600'
					renderPopover={
						<div className='border-stroke rounded-10 relative w-full max-w-[400px] border bg-white text-sm shadow-sm'>
							<div className='p-2'>
								<div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
								<div className='mt-5'>
									<div className='mt-4 flex'>
										<div className='flex-shrink-0'>
											<img
												src='https://down-vn.img.susercontent.com/file/vn-11134201-23030-b4su3lug3iov20_tn'
												alt='item'
												className='h-11 w-11 object-cover'
											/>
										</div>
										<div className='ml-2 flex-grow overflow-hidden'>
											<div className='truncate'>
												Sách - Atomic Habits: Thay Đổi Tí Hon Hiệu Quả Bất Ngờ - Phương Nam
											</div>
										</div>
										<div className='ml-2 flex-shrink-0'>
											<span className='text-blue-600'>₫149.310</span>
										</div>
									</div>
									<div className='mt-4 flex'>
										<div className='flex-shrink-0'>
											<img
												src='https://down-vn.img.susercontent.com/file/vn-11134201-23030-b4su3lug3iov20_tn'
												alt='item'
												className='h-11 w-11 object-cover'
											/>
										</div>
										<div className='ml-2 flex-grow overflow-hidden'>
											<div className='truncate'>
												Sách - Atomic Habits: Thay Đổi Tí Hon Hiệu Quả Bất Ngờ - Phương Nam
											</div>
										</div>
										<div className='ml-2 flex-shrink-0'>
											<span className='text-blue-600'>₫149.310</span>
										</div>
									</div>
									<div className='mt-4 flex'>
										<div className='flex-shrink-0'>
											<img
												src='https://down-vn.img.susercontent.com/file/vn-11134201-23030-b4su3lug3iov20_tn'
												alt='item'
												className='h-11 w-11 object-cover'
											/>
										</div>
										<div className='ml-2 flex-grow overflow-hidden'>
											<div className='truncate'>
												Sách - Atomic Habits: Thay Đổi Tí Hon Hiệu Quả Bất Ngờ - Phương Nam
											</div>
										</div>
										<div className='ml-2 flex-shrink-0'>
											<span className='text-blue-600'>₫149.310</span>
										</div>
									</div>
								</div>
								<div className='mt-6 flex items-center justify-between'>
									<div className='text-xs capitalize text-gray-500'> Thêm vào giỏ hàng</div>
									<button className='rounded-sm bg-blue-600 px-4 py-2 capitalize text-white hover:bg-opacity-90'>
										Xem giỏ hàng
									</button>
								</div>
							</div>
						</div>
					}
				>
					<Link to='/'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='h-5 w-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
							/>
						</svg>
					</Link>
				</Popover>
			</div>
		</header>
	)
}

export default Header
