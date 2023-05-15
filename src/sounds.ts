import { Howl } from 'howler';

import bombPath from './sounds/bomb.mp3';
import discardPath from './sounds/discard.mp3';
import gameOverPath from './sounds/game-over.mp3';
import gameStartPath from './sounds/game-start.mp3';
import gongPath from './sounds/gong.mp3';
import paperSlidePath from './sounds/paper-slide.mp3';
import shufflePath from './sounds/shuffle.mp3';
import tapPath from './sounds/tap.mp3';
import undoPath from './sounds/undo.mp3';

const bomb = new Howl({ src: bombPath, volume: 1 });
const discard = new Howl({ src: discardPath, volume: 0.75 });
const gameStart = new Howl({ src: gameStartPath, volume: 0.3 });
const gameOver = new Howl({ src: gameOverPath, volume: 0.6 });
const gong = new Howl({ src: gongPath, volume: 0.75 });
const tap = new Howl({ src: tapPath, volume: 0.25 });
const paperSlide = new Howl({ src: paperSlidePath, volume: 0.5 });
const shuffle = new Howl({ src: shufflePath, volume: 1 });
const undo = new Howl({ src: undoPath, volume: 1 });

export const sounds = {
  bomb,
  discard,
  gameOver,
  gameStart,
  gong,
  paperSlide,
  shuffle,
  tap,
  undo,
};
