import { ReactComponent as Undo } from './assets/action-undo.svg';
import { GameState, StateProps, UpdateAction } from '.';
import { deepCopy } from './utils';

export type ActionActiveUndo = {
  type: 'active-undo';
};

export function activeUndoReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'active-undo': {
      if (!state.previousState) return state;
      const newState = state.previousState;
      newState.actives = newState.actives.filter((active) => active !== 'undo');
      return newState;
    }
    case 'new-game':
      return state;
    default: {
      const newState = deepCopy(state);
      newState.previousState = {
        actives: state.actives,
        board: state.board,
        deck: state.deck,
        seed: state.seed,
      };
      return newState;
    }
  }
}

export function ActionUndo({ actives, update }: StateProps) {
  const isEnabled = actives.includes('undo');

  return (
    <div className="action" title={isEnabled ? 'Undo move' : 'Already used'}>
      <button
        className="action__button"
        disabled={!isEnabled}
        onClick={() => update({ type: 'active-undo' })}
      >
        <Undo />
      </button>
      <span className={isEnabled ? '' : 'action__name--strike'}>Undo</span>
    </div>
  );
}
