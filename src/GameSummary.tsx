import { useState } from 'react';
import { Board, getHandByIndex, getScore, StateProps } from '.';

function getOccurrences(array: string[]): { [key: string]: number } {
  const occurrences: { [key: string]: number } = {};
  for (const string of array) {
    if (occurrences[string] === undefined) {
      occurrences[string] = 1;
    } else {
      occurrences[string]++;
    }
  }
  return occurrences;
}

export function GameSummary(state: StateProps) {
  const [gameOverView, setGameOverView] = useState(true);
  if (!state.isGameOver) return null;
  const hands = Array.from(Array(12)).map((_, index) =>
    getHandByIndex(state.board, index),
  );
  const handCounts = getOccurrences(hands);
  delete handCounts['high-card'];
  const scores = hands.map((hand) => getScore(hand));
  const totalScore = scores.reduce((sum, score) => score + sum, 0);

  return (
    <div className="summary container">
      <button onClick={() => setGameOverView(!gameOverView)}>
        View {gameOverView ? 'board' : 'summary'}
      </button>

      <div hidden={!gameOverView}>
        <h1>Game Over</h1>
        <div className="summary__scores">
          {Object.keys(handCounts).map((hand) => (
            <div className="summary__score-row" key={hand}>
              {handCounts[hand]}x {hand.replace(/-/g, ' ').toUpperCase()}
              <b>{getScore(hand) * handCounts[hand]}</b>
            </div>
          ))}
        </div>
        <h1>
          Total score: <b>{totalScore}</b>
        </h1>
      </div>

      <div hidden={gameOverView} style={{ fontSize: '1rem' }}>
        <Board {...state} />
      </div>
    </div>
  );
}
