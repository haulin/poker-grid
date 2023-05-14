import { useEffect, useState } from 'react';
import { Board } from '.';
import { ReactComponent as HighScoreNew } from '../assets/high-score-new.svg';
import { ReactComponent as SummaryStars } from '../assets/summary-stars.svg';
import { getScore, getSummary, highScoreGet, highScoreSet, StateProps } from '..';

function formatHand(
  hand: string,
  handCounts: {
    [key: string]: number;
  }
) {
  return `${handCounts[hand]}x ${hand.replace(/-/g, ' ').toUpperCase()}`;
}

export function GameSummary(state: StateProps) {
  const [gameOverView, setGameOverView] = useState(true);
  const [highScore] = useState(highScoreGet());
  const { handCounts, totalScore } = getSummary(state);

  useEffect(() => {
    if (totalScore > highScore) {
      highScoreSet(totalScore);
    }
  }, [highScore, totalScore]);

  if (!state.isGameOver) return null;

  return (
    <div className="summary container">
      <div hidden={!gameOverView}>
        <div className="summary__header">
          <h1>Game Over</h1>
          <SummaryStars />
        </div>
        <div className="summary__scores">
          {Object.keys(handCounts).map((hand) => (
            <div className="summary__score-row" key={hand}>
              {formatHand(hand, handCounts)}
              <b className="highlight">{getScore(hand) * handCounts[hand]}</b>
            </div>
          ))}
        </div>
        <h1>
          Total score: <b className="highlight">{totalScore}</b>
        </h1>
        <div className="high-score">
          {totalScore <= highScore && <h3>High score: {highScore}</h3>}
          {totalScore > highScore && (
            <>
              <HighScoreNew />
              <h1>NEW HIGH SCORE</h1>
            </>
          )}
        </div>
      </div>
      <div hidden={gameOverView} style={{ fontSize: '1rem' }}>
        <Board {...state} />
      </div>
      <div className="button-row" style={{ marginTop: '1em' }}>
        <button onClick={() => setGameOverView(!gameOverView)}>
          View {gameOverView ? 'board' : 'summary'}
        </button>
        <button onClick={() => state.update({ type: 'finish-game' })}>Finish</button>
      </div>
    </div>
  );
}
