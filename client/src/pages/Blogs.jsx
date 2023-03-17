import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
const Blogs = () => {
  const { logoutUser } = useContext(AuthContext)
  return (
    <>
      <button onClick={() => logoutUser()}>aaa</button>
    </>
  )
}
export default Blogs
