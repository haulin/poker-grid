import { ReactComponent as Peek } from '../assets/active-peek.svg';
import { deepCopy, GameState, StateProps, UpdateAction } from '..';

export type ActionActivePeek = {
  type: 'active-peek';
};

export type ActivePeek = {
  usesLeft: number;
};

export function activePeekReducer(state: GameState, action: UpdateAction) {
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
    <div className="action" title={isEnabled ? 'See next 5 cards' : 'Already used'}>
      <button
        className="action__button"
        disabled={!isEnabled}
        onClick={() => update({ type: 'active-peek' })}
      >
        <Peek />
      </button>
      <span className={isEnabled ? '' : 'action__name--strike'}>Peek</span>
    </div>
  );
}
