import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

// export default function SignIn({ csrfToken }: any) {
export default function SignIn() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <input
        className="w-auto border px-3 py-2 text-sm font-medium rounded leading-5 text-gray-900 focus:ring-0"
        type="text"
        placeholder="Username"
        onChange={(event) => setUser(event.target.value)}
      />
      <input
        className="w-auto border px-3 py-2 text-sm font-medium rounded leading-5 text-gray-900 focus:ring-0"
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button
        className="select-none capitalize justify-center rounded-md bg-blue-600 transition-colors hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={() => signIn('credentials', { username: user, password: password })}
      >
        Sign in
      </button>
    </div>
  )
}
