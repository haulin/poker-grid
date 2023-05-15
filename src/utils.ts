import { StateProps } from './useGameState';

export const SUITS = ['C', 'D', 'H', 'S'];
export const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

// TODO: not very efficient, maybe use lodash
export const deepCopy = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export function generateBoard() {
  const board: string[] = [];
  for (let i = 0; i < 25; i++) {
    board.push('');
  }
  return board;
}

export function generateDeck(): string[] {
  const deck = [];
  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < FACES.length; j++) {
      deck.push(FACES[j] + SUITS[i]);
    }
  }
  return deck;
}

export function getHand(hand: string): string {
  const cards = hand.split(' ').filter((x) => x !== 'joker');
  const jokers = hand.split(' ').length - cards.length;

  const faces = cards.map((card) => FACES.indexOf(card.slice(0, -1)));
  const suits = cards.map((card) => SUITS.indexOf(card.slice(-1)));

  if (
    cards.some((card, i, self) => i !== self.indexOf(card)) ||
    faces.some((face) => face === -1) ||
    suits.some((suit) => suit === -1)
  )
    return 'invalid';

  const flush = suits.every((suit) => suit === suits[0]);
  const groups = FACES.map((face, i) => faces.filter((j) => i === j).length).sort((x, y) => y - x);
  const shifted = faces.map((x) => (x + 1) % 13);
  const distance = Math.min(
    Math.max(...faces) - Math.min(...faces),
    Math.max(...shifted) - Math.min(...shifted)
  );
  const straight = groups[0] === 1 && distance < 5;
  groups[0] += jokers;

  if (groups[0] === 5) return 'five-of-a-kind';
  else if (straight && flush) return 'straight-flush';
  else if (groups[0] === 4) return 'four-of-a-kind';
  else if (groups[0] === 3 && groups[1] === 2) return 'full-house';
  else if (flush) return 'flush';
  else if (straight) return 'straight';
  else if (groups[0] === 3) return 'three-of-a-kind';
  else if (groups[0] === 2 && groups[1] === 2) return 'two-pair';
  else if (groups[0] === 2) return 'one-pair';
  else return 'high-card';
}

export function getHandByIndex(board: string[], index: number): string {
  const indexes = [
    [4, 8, 12, 16, 20], // diagonal right
    [0, 1, 2, 3, 4], // row 1
    [5, 6, 7, 8, 9], // row 2
    [10, 11, 12, 13, 14], // row 3
    [15, 16, 17, 18, 19], // row 4
    [20, 21, 22, 23, 24], // row 5
    [0, 5, 10, 15, 20], // column 1
    [1, 6, 11, 16, 21], // column 2
    [2, 7, 12, 17, 22], // column 3
    [3, 8, 13, 18, 23], // column 4
    [4, 9, 14, 19, 24], // column 5
    [0, 6, 12, 18, 24], // diagonal left
  ];
  if (indexes[index]) {
    const hand = getHand(indexes[index].map((i) => board[i]).join(' '));
    return hand === 'invalid' ? '' : hand;
  }
  return '';
}

function getHands(state: StateProps) {
  const hands = Array.from(Array(12)).map((_, index) => getHandByIndex(state.board, index));
  const actives = (Object.keys(state.actives) as (keyof StateProps['actives'])[])
    .map((active) => (state.actives[active].usesLeft > 0 ? 'unused-active' : ''))
    .filter(Boolean);
  const handsWithActives = [...hands, ...actives];
  return handsWithActives;
}

function getInitialPokerGridData(): PokerGridData {
  return {
    highScore: 0,
    isSoundOn: true,
  };
}

function getOccurrences(array: string[]): { [key: string]: number } {
  const occurrences: { [key: string]: number } = {};
  for (const string of array) {
    if (occurrences[string] === undefined) {
      occurrences[string] = 1;
    } else {
      occurrences[string]++;
    }
  }
  return occurrences;
}

export function getScore(hand: string): number {
  return (
    {
      'straight-flush': 30,
      'five-of-a-kind': 20,
      'four-of-a-kind': 16,
      straight: 12,
      'full-house': 10,
      'three-of-a-kind': 6,
      flush: 5,
      'two-pair': 2,
      'unused-active': 2,
      'one-pair': 1,
    }[hand] || 0
  );
}

export function getSummary(state: StateProps) {
  const hands = getHands(state);
  const handCounts = getOccurrences(hands);
  delete handCounts['high-card'];
  const scores = hands.map((hand) => getScore(hand));
  const totalScore = scores.reduce((sum, score) => score + sum, 0);
  return { handCounts, totalScore };
}

type PokerGridData = {
  highScore: number;
  isSoundOn: boolean;
};

export function storageHighScore(): number;
export function storageHighScore(score: number): void;
export function storageHighScore(score?: number) {
  const maybeData = window.localStorage.getItem('pokerGridJson');
  const data: PokerGridData = maybeData ? JSON.parse(maybeData) : getInitialPokerGridData();
  if (score === undefined) {
    return data.highScore;
  } else {
    data.highScore = score;
    window.localStorage.setItem('pokerGridJson', JSON.stringify(data));
  }
}

export function storageSound(): boolean;
export function storageSound(isSoundOn: boolean): void;
export function storageSound(isSoundOn?: boolean) {
  const maybeData = window.localStorage.getItem('pokerGridJson');
  const data: PokerGridData = maybeData ? JSON.parse(maybeData) : getInitialPokerGridData();
  if (isSoundOn === undefined) {
    return data.isSoundOn;
  } else {
    data.isSoundOn = isSoundOn;
    window.localStorage.setItem('pokerGridJson', JSON.stringify(data));
  }
}

export function shuffleDeck(deck: string[]): string[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
