import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'
import { toast } from 'react-toastify'
import ChallengeCard from '../components/ChallengeCard'
import { CardGroup, Container, Row, Col } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'

const UserChallenges = () => {
  const { logoutUser } = useContext(AuthContext)
  const [challenges, setChallenges] = useState()
  const api = useAxios()

  useEffect(() => {
    getChallenges()
  }, [])

  const getChallenges = async () => {
    const response = await api.get(ENDPOINTS.getTasks)
    if (response.status === 200) {
      setChallenges(response.data)
    } else
      toast('Something went wrong D:', { theme: 'colored', type: 'warning' })
  }

  return (
    <>
      <NavbarComponent logoutUser={logoutUser} />
      <Container fluid style={{ padding: '0', overflowX: 'hidden' }}>
      <Row>
        {challenges &&
          challenges.map((item, key) => (
          <Col key={key}>
            <ChallengeCard {...item} />
          </Col>
        ))}
    </Row>

      </Container>
    </>
  )
}

export default UserChallenges
