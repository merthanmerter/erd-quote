import Login from '@components/login'
import React, { createContext, useState } from 'react'

const AuthContext = createContext({})

type Props = {
  children: any
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState({
    authorized: true,
    userName: '',
    userRole: '',
  })
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>{!auth.authorized ? <Login /> : children}</AuthContext.Provider>
  )
}

export default AuthContext
