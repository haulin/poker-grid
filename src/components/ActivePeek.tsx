import { ReactComponent as Peek } from '../assets/active-peek.svg';
import { deepCopy, GameState, StateProps, UpdateAction } from '..';

export type ActionActivePeek = {
  type: 'active-peek';
};

export type ActivePeek = {
  usesLeft: number;
};

export function activePeekReducer(state: GameState, action: UpdateAction) {
  if (state.skipCoreReducer) return state;
  switch (action.type) {
    case 'active-peek': {
      const newState = deepCopy(state);
      newState.actives.peek.usesLeft -= 1;
      newState.nextCardsVisible = 5;
      return newState;
    }
    default:
      return state;
  }
}

export function ActivePeek({ actives, update }: StateProps) {
  const isEnabled = actives.peek.usesLeft > 0;

  return (
    <button
      className="active"
      disabled={!isEnabled}
      onClick={() => update({ type: 'active-peek' })}
      title={isEnabled ? 'See next 5 cards' : 'Already used'}
    >
      <Peek />
      <span className={isEnabled ? '' : 'active__name--strike'}>Peek</span>
    </button>
  );
}
