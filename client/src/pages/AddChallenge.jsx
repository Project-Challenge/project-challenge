import { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ENDPOINTS } from '../const/endpoints'
import { toast } from 'react-toastify'
import "../../public/styles/Form.css"


const AddChallenges = () => {
  
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')

  const createTask = async (e) => {
    e.preventDefault()
    let response
    let data
    try {
      response = await fetch(ENDPOINTS.baseURL + ENDPOINTS.createTask, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ENDPOINTS.baseURL,
        },
        body: JSON.stringify({
          title: e.target.title.value,
          createdBy: "643c2c8a72f88db191a1d185", // this is supposed to be the current user's id
          recipient: "placeholder", // recipent's id found from their username, or chosen from a list 
          description: e.target.description.value,
        }),
      })
      data = await response.json()
    } catch (error) {
      console.error(error)
    }
    if (!data.error) {
      navigate('/challenges')
      toast('Challenge Added!', { theme: 'colored', type: 'success' })
    } else {
      toast(data.error, { theme: 'colored', type: 'error' })
    }
  }
  
  return (
    <div style={{backgroundColor: ""}}>
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
                <Form.Control 
                  style={{border: "2px solid black"}} 
                  type='text' 
                  className="loginControls" 
                  value={recipient} 
                  name='recipient' 
                  onChange={(e) => setRecipient(e.target.value)} 
                  placeholder='Username...'
                />
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

export default AddChallenges
