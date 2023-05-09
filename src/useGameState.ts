import { useReducer } from 'react';
import {
  ActionActiveDiscard,
  ActionActiveUndo,
  activeDiscardReducer,
  activeUndoReducer,
} from './components';
import { deepCopy, generateBoard, generateDeck, shuffleDeck } from '.';

interface InternalState {
  actives: string[];
  board: string[];
  deck: string[];
  isGameOver: boolean;
  seed: string;
  screen: 'deck' | 'game' | 'instructions';
}

export interface GameState extends InternalState {
  previousState?: InternalState;
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
  screen: InternalState['screen'];
};

export type StateProps = InternalState & {
  update: React.Dispatch<UpdateAction>;
};

export type UpdateAction =
  | ActionActiveDiscard
  | ActionActiveUndo
  | ActionBoardClick
  | ActionNewGame
  | ActionScreen;

function getInitialState(): InternalState {
  return {
    actives: ['discard', 'undo'],
    board: generateBoard(),
    deck: shuffleDeck(generateDeck()),
    isGameOver: false,
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
      return newState;
    },
    initialState,
  );
  return { ...state, update };
}
