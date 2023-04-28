import { createContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../const/endpoints'
import { PATHS } from '../const/paths'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => {
    const storedTokens = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  
  const [user, setUser] = useState(() => {
    const storedTokens = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    return storedTokens ? jwt_decode(storedTokens) : null;
  });
  
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState()
  const [userPoints, setUserPoints] = useState() // this doesnt work for some reason
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
      console.log(response)
      console.error(error)
    }

    if (!data.error) {
      const { id, username, points, ...slimData } = data
      setUser(jwt_decode(slimData.accessToken))
      setTokens(slimData)
      setUserPoints(points) // this doesnt work for some reason
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
    console.log(userPoints)// this doesnt work for some reason
    setLoading(false)
  }, [tokens, loading])

  return (
    <AuthContext.Provider value={contexData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
