import { createContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null
  )
  const [user, setUser] = useState(() =>
    localStorage.getItem('token')
      ? jwt_decode(localStorage.getItem('token'))
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
    if (response.status === 200) {
      setToken(data)
      setUser(jwt_decode(data.token))
      localStorage.setItem('token', JSON.stringify(data))
      navigate('/blogs')
    } else {
      let message = document.getElementById('message')
      switch (response.status) {
        case 400:
          message.innerHTML = 'Username and password cannot be empty'
        case 401:
          message.innerHTML = 'Incorrect username or password'
          break
        default:
          message.innerHTML = 'Something went wrong'
      }
    }
  }
  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('token')
    navigate('/LogIn')
  }

  let contexData = {
    user: user,
    authTokens: token,
    setAuthTokens: setToken,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    if (token) {
      setUser(jwt_decode(token.token))
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
