import axios from 'axios'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const useAxios = () => {
  const { tokens, setTokens, user, setUserId } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: ENDPOINTS.baseURL,
    headers: {
      Authorization: tokens?.accessToken,
    },
  })
  axiosInstance.interceptors.request.use(async (req) => {
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return req
    const response = await axios.post(
      ENDPOINTS.baseURL + ENDPOINTS.refreshToken,
      {
        refreshToken: tokens.refreshToken,
      }
    )
    localStorage.setItem('accessToken', JSON.stringify(response.data))
    setTokens(response.data)
    setUserId(response.data.id)
    req.headers.Authorization = response.data.accessToken

    if (tokens.refreshToken) {
      const response = await axios.post(
        ENDPOINTS.baseURL + ENDPOINTS.authTokensRefreshPath,
        {
          refreshToken: tokens.refreshToken,
        }
      )
      localStorage.setItem('accessToken', JSON.stringify(response.data))
      setTokens(response.data)
      setUserId(response.data.id)
      req.headers.Authorization = response.data.accessToken
    } else {
      req.headers.Authorization = response.data.accessToken
    }
    return req
  })

  return axiosInstance
}
export default useAxios
