import AuthContext from 'context/Auth'
import { useContext } from 'react'

export default function Login() {
	const { setAuth } : any = useContext(AuthContext)

	return (
		<div className='container'>
			<p className='font-bold mt-6 py-2'>Not Authorized. Please login.</p>
			<button
				onClick={() =>
					setAuth({
						authorized: true,
						userName: 'merthan',
						userRole: 'admin',
					})
				}
				className='select-none justify-start capitalize inline-flex w-auto justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
				Log In
			</button>
		</div>
	)
}
