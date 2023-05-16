import axios from 'axios'
import { ENDPOINTS } from '../const/endpoints'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const useAxios = () => {
  const { tokens, setTokens } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: ENDPOINTS.baseURL,
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  })
  axiosInstance.interceptors.request.use(async (req) => {
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return req
<<<<<<<<< Temporary merge branch 1
    const response = await axios.post(
      ENDPOINTS.baseURL + ENDPOINTS.refreshToken,
      {
        refreshToken: tokens.refreshToken,
      }
    )
    localStorage.setItem('accessToken', JSON.stringify(response.data))
    setTokens(response.data)
    req.headers.Authorization = `Bearer ${response.data.accessToken}`
=========
    if (tokens.refreshToken){
      const response = await axios.post(
        ENDPOINTS.baseURL + ENDPOINTS.authTokensRefreshPath,
        {
         refreshToken: tokens.refreshToken,
        }
      )
      localStorage.setItem('accessToken', JSON.stringify(response.data))
      setTokens(response.data)
      req.headers.Authorization = `Bearer ${response.data.accessToken}`
    } else {
      req.headers.Authorization = `Bearer ${response.data.accessToken}`
    }
>>>>>>>>> Temporary merge branch 2
    return req
  })

  return axiosInstance
}
export default useAxios
