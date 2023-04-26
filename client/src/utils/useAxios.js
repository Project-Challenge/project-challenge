import axios from 'axios'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

// double refresh is needed after new the new token is generated

const useAxios = () => {
  const { tokens, setTokens, setUserId, logoutUser } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: ENDPOINTS.baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokens?.accessToken,
    },
  })
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(tokens?.accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    let response
    if (tokens.refreshToken) {
      response = await axios.post(ENDPOINTS.baseURL + ENDPOINTS.refreshToken, {
        refreshToken: tokens.refreshToken,
      })
    } else if (!isExpired) {
      response = await axios.post(ENDPOINTS.baseURL + ENDPOINTS.verifyToken, {
        accessToken: tokens?.accessToken,
      })
    } else {
      logoutUser()
    }
    const { id, username, ...slimData } = response.data

    if (slimData.accessToken) {
      localStorage.setItem('auth', JSON.stringify(slimData))
      setTokens(slimData)
    }

    setUserId(id)
    req.headers.Authorization = slimData.accessToken
    return req
  })

  return axiosInstance
}
export default useAxios
