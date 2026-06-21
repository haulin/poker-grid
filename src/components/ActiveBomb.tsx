import { ReactComponent as Bomb } from '../assets/active-bomb.svg';
import { deepCopy, GameState, StateProps, UpdateAction, sounds } from '..';

export type ActionActiveBomb = {
  type: 'active-bomb';
};

export type ActiveBomb = {
  usesLeft: number;
};

export function activeBombReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'active-bomb': {
      const newState = deepCopy(state);
      newState.interactionMode = state.interactionMode ? '' : 'bomb';
      return newState;
    }
    case 'board-click': {
      if (state.interactionMode !== 'bomb' || state.board[action.index] === '') return state;
      const newState = deepCopy(state);
      newState.board[action.index] = '';
      newState.actives.bomb.usesLeft -= 1;
      newState.interactionMode = '';
      sounds.bomb.play();
      return newState;
    }
    default:
      return state;
  }
}

export function ActiveBomb({ actives, interactionMode, update }: StateProps) {
  const isEnabled = actives.bomb.usesLeft > 0;
  const isEngaged = interactionMode === 'bomb';

  return (
    <button
      className={`active ${isEngaged ? 'active--engaged' : ''}`}
      disabled={!isEnabled}
      onClick={() => update({ type: 'active-bomb' })}
      title={isEnabled ? 'Remove a card from the board' : 'Already used'}
    >
      {isEngaged && 'Select a card'}
      {!isEngaged && (
        <>
          <Bomb />
          <span className={isEnabled ? '' : 'active__name--strike'}>Bomb</span>
        </>
      )}
    </button>
  );
}
