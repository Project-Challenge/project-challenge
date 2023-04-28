import axios from 'axios'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const useAxios = () => {
  const { tokens, setTokens, setUserId, setUserPoints, logoutUser } = useContext(AuthContext)
  const user = jwt_decode(tokens.accessToken)
  const axiosInstance = axios.create({
    baseURL: ENDPOINTS.baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokens?.accessToken
    },
  })
  axiosInstance.interceptors.request.use(async (req) => {
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    let response
    let users
    if (tokens.refreshToken) {
      response = await axios.post(ENDPOINTS.baseURL + ENDPOINTS.refreshToken, {
        refreshToken: tokens.refreshToken
      })
    } else if (!isExpired) {
      response = await axios.post(ENDPOINTS.baseURL + ENDPOINTS.verifyToken, {
        accessToken: tokens.accessToken,
      })
      users = await axios.get(ENDPOINTS.baseURL + ENDPOINTS.users, {
        headers: {
          Authorization: tokens?.accessToken,
        },
        data: {
          id: response.data.id,
        },
      });
        
    } else {
      logoutUser()
    }
    const { id, username, ...slimData } = response.data
    if (slimData.accessToken) {
      localStorage.getItem('auth')
        ? localStorage.setItem('auth', JSON.stringify(slimData))
        : sessionStorage.setItem('auth', JSON.stringify(slimData)) || null
      setTokens(slimData)
      setUserPoints(users.data.points) // this doesnt work for some reason
      req.headers.Authorization = slimData.accessToken
    }
    setUserId(id)

    return req
  })

  return axiosInstance
}
export default useAxios
