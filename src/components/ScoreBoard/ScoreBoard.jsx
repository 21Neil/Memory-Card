import './ScoreBoard.css'

const ScoreBoard = ({score, bestScore}) => {
  return (
    <div className='score-board'>
      <span>Best score: {bestScore}</span>
      <p>Score: {score}</p>
    </div>
  )
}

export default ScoreBoard