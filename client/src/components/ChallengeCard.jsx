import { Card, Button } from 'react-bootstrap'
import { changeCardColor } from '../utils/changeCardColor'
import '../../public/styles/ChallengeCard.css'
import useAxios from '../utils/useAxios'

// const markAsCompleted = (id) =>{
//   const api = useAxios()
// }
const ChallengeCard = ({
  _id,
  title,
  description,
  state,
  createdBy,
  creationDate,
  pendingDate,
  finishedBy,
  updatedAt,
})=> {
  return (
    <Card>
      <Card.Body>
        <Card.Text className='title' style={{ color: changeCardColor(state) }}>
          {title}
        </Card.Text>
        <Card.Text>{createdBy.username}</Card.Text>
        <Card.Text>
          Creation Date: {new Date(creationDate).toLocaleString()}
        </Card.Text>
        {pendingDate && (<Card.Text>
              Pending Date: {new Date(pendingDate).toLocaleString()}
            </Card.Text>)}
        <Card.Text style={{color: "gray"}}>{description}</Card.Text>
        {state === 0 && (
          <>
            
            <Button className='button' onClick={()=>{}}>Mark as Completed</Button>
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
