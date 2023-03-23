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
    const user = jwt_decode(tokens.accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return req
    const response = await axios.post(
      ENDPOINTS.baseURL + ENDPOINTS.authTokensRefreshPath,
      {
        refreshToken: tokens.refreshToken,
      }
    )
    if ( typeof response.data.refreshToken !== 'undefined'){
      localStorage.setItem('accessToken', JSON.stringify(response.data))
      console.log("local")
    } else {
      sessionStorage.setItem('accessToken', JSON.stringify(response.data))
      console.log("session")
    }
    setTokens(response.data)
    req.headers.Authorization = `Bearer ${response.data.accessToken}`
    return req
  })

  return axiosInstance
}
export default useAxios
