import React from "react";
import "./Rules.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

export default function Rules() {
  return (
    <div className="the-container">
      <Navbar />
      <div className="rules-container">
        <header className="rules-header">
          <h1 className="rules-main-title">Rules of the Game</h1>
          <p className="rules-subtitle">
            Learn how setup works, how turns flow, what the Executioner does,
            and how to win.
          </p>
        </header>

        <section className="rules-section">
          <h2 className="rules-title">Start of the Game</h2>
          <p className="rules-text">
            Each player draws <strong>3 cards</strong> during setup, always
            following the order defined by the <strong>queue</strong>. The{" "}
            <strong>board</strong> is then filled according to the number of
            players. After dealing, the game begins normally from the{" "}
            <strong>Draw Phase</strong> (see Game Flow).
          </p>
        </section>

        <section className="rules-section">
          <h2 className="rules-title">Game Flow</h2>

          <p className="rules-text">Each round has three phases:</p>
          <ol className="rules-list">
            <li>
              <strong>Draw Phase</strong>
            </li>
            <li>
              <strong>Action Phase</strong>
            </li>
            <li>
              <strong>Executioner Phase</strong>
            </li>
          </ol>

          <h3 className="rules-subtitle2">1) Draw Phase</h3>
          <p className="rules-text">
            In queue order, each player draws <strong>one card</strong> from the
            board. If the board is empty for them, they draw from the{" "}
            <strong>main deck</strong> instead.
          </p>

          <h3 className="rules-subtitle2">2) Action Phase</h3>
          <p className="rules-text">
            In queue order, players may take actions. Some actions are{" "}
            <strong>Free Moves</strong> and do not end your turn (you may act
            again).
          </p>

          <ul className="rules-bullets">
            <li>
              Buy a <strong>Plot Armor</strong> card
            </li>
            <li>
              Buy a <strong>Black Market</strong> card{" "}
              <span className="tag">Free Move</span>
            </li>
            <li>
              Play an <strong>Action</strong> card or a{" "}
              <strong>Black Market</strong> card
            </li>
            <li>
              Use an attribute from a purchased <strong>Plot Armor</strong> card{" "}
              <span className="tag">Free Move</span> (see Plot Armor Cards
              Operation)
            </li>
          </ul>

          <div className="rules-callout">
            <h4 className="rules-callout-title">How to buy Plot Armor</h4>
            <p className="rules-text">
              On your turn in the Action Phase, discard{" "}
              <strong>3 identical Resource cards</strong> and{" "}
              <strong>1 Holy Duct Tape</strong> from your hand. Then take a Plot
              Armor card matching the resource color.
              <br />
              <em>Example:</em> 3 Strength (red) resources + 1 Holy Duct Tape →
              1 Strength (red) Plot Armor card.
            </p>
          </div>

          <div className="rules-callout">
            <h4 className="rules-callout-title">How to buy Black Market</h4>
            <p className="rules-text">
              On your turn in the Action Phase, discard{" "}
              <strong>any 3 cards</strong> from your hand and take the{" "}
              <strong>top card</strong> of the Black Market deck. This counts as
              a <strong>Free Move</strong>.
            </p>
          </div>

          <div className="rules-callout">
            <h4 className="rules-callout-title">Action Phase Flow</h4>
            <p className="rules-text">
              The Action Phase is a repeating priority sequence based on the
              queue: the first player acts, then the second, and so on. After
              the last player acts, priority returns to the first player.
            </p>
            <p className="rules-text">
              The Action Phase ends only when{" "}
              <strong>all players say “pass” consecutively</strong> and no one
              wants to take further actions.
            </p>
          </div>

          <h3 className="rules-subtitle2">3) Executioner Phase</h3>
          <p className="rules-text">
            Players do not make choices here. Reveal the{" "}
            <strong>top card</strong> of the Executioner’s deck and follow its
            instructions. These cards replenish the board and can cause
            characters to die (see The Executioner).
          </p>

          <p className="rules-text">
            After resolving an Executioner card, place it in a{" "}
            <strong>used stack</strong>. If the Executioner deck runs out,
            shuffle its used stack to form a new Executioner deck.
          </p>

          <p className="rules-text">
            Main deck and Black Market cards also go to their used stacks after
            being used. If the main deck runs out, shuffle its used stack to
            form a new main deck.
          </p>

          <div className="rules-example">
            <h4 className="rules-callout-title">Example (3 players)</h4>
            <ul className="rules-bullets">
              <li>
                <strong>Draw Phase:</strong> Players A, B, C each draw one card
                from the board.
              </li>
              <li>
                <strong>Action Phase:</strong> A plays an action card. B buys a
                Black Market card (doesn’t use it) and passes. C passes.
                Priority returns to A.
              </li>
              <li>
                A buys a Plot Armor card. B passes. C passes. Priority returns
                to A.
              </li>
              <li>
                A passes. B passes. C passes.{" "}
                <strong>All players passed consecutively</strong> → go to
                Executioner Phase.
              </li>
              <li>
                <strong>Executioner Phase:</strong> Reveal the top Executioner
                card. Example: “Refill the board.” Players add cards from the
                main deck until the board is back to 6 cards. Then a new round
                begins at Draw Phase.
              </li>
            </ul>
            <p className="rules-text subtle">
              Note: If any player takes an action before everyone has passed
              consecutively, the “pass” sequence resets.
            </p>
          </div>
        </section>

        <section className="rules-section">
          <h2 className="rules-title">The Executioner</h2>
          <p className="rules-text">
            The Executioner is the mascot and permanent antagonist of the game.
            Through the Executioner deck, the board is replenished, players may
            be forced to draw, and characters can die.
          </p>
          <p className="rules-text">
            When the <strong>“You are up next”</strong> card is revealed, the
            Executioner kills the first character in the queue. The first{" "}
            <strong>3 times</strong> this happens, a Peasant dies instead (there
            are 3 Peasant cards). After all Peasants are gone, each future “You
            are up next” kills the next player in the queue.
          </p>
          <p className="rules-text">
            If a player dies: they are eliminated, discard their hand into the
            used pile, and remove any acquired Plot Armor cards from the game.
          </p>
        </section>

        <section className="rules-section">
          <h2 className="rules-title">Purpose of the Game</h2>
          <p className="rules-text">
            Prove you are the protagonist. The first player to collect{" "}
            <strong>3 Plot Armor cards</strong> wins.
          </p>
          <p className="rules-text">
            Alternatively, if all other players die, the{" "}
            <strong>last player standing</strong> wins immediately.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
