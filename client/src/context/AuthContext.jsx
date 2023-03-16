import { createContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
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
    console.log(response)
    if (response.status === 200) {
      setAuthTokens(data.token)
      localStorage.setItem('authTokens', JSON.stringify(data))
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
    localStorage.removeItem('authTokens')
    navigate('/LogIn')
  }

  let contexData = {
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contexData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
