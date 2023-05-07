import { useState } from 'react';
import {
  ActionDiscard,
  ActionUndo,
  Board,
  Card,
  Deck,
  GameSummary,
  useGameState,
} from '.';

import './styles.css';

export function App() {
  const state = useGameState();
  const [mode, setMode] = useState('main');
  const isGameOver = state.board.every((tile) => tile !== '');
  const displayMode = isGameOver && mode !== 'table' ? 'game-over' : mode;

  return (
    <>
      <header>
        <button onClick={() => setMode('main')}>Home</button>
        <button onClick={() => state.update({ type: 'new-game' })}>
          New Game
        </button>
        <button
          hidden={['main', 'table'].includes(displayMode)}
          onClick={() => setMode('table')}
        >
          View board
        </button>
        <button
          hidden={!isGameOver || mode === 'main'}
          onClick={() => setMode('main')}
        >
          View summary
        </button>
      </header>
      <div className="table" hidden={!['main', 'table'].includes(displayMode)}>
        <div className="game-view">
          <div className="sidebar" hidden={isGameOver}>
            <div style={{ marginRight: 'auto' }}>
              Next card
              <Card card={state.deck[0]} />
            </div>
            <ActionUndo {...state} />
            <ActionDiscard {...state} />
            {/* <button className="card card--deck" onClick={() => setMode('deck')}>
              See deck
            </button> */}
          </div>
          <Board {...state} />
        </div>
        <div hidden={displayMode !== 'deck'}>
          <Deck deck={state.deck} />
        </div>
      </div>
      <div hidden={displayMode !== 'game-over'}>
        <GameSummary {...state} />
      </div>
    </>
  );
}
