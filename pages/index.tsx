import AuthContext from 'context/Auth'
import type { NextPage } from 'next'
import { useContext } from 'react'

const Home: NextPage = () => {
	// const { auth }: any = useContext(AuthContext)
	return (
		<>
			<main className='container'>
				<p>
					Welcome <span className='font-bold'>{'auth.userName'}</span>. You are{' '}
					<span className='font-bold'>{'auth.userRole'}</span>.
				</p>
			</main>
		</>
	)
}

export default Home
