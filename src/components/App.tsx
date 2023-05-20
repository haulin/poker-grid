import {
  ActiveBomb,
  ActiveDiscard,
  ActivePeek,
  ActiveUndo,
  Board,
  Deck,
  GameSummary,
  Instructions,
  NextCards,
  Support,
} from '.';
import { getSummary, storageItem, useGameState } from '..';
import '../styles.css';
import { MenuScreen } from './MenuScreen';

export function App() {
  const state = useGameState();
  const highScore = storageItem('highScore');
  const { totalScore } = getSummary(state);

  return (
    <>
      <header hidden={state.screen === 'menu'}>
        <div className="button-row container">
          <button
            onClick={() =>
              state.update({
                type: 'screen',
                screen: 'menu',
              })
            }
          >
            Menu
          </button>
          <button
            hidden={state.screen === 'game' || state.screen === 'menu' || !state.isGameInProgress}
            onClick={() => {
              state.update({
                type: 'screen',
                screen: 'game',
              });
            }}
          >
            Back to game
          </button>
        </div>
      </header>
      <div hidden={state.screen !== 'menu'}>
        <MenuScreen {...state} />
      </div>
      <div className="table appear" hidden={state.screen !== 'game' || state.isGameOver}>
        <div className="status-bar">
          <NextCards {...state} />
          <div className="status-bar__scores">
            <b className="highlight">Score: {totalScore}</b>
            <small>High score: {highScore}</small>
          </div>
        </div>
        <Board {...state} />
        <div className="actives">
          <ActiveUndo {...state} />
          <ActiveDiscard {...state} />
          <ActivePeek {...state} />
          <ActiveBomb {...state} />
        </div>
      </div>
      <div hidden={state.screen !== 'instructions'}>
        <Instructions />
      </div>
      <div hidden={state.screen !== 'deck'}>
        <Deck deck={state.deck} />
      </div>
      <div hidden={state.screen !== 'game'}>
        <GameSummary key={state.seed} {...state} />
      </div>
      <div hidden={state.screen !== 'support'}>
        <Support />
      </div>
    </>
  );
}
