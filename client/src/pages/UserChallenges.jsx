import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'
import { toast } from 'react-toastify'
import ChallengeCard from '../components/ChallengeCard'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'
import '../../public/styles/UserChallenges.css'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../const/paths'
import { isCancel } from 'axios'

// Need to add scaling of buttons to small display phones
// ^ Low priority - as in wont be doing that
const UserChallenges = () => {
  const { logoutUser, userId, userPoints } = useContext(AuthContext)
  const [challenges, setChallenges] = useState()
  const [isVerify, setIsVerify] = useState(false)
  const [state, setState] = useState(-1)
  const [searchTerm, setSearchTerm] = useState('')

  const handleRadioChange = (event) => {
    setIsVerify(event.target.value === 'true')
  }

  const handleSelectChange = (event) => {
    setState(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const api = useAxios()
  useEffect(() => {
    console.log(isVerify)
    getChallenges()
  }, [isVerify, state])
  useEffect(() => {
    const timer = setTimeout(() => getChallenges(), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])
  const getChallenges = async () => {
    let response
    try {
      response = await api.post(ENDPOINTS.tasks, {
        isVerify: isVerify,
        state: state,
        like: searchTerm,
      })
      if (response.status === 200) {
        setChallenges(
          response.data.sort((item1, item2) =>
            item1.state < item2.state ? -1 : 1
          )
        )
      } else if (response.status === 204) {
        setChallenges(null)
      }
    } catch (error) {
      console.error(error)
      toast('Shit went down', { theme: 'colored', type: 'warning' })
    }
    console.log(response)
  }
  const markAsCompleted = async (id) => {
    try {
      const response = await api.post(ENDPOINTS.pendingTask, { id })
      getChallenges()
    } catch (error) {
      console.error(error)
      toast(error, { type: 'warning', theme: 'warning' })
    }
  }
  const markAsFinished = async (id) => {
    try {
      const response = await api.post(ENDPOINTS.finishTask, { id })
      getChallenges()
    } catch (error) {
      console.error(error)
      toast(error, { type: 'warning', theme: 'warning' })
    }
  }
  const revertTask = async (id, state) => {
    try {
      const response = await api.post(ENDPOINTS.revertTask, { id, state })
      getChallenges()
    } catch (error) {
      console.error(error)
      toast(error, { type: 'warning', theme: 'warning' })
    }
  }
  return (
    <>
      <NavbarComponent logoutUser={logoutUser} userPoints={userPoints} />
      <Container
        className='customContainer'
        style={{
          justifyItems: 'center',
          padding: '0',
          overflowX: 'hidden',
          paddingTop: '1rem',
        }}>
        <Row style={{ width: '100%' }}>
          <Form style={{ paddingBottom: '20px' }}>
            <div className='filtersBox'>
              <Form.Check
                type='switch'
                label='To Verify'
                name='verifyRadio'
                id='verifyYes'
                value={!isVerify}
                checked={isVerify}
                onChange={handleRadioChange}
              />
              <Form.Control
                style={{ width: '30rem' }}
                className='loginControls'
                type='text'
                placeholder='Search'
                value={searchTerm}
                onChange={handleSearch}
              />
              <Form.Control
                style={{ width: '10rem' }}
                as='select'
                className='loginControls'
                onChange={handleSelectChange}>
                <option value='-1'>State</option>
                <option value='0'>New</option>
                <option value='1'>Pending</option>
                <option value='2'>Finished</option>
              </Form.Control>
            </div>
          </Form>
          {challenges ? (
            challenges.map((item, key) => (
              <Col key={key} md={4}>
                <ChallengeCard
                  key={key}
                  markAsCompleted={markAsCompleted}
                  markAsFinished={markAsFinished}
                  revertTask={revertTask}
                  {...item}
                />
              </Col>
            ))
          ) : (
            <div className='textWithoutTasks'>
              <h1>There are no tasks</h1>
              <p>
                But you can create one in{' '}
                <NavLink className='sectionLink' to={PATHS.addChalenge}>
                  this section
                </NavLink>
              </p>
            </div>
          )}
        </Row>
      </Container>
    </>
  )
}

export default UserChallenges
