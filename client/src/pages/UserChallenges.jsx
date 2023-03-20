import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'
import { toast } from 'react-toastify'
import ChallengeCard from '../components/ChallengeCard'
import { CardGroup, Container, Col,Row } from 'react-bootstrap'

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
      <button onClick={logoutUser}>aaa</button>

      <Container fluid >
        <Row>
        {challenges &&
          challenges.map((item, key) =><Col key={key} sm={4}> <ChallengeCard {...item} /></Col>)}
        </Row>
      </Container>
    </>
  )
}
export default UserChallenges
