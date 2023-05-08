import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

export * from './ActiveDiscard';
export * from './ActiveUndo';
export * from './Board';
export * from './Card';
export * from './Deck';
export * from './GameSummary';
export * from './Instructions';
export * from './useGameState';
export * from './utils';
