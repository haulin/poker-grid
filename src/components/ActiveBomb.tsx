import { ReactComponent as Bomb } from '../assets/active-bomb.svg';
import { deepCopy, GameState, StateProps, UpdateAction, sounds } from '..';

export type ActionActiveBomb = {
  type: 'active-bomb';
};

export type ActiveBomb = {
  isEngaged: boolean;
  usesLeft: number;
};

export function activeBombReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'active-bomb': {
      const newState = deepCopy(state);
      newState.actives.bomb.isEngaged = !state.actives.bomb.isEngaged;
      newState.exclusiveReducer = state.exclusiveReducer ? '' : 'bomb';
      return newState;
    }
    case 'board-click': {
      if (!state.actives.bomb.isEngaged || state.board[action.index] === '') return state;
      const newState = deepCopy(state);
      newState.board[action.index] = '';
      newState.actives.bomb.isEngaged = false;
      newState.actives.bomb.usesLeft -= 1;
      newState.exclusiveReducer = '';
      sounds.bomb.play();
      return newState;
    }
    default:
      return state;
  }
}

export function ActiveBomb({ actives, update }: StateProps) {
  const isEnabled = actives.bomb.usesLeft > 0;

  return (
    <button
      className={`active ${actives.bomb.isEngaged ? 'active--engaged' : ''}`}
      disabled={!isEnabled}
      onClick={() => update({ type: 'active-bomb' })}
      title={isEnabled ? 'Remove a card from the board' : 'Already used'}
    >
      {actives.bomb.isEngaged && 'Select a card'}
      {!actives.bomb.isEngaged && (
        <>
          <Bomb />
          <span className={isEnabled ? '' : 'active__name--strike'}>Bomb</span>
        </>
      )}
    </button>
  );
}
