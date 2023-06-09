export function Instructions() {
  return (
    <div className="container instructions appear">
      <h1>How to play Poker Grid</h1>
      <p>
        Poker Grid is a solitaire poker game. Your goal is to place 25 cards, on a 5x5 grid, making
        the best poker hands you can horizontally, vertically, or diagonally. Click or tap an empty
        tile to place a card.
      </p>
      <p>
        The deck is shuffled at the beginning of the game and you are dealt one card at a time. When
        you have filled the grid with 25 cards, the game is over and you will see your total score.
      </p>
      <p>
        You have a few active abilities at your disposal to use once during the game. Unused actives
        will raise your total score slightly. Try to get the highest total score you can!
      </p>
      <h2 className="section-title">Scoring the hands</h2>
      <p>
        Scoring the game is a bit different than in regular poker as the probablities of the hands
        are different. For example a Flush is a lot easier to get in Poker Grid, so the scores have
        to be adjusted.
      </p>
      <ul>
        <li>Straight Flush - 30</li>
        <li>4 of a Kind - 16</li>
        <li>Straight - 12</li>
        <li>Full House - 10</li>
        <li>Three of a Kind - 6</li>
        <li>Flush - 5</li>
        <li>Two Pairs - 2</li>
        <li>One Pair - 1</li>
      </ul>
      <h2 className="section-title">Prior art</h2>
      <p>
        The basis of the game is known also as Poker Squares / Poker Solitaire / Poker Patience and
        many similar variants exist. The origins date to at least the autumn of 1908.
      </p>
    </div>
  );
}
