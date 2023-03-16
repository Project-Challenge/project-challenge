import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return user ? <Outlet /> : <Navigate to='/LogIn' />
}
export default PrivateRoutes
