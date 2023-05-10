import { ReactComponent as Discard } from '../assets/active-discard.svg';
import { deepCopy, GameState, StateProps, UpdateAction } from '..';

export type ActionActiveDiscard = {
  type: 'active-discard';
};

export type ActiveDiscard = {
  usesLeft: number;
};

export function activeDiscardReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'active-discard': {
      const newState = deepCopy(state);
      newState.deck.shift();
      newState.actives.discard.usesLeft -= 1;
      return newState;
    }
    default:
      return state;
  }
}

export function ActiveDiscard({ actives, update }: StateProps) {
  const isEnabled = actives.discard.usesLeft > 0;

  return (
    <div className="action" title={isEnabled ? 'Discard next card' : 'Already used'}>
      <button
        className="action__button"
        disabled={!isEnabled}
        onClick={() => update({ type: 'active-discard' })}
      >
        <Discard />
      </button>
      <span className={isEnabled ? '' : 'action__name--strike'}>Discard</span>
    </div>
  );
}
