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
  useEffect(()=>{console.log(challenges)},[challenges])
  const getChallenges = async () => {
    const response = await api.get(ENDPOINTS.tasks)
    if (response.status === 200) {
      setChallenges(response.data.sort((item1, item2)=> (item1.state < item2.state) ? -1 : 1))
    } else
      toast('Something went wrong D:', { theme: 'colored', type: 'warning' })
  }

  return (
    <>
      <NavbarComponent logoutUser={logoutUser} />
      <Container
        style={{ padding: '0', overflowX: 'hidden', paddingTop: '1rem' }}>
        <Row className='justify-content-center'>
          {challenges &&
            challenges.map((item, key) => (
              <Col key={key} md={4} style={{ marginBottom: '20px' }}>
                <ChallengeCard key={key} {...item} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}

export default UserChallenges
