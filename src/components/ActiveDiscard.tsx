import { ReactComponent as Discard } from '../assets/active-discard.svg';
import { deepCopy, GameState, StateProps, UpdateAction, sounds } from '..';

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
      newState.nextCardsVisible = Math.max(1, newState.nextCardsVisible - 1);
      newState.actives.discard.usesLeft -= 1;
      sounds.discard.play();
      return newState;
    }
    default:
      return state;
  }
}

export function ActiveDiscard({ actives, update }: StateProps) {
  const isEnabled = actives.discard.usesLeft > 0;

  return (
    <button
      className="active"
      disabled={!isEnabled}
      onClick={() => update({ type: 'active-discard' })}
      title={isEnabled ? 'Discard next card' : 'Already used'}
    >
      <Discard />
      <span className={isEnabled ? '' : 'active__name--strike'}>Discard</span>
    </button>
  );
}
