import { Card, Button } from 'react-bootstrap'
import { changeCardColor } from '../utils/changeCardColor'
import '../../public/styles/ChallengeCard.css'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'
import { useEffect,useState } from "react"

const ChallengeCard = ({
  _id,
  title,
  description,
  state,
  author,
  recipient,
  creationDate,
  pendingDate,
  finishedBy,
  updatedAt,
  markAsCompleted,
  markAsFinished
})=> {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('accessToken')||sessionStorage.getItem(accessToken)))
  useEffect(()=>{console.log(user.id),[user]})
  return (
    <Card className='challengeCard'>
      <Card.Body>
        
        <Card.Text className='title' style={{ color: changeCardColor(state) }}>
          {title}
        </Card.Text>
        
        <div className='usersInfo'>
          <Card.Text>{author && author.username}</Card.Text>
          <Card.Text className='description'>Verifier: {recipient && recipient.username}</Card.Text>
        </div>
        <Card.Text>
          Creation Date: {new Date(creationDate).toLocaleString()}
        </Card.Text>
        {pendingDate && (<Card.Text>
              Pending Date: {new Date(pendingDate).toLocaleString()}
            </Card.Text>)}
        <Card.Text className='description'>{description}</Card.Text>
        {state === 0 && (
          <>
            <Button className='button' onClick={()=>{markAsCompleted(_id)}}>Mark as Completed</Button>
          </>
        )}
        {state=== 1 && user.id === recipient._id &&(<Button className="button" onClick={()=>{markAsFinished(_id)}}>Confirm completion</Button>)}
        {state === 2 && (
          <>
            UKONCZON
          </>
        )}
      </Card.Body>
    </Card>
  )
}
export default ChallengeCard
