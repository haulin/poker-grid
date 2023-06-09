import { ReactComponent as Undo } from '../assets/active-undo.svg';
import { deepCopy, GameState, StateProps, UpdateAction, sounds } from '..';

export type ActionActiveUndo = {
  type: 'active-undo';
};

export type ActiveUndo = {
  usesLeft: number;
  previousState?: GameState;
};

export function activeUndoReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'active-undo': {
      if (!state.actives.undo.previousState) return state;
      const newState = state.actives.undo.previousState;
      newState.actives.undo.usesLeft -= 1;
      newState.screen = state.screen;
      sounds.undo.play();
      return newState;
    }
    case 'new-game':
      return state;
    case 'screen':
      return state;
    case 'board-click': {
      if (state.board[action.index]) return state;
      const newState = deepCopy(state);
      newState.actives.undo.previousState = state;
      return newState;
    }
    default: {
      const newState = deepCopy(state);
      newState.actives.undo.previousState = state;
      return newState;
    }
  }
}

export function ActiveUndo({ actives, update }: StateProps) {
  const isEnabled = actives.undo.usesLeft > 0;

  return (
    <button
      className="active"
      disabled={!isEnabled}
      onClick={() => update({ type: 'active-undo' })}
      title={isEnabled ? 'Undo move' : 'Already used'}
    >
      <Undo />
      <span className={isEnabled ? '' : 'active__name--strike'}>Undo</span>
    </button>
  );
}
