import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../../public/styles/Navbar.css'
import { PATHS } from '../const/paths'

const NavbarComponent = ({ logoutUser }) => {
  return (
    <Navbar expand='lg' className='my-navbar'>
      <img
        src='../../images/trophy.svg'
        alt='logo'
        style={{ width: '2rem', margin: '10px', marginLeft: '20px' }}
      />
      <Navbar.Brand
        className='mr-auto'
        style={{
          marginLeft: '1rem',
          color: 'inherit',
          marginBottom: '-4rem',
          backgroundColor: 'white',
          paddingLeft: '5px',
          paddingRight: '5px',
        }}>
        Challenges
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Nav style={{ marginRight: '1.5rem', paddingLeft: '1.5rem' }}>
          <NavLink className='navlink' to={PATHS.challenges}>
            My challenges
          </NavLink>
          <NavLink className='navlink' to={PATHS.addChalenge}>
            New challenge
          </NavLink>
          <NavDropdown className='my-dropdown' title='Settings' drop='start'>
            <NavDropdown.Item to='/action-1'>Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutUser} style={{ color: 'red' }}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
