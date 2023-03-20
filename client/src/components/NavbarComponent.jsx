import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import '../../public/styles/Navbar.css'

const NavbarComponent = ({ logoutUser }) => {
  return (
    <Navbar expand='lg' className='my-navbar'>
      <Navbar.Brand
        className='mr-auto'
        style={{ marginLeft: '1rem', color: 'inherit' }}>
        React-Bootstrap
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Nav style={{ marginRight: '1.5rem', paddingLeft: '1.5rem' }}>
          <Nav.Link
            to='/challanges'
            style={{ marginLeft: '1rem', color: 'white' }}>
            Home
          </Nav.Link>
          <NavDropdown
            title={<span style={{ color: 'white' }}>Settings</span>}
            drop='down'>
            <NavDropdown.Item to='/action-1'>Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item to='/separated-link' style={{ color: 'red' }}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
