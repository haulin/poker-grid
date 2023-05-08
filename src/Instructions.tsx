export function Instructions() {
  return (
    <div className="container">
      <h1>How to play Poker Grid</h1>
      <p>
        Poker Grid is a solitaire poker game. Your goal is to place 25 cards, on
        a 5x5 grid, making the best poker hands you can horizontally,
        vertically, or diagonally.
      </p>
      <p>
        The deck is shuffled at the beginning of the game. You are dealt one
        card at a time, and you must place it in an empty space. When you've
        filled the grid with 25 cards, the game is over and you'll see your
        total score.
      </p>
      <p>
        You have a few active abilities at your disposal to use once during the
        game. Unused actives will raise your total score slightly. Try to get
        the highest total score you can!
      </p>
      <h2>Scoring the hands</h2>
      <p>
        Scoring the game is a bit different than in regular poker as the
        probablities of the hands are different. For example a Flush is a lot
        easier to get in Poker Grid, so the scores had to be adjusted.
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
      <h2>Prior art</h2>
      <p>
        The basis of the game is known also as Poker Squares or Poker Solitaire
        and many similar variants exist.
      </p>
      <h2>Attribution</h2>
      <p>
        Some icons were used from https://game-icons.net/ and
        https://www.svgrepo.com.
      </p>
    </div>
  );
}
