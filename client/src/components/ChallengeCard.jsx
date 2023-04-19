import { Card, Button } from 'react-bootstrap'
import { changeCardColor } from '../utils/changeCardColor'
import '../../public/styles/ChallengeCard.css'
import useAxios from '../utils/useAxios'
import { ENDPOINTS } from '../const/endpoints'

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
  markAsCompleted
})=> {
  return (
    <Card className='challengeCard'>
      <Card.Body>
        <Card.Text className='title' style={{ color: changeCardColor(state) }}>
          {title}
        </Card.Text>
        <Card.Text>{author && author} {recipient && recipient.username}</Card.Text>
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
