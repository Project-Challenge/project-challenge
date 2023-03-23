import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { ENDPOINTS } from '../const/endpoints'

let tokens = localStorage.getItem('accessToken')
  ? JSON.parse(localStorage.getItem('accessToken'))
  : null
const axiosInstance = axios.create({
  baseURL: ENDPOINTS.baseURL,
  headers: {
    Authorization: `Bearer ${tokens?.accessToken}`,
  },
})
axiosInstance.interceptors.request.use(async (req) => {
  if (!tokens) {
    tokens = localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null
    req.headers.Authorization = `Bearer ${tokens?.accessToken}`
  }

  const user = jwt_decode(tokens.accessToken)
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
  if (!isExpired) return req
  const response = await axios.post(
    ENDPOINTS.baseURL + ENDPOINTS.accessTokenRefreshPath,
    {
      refreshToken: tokens.refreshToken,
    }
  )
  localStorage.setItem('accessToken', JSON.stringify(response.data))
  console.log(response + 'DUPADUPADUPA')
  req.headers.Authorization = `Bearer ${response.data.accessToken.accessToken}`
  return req
})
export default axiosInstance
