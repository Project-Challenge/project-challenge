import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'
import { toast } from 'react-toastify'
import ChallengeCard from '../components/ChallengeCard'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'
import '../../public/styles/UserChallenges.css'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../const/paths'

//Need to add scaling of buttons to small display phones
const UserChallenges = () => {
  const { logoutUser, userId } = useContext(AuthContext)
  const [challenges, setChallenges] = useState()
  const api = useAxios()

  useEffect(() => {
    getChallenges()
    console.log(userId)
  }, [])
  const getChallenges = async () => {
    try {
      const response = await api.get(ENDPOINTS.tasks)
      if (response.status === 200) {
        setChallenges(
          response.data.sort((item1, item2) =>
            item1.state < item2.state ? -1 : 1
          )
        )
      } else
        toast('Something went wrong D:', { theme: 'colored', type: 'warning' })
    } catch (error) {
      console.error(error)
      toast({ theme: 'colored', type: 'warning' })
    }
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
  const revertTask = async (id) => {
    try {
      const response = await api.post(ENDPOINTS.revertTask, { id })
      getChallenges()
    } catch (error) {
      console.error(error)
      toast(error, { type: 'warning', theme: 'warning' })
    }
  }
  return (
    <>
      <NavbarComponent logoutUser={logoutUser} />
      <Container
        className='customContainer'
        style={{
          justifyItems: 'center',
          padding: '0',
          overflowX: 'hidden',
          paddingTop: '1rem',
        }}>
        {challenges ? (
          <Row style={{ width: '100%' }}>
            {challenges.map((item, key) => (
              <Col key={key} md={4}>
                <ChallengeCard
                  key={key}
                  markAsCompleted={markAsCompleted}
                  markAsFinished={markAsFinished}
                  revertTask={revertTask}
                  {...item}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className='textWithoutTasks'>
            <h1>There are no tasks</h1>
            <p>
              But you can create one in{' '}
              <NavLink className='sectionLink' to={PATHS.addChalenge}>
                this sections
              </NavLink>
            </p>
          </div>
        )}
      </Container>
    </>
  )
}

export default UserChallenges
