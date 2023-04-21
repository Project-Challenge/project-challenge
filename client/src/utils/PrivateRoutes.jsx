import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { PATHS } from '../const/paths'

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext)
  return user ? <Outlet /> : <Navigate to={PATHS.logScreen} />
}
export default PrivateRoutes
