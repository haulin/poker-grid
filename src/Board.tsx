import { Card, StateProps } from '.';
import { getHandByIndex, getScore } from './utils';

export function Board({ board, update }: StateProps) {
  return (
    <div className="board-wrap">
      <div className="board__header"></div>
      {Array.from(Array(12)).map((_, index) => {
        const hand = getHandByIndex(board, index);
        const score = getScore(hand);
        return (
          <div className="board__score" key={index}>
            <span style={{ fontSize: '2em' }} title={hand}>
              {score || ''}
            </span>
          </div>
        );
      })}
      <ul className="board">
        {board.map((tile, index) => {
          return (
            <li
              className="board__tile"
              key={index}
              onClick={() => {
                update({ type: 'board-click', index });
              }}
            >
              {!!tile && <Card card={tile} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
