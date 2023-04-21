import { useState, useContext } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ENDPOINTS } from '../const/endpoints'
import NavbarComponent from '../components/NavbarComponent'
import { toast } from 'react-toastify'
import "../../public/styles/Form.css"
import { AuthContext } from '../context/AuthContext'
import useAxios from '../utils/useAxios'

const AddChallenge = () => {
  
  const navigate = useNavigate()
  const { logoutUser,userId } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [users, setUsers] = useState([])
  const api = useAxios()

  const getUsers = async () => {
      const auth = JSON.parse(localStorage.getItem('auth')||sessionStorage.getItem("auth"))
      const response = await api.get(ENDPOINTS.users)
      setUsers(response.data)
    
  }
  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(ENDPOINTS.createTask, {
        title: e.target.title.value,
        recipient: e.target.recipient.value,
        description: e.target.description.value,
      });
      if (!response.error) {
        navigate('/challenges');
        toast('Challenge Added!', { theme: 'colored', type: 'success' });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast(error.response.data.error, { theme: 'colored', type: 'error' });
      } else {
        toast('An error occurred while adding the challenge', { theme: 'colored', type: 'error' });
      }
    }
  };
  
  return (
    <div style={{backgroundColor: ""}}>
      <NavbarComponent logoutUser={logoutUser} />
      <Container
        style={{ height: '100vh'}}
        className='d-flex flex-column align-items-center justify-content-center'>
        <div className='d-flex flex-column align-items-center justify-content-center' 
          style={{zIndex: "20", marginBottom: "-1.75rem", backgroundColor: "white", paddingLeft:"5px", paddingRight:"5px"}}>
          <h1>Add a Challenge</h1>
        </div>
        <Card style={{ width: '400px', padding: '20px', border: "3px solid black"}}>
          <Form onSubmit={createTask}>
            <Form.Group className="d-flex flex-row gap-3 align-items-center justify-content-between">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  style={{border: "2px solid black"}} 
                  className="loginControls" 
                  type='text' 
                  value={title} 
                  name='title' 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder='Title...'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Recipient</Form.Label>
                <Form.Select onClick={getUsers}
                  style={{border: "2px solid black"}} 
                  as='select'
                  className="loginControls" 
                  value={recipient} 
                  name='recipient' 
                  onChange={(e) => setRecipient(e.target.value)} 
                  placeholder='Username...'
                >
                  <option value="">--Select--</option>
                  {users && users.map(user => (<option value={user._id} key={user._id}>{user.username}</option>))}

                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Label style={{ paddingTop: '1rem', textDecorationThickness:"1rem" }}>Description</Form.Label>
            <Form.Control
              as='textarea'
              style={{ border: '2px solid black' }}
              className='loginControls'
              value={description}
              name='description'
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description...'
              rows={2}
              maxLength={120}
            />
            <div className="d-flex flex-row gap-3 align-items-center justify-content-between">  
              <div></div>
              <Button 
                variant='primary' 
                type='submit' 
                style={{ marginTop: '1rem', zIndex: "2", marginBottom: "-2.5rem", backgroundColor:"white", border: "none", color: "black", paddingBottom:"0px", paddingLeft: "5px", paddingRight: "5px", marginLeft:"5px", marginRight:"5px"}}>
                <h5>Submit</h5>
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

export default AddChallenge
