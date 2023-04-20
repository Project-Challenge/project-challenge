import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'
import { toast } from 'react-toastify'
import ChallengeCard from '../components/ChallengeCard'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'

const UserChallenges = () => {
  const { logoutUser } = useContext(AuthContext)
  const [challenges, setChallenges] = useState()
  const api = useAxios()

  useEffect(() => {
    getChallenges()
  }, [])
  useEffect(() => {
  }, [challenges])
  const getChallenges = async () => {
    const auth = JSON.parse(localStorage.getItem('auth') || sessionStorage.getItem('auth'));
    const accessToken = auth?.accessToken
    const response = await api.get(ENDPOINTS.tasks, {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    })
    if (response.status === 200) {
      setChallenges(
        response.data.sort((item1, item2) =>
          item1.state < item2.state ? -1 : 1
        )
      )
    } else
      toast('Something went wrong D:', { theme: 'colored', type: 'warning' })
  }
  const markAsCompleted = async (id) => {
    const auth = JSON.parse(localStorage.getItem('auth') || sessionStorage.getItem('auth'));
    const accessToken = auth?.accessToken
    const response = await api.post(ENDPOINTS.pendingTask, { id }, {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    })
    getChallenges()
  }
  const markAsFinished = async (id) => {
    const response=await api.post(ENDPOINTS.finishTask,{id})
    getChallenges()
  }
  return (
    <>
      <NavbarComponent logoutUser={logoutUser} />
      <Container
        style={{ padding: '0', overflowX: 'hidden', paddingTop: '1rem' }}>
        <Row className='justify-content-center'>
          {challenges &&
            challenges.map((item, key) => (
              <Col key={key} md={4}>
                <ChallengeCard
                  key={key}
                  markAsCompleted={markAsCompleted}
                  markAsFinished={markAsFinished}
                  {...item}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}

export default UserChallenges
