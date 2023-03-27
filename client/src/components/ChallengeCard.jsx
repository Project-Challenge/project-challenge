import { Card, Button } from 'react-bootstrap'
import { changeCardColor } from '../utils/changeCardColor'
import '../../public/styles/ChallengeCard.css'
function ChallengeCard({
  title,
  description,
  state,
  createdBy,
  creationDate,
  pendingDate,
  finishedBy,
  updatedAt,
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Text className='title' style={{ color: changeCardColor(state) }}>
          {title}
        </Card.Text>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Created By: {createdBy}</Card.Text>
        <Card.Text>
          Creation Date: {new Date(creationDate).toLocaleString()}
        </Card.Text>
        {state === 1 && (
          <>
            <Card.Text>
              Pending Date: {new Date(pendingDate).toLocaleString()}
            </Card.Text>
            <Button className='button'>Mark as Completed</Button>
          </>
        )}
        {state === 2 && (
          <>
            <Card.Text>Finished By: {finishedBy}</Card.Text>
            <Card.Text>
              Finished Date: {new Date(updatedAt).toLocaleString()}
            </Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
export default ChallengeCard
