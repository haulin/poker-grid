import { useState } from 'react';
import { Howler } from 'howler';

import { ReactComponent as Club } from '../assets/suit-club.svg';
import { ReactComponent as Diamond } from '../assets/suit-diamond.svg';
import { ReactComponent as Heart } from '../assets/suit-heart.svg';
import { ReactComponent as Spade } from '../assets/suit-spade.svg';
import { ReactComponent as SummaryStars } from '../assets/summary-stars.svg';
import { StateProps, storageHighScore, storageSound } from '..';

export function MenuScreen(state: StateProps) {
  const [isSoundOn, setIsSoundOn] = useState(storageSound());
  const highScore = storageHighScore();
  Howler.volume(isSoundOn ? 1 : 0);

  function toggleSound() {
    setIsSoundOn(!isSoundOn);
    storageSound(!isSoundOn);
  }

  return (
    <div className="menu-screen container">
      <SummaryStars style={{ height: '6em', marginTop: '2em', width: 'auto' }} />
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
      <div className="menu-screen__buttons">
        <button
          hidden={!state.isGameInProgress}
          onClick={() => {
            state.update({
              type: 'screen',
              screen: 'game',
            });
          }}
        >
          Back to game
        </button>
        <button
          onClick={() => {
            state.update({ type: 'new-game' });
          }}
        >
          New game
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
        <button hidden={state.screen === 'instructions'} onClick={toggleSound}>
          Sound: {isSoundOn ? 'on' : 'off'}
        </button>
        <h3>High score: {highScore}</h3>
      </div>
    </div>
  );
}
