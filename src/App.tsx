import {
  ActiveDiscard,
  ActiveUndo,
  Board,
  Card,
  Deck,
  GameSummary,
  Instructions,
  useGameState,
} from '.';

import './styles.css';

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
          View board
        </button>
        <span style={{ position: 'absolute', right: 10, top: 5 }}>v0.2</span>
      </header>
      <div
        className="table"
        hidden={state.screen !== 'game' || state.isGameOver}
      >
        <div className="sidebar">
          <div style={{ marginRight: 'auto' }}>
            Next card
            <button
              className="action-button card card--deck"
              onClick={() => state.update({ type: 'screen', screen: 'deck' })}
            >
              <Card card={state.deck[0]} transparent />
            </button>
          </div>
          <ActiveUndo {...state} />
          <ActiveDiscard {...state} />
        </div>
        <Board {...state} />
      </div>
      <div hidden={state.screen !== 'instructions'}>
        <Instructions />
      </div>
      <div hidden={state.screen !== 'deck'}>
        <Deck deck={state.deck} />
      </div>
      <div hidden={!state.isGameOver}>
        <GameSummary key={state.seed} {...state} />
      </div>
    </>
  );
}
