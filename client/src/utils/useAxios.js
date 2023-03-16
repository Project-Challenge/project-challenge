import axios from 'axios'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const useAxios = () => {
  const { authTokens, setAuthTokens } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: ENDPOINTS.baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  })

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return req
    const response = await axios.post(
      ENDPOINTS.baseURL + ENDPOINTS.authTokensRefreshPath,
      {
        refresh: authTokens.refresh,
      }
    )
    localStorage.setItem('authTokens', JSON.stringify(response.data))
    setAuthTokens(response.data)
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
  })

  return axiosInstance
}
export default useAxios
