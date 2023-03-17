import { createContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
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
      setToken(data)
      setUser(jwt_decode(data.accessToken))
      localStorage.setItem('accessToken', JSON.stringify(data))
      navigate('/blogs')
    } else {
      document.getElementById('message').innerHTML = data.error
    }
  }
  const logoutUser = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('accessToken')
    navigate('/LogIn')
  }

  let contexData = {
    user: user,
    accessTokens: token,
    setToken: setToken,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    if (token) {
      setUser(jwt_decode(token.accessToken))
    }
    setLoading(false)
  }, [token, loading])

  return (
    <AuthContext.Provider value={contexData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
