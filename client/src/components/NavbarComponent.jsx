import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import '../../public/styles/Navbar.css'

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
        Challanges
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Nav style={{ marginRight: '1.5rem', paddingLeft: '1.5rem' }}>
          <Nav.Link to='/challanges'>Home</Nav.Link>
          <Nav.Link to='/addChallange'>New challenge</Nav.Link>
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
