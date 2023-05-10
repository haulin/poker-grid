import {
  ActiveDiscard,
  ActivePeek,
  ActiveUndo,
  Board,
  Deck,
  GameSummary,
  Instructions,
  NextCards,
} from '.';
import { useGameState } from '..';
import '../styles.css';

export function App() {
  const state = useGameState();

  return (
    <>
      <header>
        <button
          onClick={() => {
            state.update({ type: 'new-game' });
          }}
        >
          New Game
        </button>
        <button
          hidden={state.screen === 'instructions'}
          onClick={() =>
            state.update({
              type: 'screen',
              screen: 'instructions',
            })
          }
        >
          Instructions
        </button>
        <button
          hidden={state.screen === 'game'}
          onClick={() => {
            state.update({
              type: 'screen',
              screen: 'game',
            });
          }}
        >
          Back to game
        </button>
        <span style={{ position: 'absolute', right: 10, top: 5 }}>v0.4</span>
      </header>
      <div className="table" hidden={state.screen !== 'game' || state.isGameOver}>
        <div className="sidebar">
          <NextCards {...state} />
          <ActiveUndo {...state} />
          <ActiveDiscard {...state} />
          <ActivePeek {...state} />
        </div>
        <Board {...state} />
      </div>
      <div hidden={state.screen !== 'instructions'}>
        <Instructions />
      </div>
      <div hidden={state.screen !== 'deck'}>
        <Deck deck={state.deck} />
      </div>
      <div hidden={!state.isGameOver || state.screen !== 'game'}>
        <GameSummary key={state.seed} {...state} />
      </div>
    </>
  );
}
