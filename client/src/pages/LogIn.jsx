import { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'

function LoginForm() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    // your login logic goes here
  }

  return (
    <Container
      style={{ height: '100vh' }}
      className='d-flex flex-column align-items-center justify-content-center'>
      <h2>Challenges</h2>
      <Card style={{ width: '400px', padding: '20px' }}>
        <Form onSubmit={loginUser}>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control
              type='text'
              value={login}
              name='username'
              onChange={(e) => setLogin(e.target.value)}
              placeholder='Login...'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ paddingTop: '1rem' }}>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password...'
            />
          </Form.Group>

          <Button variant='primary' type='submit' style={{ marginTop: '1rem' }}>
            Log in
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

export default LoginForm
