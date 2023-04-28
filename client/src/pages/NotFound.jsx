import { Link } from 'react-router-dom'
import { PATHS } from '../const/paths'
const NotFound = () => {
  return (
    <>
      Error 404: Not Found, get back to{' '}
      <Link to={PATHS.challenges}>your challenges</Link>
    </>
  )
}
export default NotFound
