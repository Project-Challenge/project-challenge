import { createContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../const/endpoints'
import { PATHS } from '../const/paths'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() =>
    localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : JSON.parse(sessionStorage.getItem('auth')) || null
  )
  const [user, setUser] = useState(() =>
    localStorage.getItem('auth')
      ? jwt_decode(localStorage.getItem('auth'))
      : null
  )
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState()
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
    if (e.target.password.value != e.target.repeatPassword.value) {
      toast("Passwords don't match", { theme: 'colored', type: 'error' })
    } else {
      let response
      let data
      try {
        response = await fetch(ENDPOINTS.baseURL + ENDPOINTS.registerUser, {
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
        navigate(PATHS.logScreen)
        toast('Registered!', { theme: 'colored', type: 'success' })
      } else {
        toast(data.error, { theme: 'colored', type: 'error' })
      }
    }
  }

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
          remember: e.target.remember.value,
        }),
      })
      data = await response.json()
    } catch (error) {
      console.error(error)
    }
    console.log(data)
    if (!data.error) {
      const { id, username, ...slimData } = data //"slimData" doesn't include id or username, you can still get it from "data" but it wont save in storage
      setUser(jwt_decode(slimData.accessToken))
      setTokens(slimData)
      console.log(data)
      setUserId(id)
      if (slimData.refreshToken) {
        localStorage.setItem('auth', JSON.stringify(slimData))
      } else {
        sessionStorage.setItem('auth', JSON.stringify(slimData))
      }
      navigate(PATHS.challenges)
      toast('Logged in!', { theme: 'colored', type: 'success' })
    } else {
      toast(data.error, { theme: 'colored', type: 'error' })
    }
  }
  const logoutUser = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('auth')
    sessionStorage.removeItem('auth')
    navigate(PATHS.logScreen)
    toast('Logged out!', { theme: 'colored', type: 'success' })
  }

  let contexData = {
    user: user,
    tokens: tokens,
    userId: userId,
    setUserId: setUserId,
    setTokens: setTokens,
    setUser: setUser,
    loginUser: loginUser,
    registerUser: registerUser,
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
