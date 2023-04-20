import axios from 'axios'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

// double refresh is needed after new the new token is generated

const useAxios = () => {
  const { tokens, setTokens } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: ENDPOINTS.baseURL,
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  })
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(tokens?.accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return req
    const response = await axios.post(
      ENDPOINTS.baseURL + ENDPOINTS.refreshToken,
      {
        refreshToken: tokens.refreshToken,
      }
    )
    const { id, username, ...slimData } = response.data
    localStorage.setItem('auth', JSON.stringify(slimData))
    setTokens(slimData)
    req.headers.Authorization = slimData.accessToken
    return req
  })

  return axiosInstance
}
export default useAxios
