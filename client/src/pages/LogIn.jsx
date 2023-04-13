import { useState, useContext } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import "../../public/styles/Auth.css"
const LogIn = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const { loginUser } = useContext(AuthContext)
  
  return (
    <div style={{backgroundColor: ""}}>
      <Container
        style={{ height: '100vh'}}
        className='d-flex flex-column align-items-center justify-content-center'>
        <div className='d-flex flex-column align-items-center justify-content-center' style={{zIndex: "20", marginBottom: "-1.75rem", backgroundColor: "white", paddingLeft:"5px", paddingRight:"5px"}}>
            <h1>Login</h1>
          </div>
        <Card style={{ width: '400px', padding: '20px', border: "3px solid black"}}>
        
          <Form onSubmit={loginUser}>
            <Form.Group>
              <Form.Label>Login</Form.Label>
              <Form.Control
              style={{border: "2px solid black"}}
                className="loginControls"
                type='text'
                value={login}
                name='username'
                onChange={(e) => setLogin(e.target.value)}
                placeholder='Login...'
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ paddingTop: '1rem', textDecorationThickness:"1rem" }}>Password</Form.Label>
              <Form.Control
              style={{border: "2px solid black"}}
                type='password'
                className="loginControls"
                value={password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password...'
              />
            </Form.Group>
            <Form.Check
                style={{ paddingTop: '0.5rem'}}
                type='switch'
                name='remember'
                value={remember}
                label='Remember me'
                onChange={(e) => setRemember(!remember)}
              />
            <p className="text-center"                 
              style={{ paddingTop: '1rem'}}
            >
              <i>
                Don't have an account?{" "}
              </i>
              <a href="/register" className="text-decoration-underline">
                Register
              </a>
            </p>
            <div className="d-flex flex-row gap-3 align-items-center justify-content-between">
              <div></div>
              <Button
                variant='primary'
                type='submit'
                style={{ marginTop: '-1.5rem', zIndex: "20", marginBottom: "-4rem", backgroundColor:"white", border: "none", color: "black", paddingBottom:"0px", paddingLeft: "5px", paddingRight: "5px", marginLeft:"5px", marginRight:"5px", }}>
                <h5>Submit</h5>
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

export default LogIn
