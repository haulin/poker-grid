import { useReducer } from 'react';
import {
  ActionActiveBomb,
  ActionActiveDiscard,
  ActionActivePeek,
  ActionActiveUndo,
  ActiveBomb,
  activeBombReducer,
  ActiveDiscard,
  activeDiscardReducer,
  ActivePeek,
  activePeekReducer,
  ActiveUndo,
  activeUndoReducer,
} from './components';
import { deepCopy, generateBoard, generateDeck, shuffleDeck } from '.';

export interface GameState {
  actives: {
    bomb: ActiveBomb;
    discard: ActiveDiscard;
    peek: ActivePeek;
    undo: ActiveUndo;
  };
  board: string[];
  deck: string[];
  isGameOver: boolean;
  isGameInProgress: boolean;
  nextCardsVisible: number;
  seed: string;
  screen: 'deck' | 'game' | 'instructions' | 'menu';
  exclusiveReducer: '' | 'core' | keyof GameState['actives'];
}

type ActionBoardClick = {
  index: number;
  type: 'board-click';
};

type ActionFinishGame = {
  type: 'finish-game';
};

type ActionNewGame = {
  type: 'new-game';
};

type ActionScreen = {
  type: 'screen';
  screen: GameState['screen'];
};

export type StateProps = GameState & {
  update: React.Dispatch<UpdateAction>;
};

export type UpdateAction =
  | ActionActiveBomb
  | ActionActiveDiscard
  | ActionActivePeek
  | ActionActiveUndo
  | ActionBoardClick
  | ActionFinishGame
  | ActionNewGame
  | ActionScreen;

function getInitialState(): GameState {
  return {
    actives: {
      bomb: {
        isEngaged: false,
        usesLeft: 1,
      },
      discard: {
        usesLeft: 1,
      },
      peek: {
        usesLeft: 1,
      },
      undo: {
        usesLeft: 1,
        previousState: undefined,
      },
    },
    board: generateBoard(),
    deck: shuffleDeck(generateDeck()),
    isGameInProgress: false,
    isGameOver: false,
    nextCardsVisible: 1,
    seed: Math.random().toString(36).slice(2),
    screen: 'menu',
    exclusiveReducer: '',
  };
}

const initialState = getInitialState();

function coreReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'board-click': {
      if (state.board[action.index]) return state;
      const newState = deepCopy(state);
      newState.board[action.index] = newState.deck.shift() || '';
      newState.isGameOver = newState.board.every((tile) => tile !== '');
      newState.nextCardsVisible = Math.max(1, newState.nextCardsVisible - 1);
      return newState;
    }
    case 'finish-game': {
      state.isGameInProgress = false;
      state.screen = 'menu';
      return state;
    }
    case 'new-game': {
      const newState: GameState = getInitialState();
      newState.screen = 'game';
      newState.isGameInProgress = true;
      return newState;
    }
    case 'screen': {
      const newState = deepCopy(state);
      newState.screen = action.screen;
      return newState;
    }
    default:
      return state;
  }
}

export function useGameState() {
  const [state, update] = useReducer((state: GameState, action: UpdateAction) => {
    let newState = deepCopy(state);
    if (!state.exclusiveReducer || state.exclusiveReducer === 'undo') {
      newState = activeUndoReducer(state, action);
    }
    if (!state.exclusiveReducer || state.exclusiveReducer === 'core') {
      newState = coreReducer(newState, action);
    }
    if (!state.exclusiveReducer || state.exclusiveReducer === 'discard') {
      newState = activeDiscardReducer(newState, action);
    }
    if (!state.exclusiveReducer || state.exclusiveReducer === 'peek') {
      newState = activePeekReducer(newState, action);
    }
    if (!state.exclusiveReducer || state.exclusiveReducer === 'bomb') {
      newState = activeBombReducer(newState, action);
    }
    return newState;
  }, initialState);
  return { ...state, update };
}
