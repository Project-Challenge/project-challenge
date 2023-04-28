import { Card, Button } from 'react-bootstrap'
import { changeCardColor } from '../utils/changeCardColor'
import '../../public/styles/ChallengeCard.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import moment from 'moment'

const ChallengeCard = ({
  _id,
  title,
  description,
  state,
  author,
  verifier,
  creationDate,
  pendingDate,
  finishedBy,
  updatedAt,
  markAsCompleted,
  markAsFinished,
  revertTask,
  points,
}) => {
  const { userId } = useContext(AuthContext)
  useEffect(() => console.log(userId), [])
  return (
    <Card className='challengeCard'>
      <Card.Body>
        <div className='title'>
          <div className='titleText' style={{ color: changeCardColor(state) }}>
            {title}
            <div>
              <span className='tooltiptext'>{title}</span>
            </div>
          </div>
          <Card.Text className='points'>{points}</Card.Text>
        </div>
        <Card.Text className='description'>{description}</Card.Text>
        <div className='contents'>
          <hr />
          <div className='usersInfo'>
            <Card.Text>{author && author.username}</Card.Text>
            <Card.Text className='verifier'>
              verifier: {verifier && verifier.username}
            </Card.Text>
          </div>
          <div className='dates'>
            <Card.Text>
              {moment(creationDate).format('MMM Do YYYY')} -{' '}
              {pendingDate ? moment(pendingDate).format('MMM Do YYYY') : '?'}
            </Card.Text>
          </div>
        </div>
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
        {state === 1 && userId === verifier._id && (
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
                revertTask(_id, state)
              }}>
              Revert
            </Button>
          </div>
        )}
        {state === 2 && (userId === author._id || userId === verifier._id) && (
          <>
            <div className='buttonBox'>
              <Button
                className='button'
                onClick={() => {
                  revertTask(_id, state)
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
