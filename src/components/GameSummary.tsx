import { useEffect, useState } from 'react';
import { Board } from '.';
import { ReactComponent as HighScoreNew } from '../assets/high-score-new.svg';
import { ReactComponent as SummaryStars } from '../assets/summary-stars.svg';
import { getScore, getSummary, StateProps, storageItem } from '..';

function formatHand(
  hand: string,
  handCounts: {
    [key: string]: number;
  }
) {
  return `${handCounts[hand]}x ${hand.replace(/-/g, ' ').toUpperCase()}`;
}

export function GameSummary(state: StateProps) {
  const [gamesPlayed] = useState(storageItem('gamesPlayed'));
  const [gameOverView, setGameOverView] = useState(true);
  const [highScore] = useState(storageItem('highScore'));
  const { handCounts, totalScore } = getSummary(state);

  useEffect(() => {
    if (!state.isGameOver) return;
    if (totalScore > highScore) {
      storageItem('highScore', totalScore);
    }
  }, [highScore, state.isGameOver, totalScore]);

  useEffect(() => {
    if (!state.isGameOver) return;
    storageItem('gamesPlayed', gamesPlayed + 1);
  }, [gamesPlayed, state.isGameOver]);

  if (!state.isGameOver) return null;

  return (
    <div className="summary container">
      <div className="appear" hidden={!gameOverView}>
        <div className="summary__header">
          <h1>Game Over</h1>
          <SummaryStars />
        </div>
        <div className="summary__scores">
          {Object.keys(handCounts).map((hand) => (
            <div className="summary__score-row" key={hand}>
              {formatHand(hand, handCounts)}
              <b>{getScore(hand) * handCounts[hand]}</b>
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
              <h2>NEW HIGH SCORE</h2>
            </>
          )}
        </div>
        <div style={{ marginBottom: '1em' }}>Games played: {gamesPlayed + 1}</div>
      </div>
      <div className="appear" hidden={gameOverView} style={{ fontSize: '1rem' }}>
        <Board {...state} />
      </div>
      <div className="button-row appear" style={{ '--delay': '0.2s' } as React.CSSProperties}>
        <button onClick={() => setGameOverView(!gameOverView)}>
          View {gameOverView ? 'board' : 'summary'}
        </button>
        <button className="primary" onClick={() => state.update({ type: 'finish-game' })}>
          Finish
        </button>
      </div>
    </div>
  );
}
