import { ReactComponent as Discard } from './assets/action-discard.svg';
import { GameState, StateProps, UpdateAction } from '.';
import { deepCopy } from './utils';

export type ActionActiveDiscard = {
  type: 'active-discard';
};

export function activeDiscardReducer(state: GameState, action: UpdateAction) {
  switch (action.type) {
    case 'active-discard': {
      const newState = deepCopy(state);
      newState.deck.shift();
      newState.actives = newState.actives.filter(
        (active) => active !== 'discard',
      );
      return newState;
    }
    default:
      return state;
  }
}

export function ActionDiscard({ actives, update }: StateProps) {
  const isEnabled = actives.includes('discard');

  return (
    <div
      className="action"
      title={isEnabled ? 'Discard next card' : 'Already used'}
    >
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
