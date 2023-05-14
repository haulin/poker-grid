import bombPath from './sounds/bomb.mp3';
import discardPath from './sounds/discard.mp3';
import gameOverPath from './sounds/game-over.mp3';
import gameStartPath from './sounds/game-start.mp3';
import keyPressPath from './sounds/key-press.mp3';
import paperSlidePath from './sounds/paper-slide.mp3';
import peekPath from './sounds/peek.mp3';
import shufflePath from './sounds/shuffle.mp3';
import undoPath from './sounds/undo.mp3';

const bomb = new Audio(bombPath);
bomb.volume = 1;
const discard = new Audio(discardPath);
discard.volume = 0.75;
const gameStart = new Audio(gameStartPath);
gameStart.volume = 0.5;
const gameOver = new Audio(gameOverPath);
gameOver.volume = 0.75;
const keyPress = new Audio(keyPressPath);
keyPress.volume = 0.5;
const paperSlide = new Audio(paperSlidePath);
paperSlide.volume = 0.5;
const peek = new Audio(peekPath);
peek.volume = 0.5;
const shuffle = new Audio(shufflePath);
shuffle.volume = 1;
const undo = new Audio(undoPath);
undo.volume = 1;

export const sounds = {
  bomb,
  discard,
  gameOver,
  gameStart,
  keyPress,
  paperSlide,
  peek,
  shuffle,
  undo,
};
