import { Card } from 'react-bootstrap'

function ChallengeCard({ title, description }) {
  return (
    <Card
      style={{
        margin: '5px',
        width: '25rem',
      }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default ChallengeCard
