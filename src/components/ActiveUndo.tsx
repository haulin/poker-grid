import { ReactComponent as Undo } from '../assets/active-undo.svg';
import { deepCopy, GameState, StateProps, UpdateAction, sounds } from '..';

export type ActionActiveUndo = {
  type: 'active-undo';
};

export type ActiveUndo = {
  usesLeft: number;
  previousState?: GameState;
};

type GameStateSnapshot = Pick<GameState, 'board' | 'deck' | 'isGameOver' | 'nextCardsVisible'> & {
  actives: Record<string, number>;
};

function gameStateSnapshot(state: GameState): GameStateSnapshot {
  return {
    actives: Object.fromEntries(
      Object.entries(state.actives).map(([name, active]) => [name, active.usesLeft])
    ),
    board: state.board,
    deck: state.deck,
    isGameOver: state.isGameOver,
    nextCardsVisible: state.nextCardsVisible,
  };
}

function gameStateChanged(before: GameState, after: GameState) {
  return JSON.stringify(gameStateSnapshot(before)) !== JSON.stringify(gameStateSnapshot(after));
}

export function undoRestoreReducer(state: GameState, action: UpdateAction) {
  if (action.type !== 'active-undo' || !state.actives.undo.previousState) return state;

  const newState = state.actives.undo.previousState;
  newState.actives.undo.usesLeft -= 1;
  newState.screen = state.screen;
  sounds.undo.play();
  return newState;
}

export function undoRecordReducer(before: GameState, after: GameState, action: UpdateAction) {
  if (action.type !== 'new-game' && gameStateChanged(before, after)) {
    const snapshot = deepCopy(before);
    snapshot.interactionMode = '';
    after.actives.undo.previousState = snapshot;
  }
  return after;
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
