import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export * from './sounds';
export * from './utils';
export * from './useGameState';
