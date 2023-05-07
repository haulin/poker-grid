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
      </header>
      <div
        className="table"
        hidden={state.screen !== 'game' || state.isGameOver}
      >
        <div className="sidebar" hidden={state.isGameOver}>
          <div style={{ marginRight: 'auto' }}>
            Next card
            <button
              className="action-button card card--deck"
              onClick={() => state.update({ type: 'screen', screen: 'deck' })}
            >
              <Card card={state.deck[0]} transparent />
            </button>
          </div>
          <ActionUndo {...state} />
          <ActionDiscard {...state} />
        </div>
        <Board {...state} />
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
