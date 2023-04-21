import { useNavigate } from 'react-router-dom'
import { PATHS } from '../const/paths'
const NotFound = () => {
  const navigatior = useNavigate()
  navigator(PATHS.logScreen)
  return <>Error 404: Not Found</>
}
export default NotFound
