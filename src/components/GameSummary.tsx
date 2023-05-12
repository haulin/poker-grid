import { useEffect, useState } from 'react';
import { Board } from '.';
import { ReactComponent as HighScoreNew } from '../assets/high-score-new.svg';
import { ReactComponent as SummaryStars } from '../assets/summary-stars.svg';
import { getHandByIndex, getScore, highScoreGet, highScoreSet, StateProps } from '..';

function formatHand(
  hand: string,
  handCounts: {
    [key: string]: number;
  }
) {
  return `${handCounts[hand]}x ${hand.replace(/-/g, ' ').toUpperCase()}`;
}

function getHands(state: StateProps) {
  const hands = Array.from(Array(12)).map((_, index) => getHandByIndex(state.board, index));
  const actives = (Object.keys(state.actives) as (keyof StateProps['actives'])[])
    .map((active) => (state.actives[active].usesLeft > 0 ? 'unused-active' : ''))
    .filter(Boolean);
  const handsWithActives = [...hands, ...actives];
  return handsWithActives;
}

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
  const [highScore] = useState(highScoreGet());

  const hands = getHands(state);
  const handCounts = getOccurrences(hands);
  delete handCounts['high-card'];
  const scores = hands.map((hand) => getScore(hand));
  const totalScore = scores.reduce((sum, score) => score + sum, 0);

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
              <b>{getScore(hand) * handCounts[hand]}</b>
            </div>
          ))}
        </div>
        <h1>
          Total score: <b>{totalScore}</b>
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
      <div className="button-row">
        <button onClick={() => setGameOverView(!gameOverView)}>
          View {gameOverView ? 'board' : 'summary'}
        </button>
        <button onClick={() => state.update({ type: 'finish-game' })}>Finish</button>
      </div>
    </div>
  );
}
