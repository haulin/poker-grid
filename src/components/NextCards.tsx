import { Fragment } from 'react';
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
        {deck.slice(0, nextCardsVisible).map((card, index) => (
          <Fragment key={index}>
            {index === 0 && (
              <button
                className="action-button card no-shadow"
                onClick={() => update({ type: 'screen', screen: 'deck' })}
              >
                <Card card={card} className="card--no-border" />
              </button>
            )}
            {index !== 0 && (
              <div style={{ zIndex: -index }}>
                <Card
                  card={card}
                  className={`card--obstructed ${
                    index + 1 === nextCardsVisible ? 'card--deck' : ''
                  }`}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
