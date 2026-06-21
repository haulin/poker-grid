import { StateProps } from '..';
import { Card } from './Card';

export function NextCards({ deck, nextCardsVisible, update }: StateProps) {
  if (nextCardsVisible === 1) {
    return (
      <div className="next-cards">
        Next card
        <button
          className="action-button card card--deck"
          onClick={() => update({ type: 'screen', screen: 'deck' })}
        >
          <Card card={deck[0]} className="card--no-border" key={deck[0]} />
        </button>
      </div>
    );
  }

  return (
    <div className="next-cards">
      Next {nextCardsVisible > 1 ? nextCardsVisible : ''} card{nextCardsVisible > 1 ? 's' : ''}
      <div className="next-cards__deck">
        <button
          className="action-button card no-shadow"
          onClick={() => update({ type: 'screen', screen: 'deck' })}
        >
          <Card card={deck[0]} className="card--no-border" key={deck[0]} />
        </button>
        {deck.slice(1, nextCardsVisible).map((card, index) => (
          <div key={card} style={{ zIndex: -(index + 1) }}>
            <Card
              card={card}
              className={`card--obstructed ${index === nextCardsVisible - 2 ? 'card--deck' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
