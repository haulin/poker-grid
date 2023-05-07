import { useReducer } from 'react';
import {
  ActionActiveDiscard,
  ActionActiveUndo,
  activeDiscardReducer,
  activeUndoReducer,
} from '.';
import { deepCopy, generateBoard, generateDeck, shuffleDeck } from './utils';

interface InternalState {
  actives: string[];
  board: string[];
  deck: string[];
  seed: string;
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

export type StateProps = InternalState & {
  update: React.Dispatch<UpdateAction>;
};

export type UpdateAction =
  | ActionBoardClick
  | ActionNewGame
  | ActionActiveDiscard
  | ActionActiveUndo;

function getInitialState() {
  return {
    actives: ['discard', 'undo'],
    board: generateBoard(),
    deck: shuffleDeck(generateDeck()),
    seed: Math.random().toString(36).slice(2),
  };
}

const initialState = getInitialState();

function coreReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'board-click': {
      if (state.board[action.index]) return state;
      const newState = deepCopy(state);
      newState.board[action.index] = newState.deck.shift() || '';
      return newState;
    }
    case 'new-game': {
      const newState: GameState = getInitialState();
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
