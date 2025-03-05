import { useState } from 'react';
import './App.css';
import CardContainer from './components/CardContainer/CardContainer';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleAddScore = () => {
    setScore(score + 1)
  }

  const resetScore = () => {
    if(score > bestScore) setBestScore(score)
    setScore(0)
  }

  return (
    <>
      <div className="container">
        <ScoreBoard {...{score, bestScore}} />
        <CardContainer addScore={handleAddScore} resetScore={resetScore} />
      </div>
    </>
  );
}

export default App;
