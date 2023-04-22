import { Card, Button } from 'react-bootstrap'
import { changeCardColor } from '../utils/changeCardColor'
import '../../public/styles/ChallengeCard.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

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
  markAsFinished,
  revertTask,
}) => {
  const { userId } = useContext(AuthContext)
  return (
    <Card className='challengeCard'>
      <Card.Body>
        <Card.Text className='title' style={{ color: changeCardColor(state) }}>
          {title}
        </Card.Text>

        <div className='usersInfo'>
          <Card.Text>{author && author.username}</Card.Text>
          <Card.Text className='verifier'>
            Verifier: {recipient && recipient.username}
          </Card.Text>
        </div>
        <Card.Text>
          Creation Date: {new Date(creationDate).toLocaleString()}
        </Card.Text>
        {pendingDate && (
          <Card.Text>
            Pending Date: {new Date(pendingDate).toLocaleString()}
          </Card.Text>
        )}
        <Card.Text className='description'>{description}</Card.Text>
        {state === 0 && userId === author._id && (
          <div className='buttonBox'>
            <Button
              className='button'
              onClick={() => {
                markAsCompleted(_id)
              }}>
              Mark as Completed
            </Button>
          </div>
        )}
        {state === 1 && userId === recipient._id && (
          <div className='buttonBox'>
            <Button
              className='button'
              onClick={() => {
                markAsFinished(_id)
              }}>
              Confirm completion
            </Button>
            <Button
              className='button'
              onClick={() => {
                revertTask(_id)
              }}>
              Revert
            </Button>
          </div>
        )}
        {state === 2 && (
          <>
            <div className='buttonBox'>
              <Button
                className='button'
                onClick={() => {
                  revertTask(_id)
                }}>
                Revert
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
export default ChallengeCard
