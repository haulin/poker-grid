import { getHandByIndex, getScore, StateProps } from '.';

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

export function GameSummary({ board }: StateProps) {
  const isGameOver = board.every((tile) => tile !== '');
  if (!isGameOver) return null;
  const hands = Array.from(Array(12)).map((_, index) =>
    getHandByIndex(board, index),
  );
  const handCounts = getOccurrences(hands);
  delete handCounts['high-card'];
  const scores = hands.map((hand) => getScore(hand));
  const totalScore = scores.reduce((sum, score) => score + sum, 0);

  return (
    <div className="summary">
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
  );
}
