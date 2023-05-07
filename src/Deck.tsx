import { Card, FACES, SUITS } from '.';

export function Deck({ deck }: { deck: string[] }): JSX.Element {
  const sortedDeck = [...deck].sort((a, b) => {
    const aOrder =
      FACES.indexOf(a.charAt(0)) + 100 * SUITS.indexOf(a.charAt(1));
    const bOrder =
      FACES.indexOf(b.charAt(0)) + 100 * SUITS.indexOf(b.charAt(1));
    return aOrder < bOrder ? -1 : 1;
  });
  return (
    <div className="deck">
      <h2>Cards left in deck (not in order):</h2>
      <ul className="deck">
        {sortedDeck.map((card, index) => (
          <li key={index}>
            <Card card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
