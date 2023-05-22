import { useState } from 'react';
import { Howler } from 'howler';

import { ReactComponent as Club } from '../assets/suit-club.svg';
import { ReactComponent as Diamond } from '../assets/suit-diamond.svg';
import { ReactComponent as Heart } from '../assets/suit-heart.svg';
import { ReactComponent as Spade } from '../assets/suit-spade.svg';
import { ReactComponent as SummaryStars } from '../assets/summary-stars.svg';
import { StateProps, storageItem } from '..';
import packageJson from '../../package.json';

export function MenuScreen(state: StateProps) {
  const [isSoundOn, setIsSoundOn] = useState(storageItem('isSoundOn'));
  const highScore = storageItem('highScore');
  Howler.volume(isSoundOn ? 1 : 0);

  function toggleSound() {
    setIsSoundOn(!isSoundOn);
    storageItem('isSoundOn', !isSoundOn);
  }

  return (
    <div className="menu-screen container appear">
      <SummaryStars className="menu-screen__stars" />
      <div className="menu-screen__title">
        <div className="card">
          <span>P</span>
        </div>
        <div className="card">
          <span>O</span>
        </div>
        <div className="card">
          <span>K</span>
        </div>
        <div className="card">
          <span>E</span>
        </div>
        <div className="card">
          <span>R</span>
        </div>
        <div className="card menu-screen__suits">
          <Club />
          <Diamond />
          <Heart />
          <Spade />
        </div>
        <div className="card">
          <span>G</span>
        </div>
        <div className="card">
          <span>R</span>
        </div>
        <div className="card">
          <span>I</span>
        </div>
        <div className="card">
          <span>D</span>
        </div>
      </div>
      <div className="menu-screen__version">v{packageJson.version}</div>
      <div
        className="menu-screen__buttons appear"
        style={{ '--delay': '0.1s' } as React.CSSProperties}
      >
        <button
          hidden={!state.isGameInProgress}
          onClick={() => {
            state.update({
              type: 'screen',
              screen: 'game',
            });
          }}
          style={{ transform: 'scale(1.2)' }}
        >
          Back to game
        </button>
        <button
          className="primary"
          onClick={() => {
            state.update({ type: 'new-game' });
          }}
          style={{ transform: 'scale(1.2)' }}
        >
          New game
        </button>
        <button
          onClick={() =>
            state.update({
              type: 'screen',
              screen: 'instructions',
            })
          }
        >
          How to play
        </button>
        <button hidden={state.screen === 'instructions'} onClick={toggleSound}>
          Sound: {isSoundOn ? 'on' : 'off'}
        </button>
        <button
          onClick={() =>
            state.update({
              type: 'screen',
              screen: 'support',
            })
          }
        >
          Support
        </button>
        <h3 className="section-title">High score: {highScore}</h3>
      </div>
    </div>
  );
}
