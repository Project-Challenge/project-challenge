import { createContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() =>
    localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null
  )
  const [user, setUser] = useState(() =>
    localStorage.getItem('accessToken')
      ? jwt_decode(localStorage.getItem('accessToken'))
      : null
  )
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    let response
    let data
    try {
      response = await fetch(ENDPOINTS.baseURL + ENDPOINTS.loginUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ENDPOINTS.baseURL,
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      })
      data = await response.json()
    } catch (error) {
      console.error(error)
    }
    if (!data.error) {
      console.log('DUPA')
      setTokens(data)
      setUser(jwt_decode(data.accessToken))
      localStorage.setItem('accessToken', JSON.stringify(data))
      navigate('/challenges')
      toast('Logged in!', { theme: 'colored', type: 'success' })
    } else {
      toast(data.error, { theme: 'colored', type: 'error' })
    }
  }
  const logoutUser = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('accessToken')
    navigate('/LogIn')
    toast('Logged out!', { theme: 'colored', type: 'success' })
  }

  let contexData = {
    user: user,
    tokens: tokens,
    setTokens: setTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    if (tokens) {
      setUser(jwt_decode(tokens.accessToken))
    }
    setLoading(false)
  }, [tokens, loading])

  return (
    <AuthContext.Provider value={contexData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
