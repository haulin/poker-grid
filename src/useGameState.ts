import { useReducer } from 'react';
import {
  ActionActiveDiscard,
  ActionActivePeek,
  ActionActiveUndo,
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
    discard: ActiveDiscard;
    peek: ActivePeek;
    undo: ActiveUndo;
  };
  board: string[];
  deck: string[];
  isGameOver: boolean;
  nextCardsVisible: number;
  seed: string;
  screen: 'deck' | 'game' | 'instructions';
}

type ActionBoardClick = {
  index: number;
  type: 'board-click';
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
  | ActionActiveDiscard
  | ActionActivePeek
  | ActionActiveUndo
  | ActionBoardClick
  | ActionNewGame
  | ActionScreen;

function getInitialState(): GameState {
  return {
    actives: {
      discard: {
        usesLeft: 1
      },
      peek: {
        usesLeft: 1,
      },
      undo: {
        usesLeft: 1,
        previousState: undefined
      }
    },
    board: generateBoard(),
    deck: shuffleDeck(generateDeck()),
    isGameOver: false,
    nextCardsVisible: 1,
    seed: Math.random().toString(36).slice(2),
    screen: 'game',
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
    case 'new-game': {
      const newState: GameState = getInitialState();
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
  const [state, update] = useReducer(
    (state: GameState, action: UpdateAction) => {
      let newState = activeUndoReducer(state, action);
      newState = coreReducer(newState, action);
      newState = activeDiscardReducer(newState, action);
      newState = activePeekReducer(newState, action);
      return newState;
    },
    initialState,
  );
  return { ...state, update };
}
