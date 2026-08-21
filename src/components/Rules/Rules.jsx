import React from "react";
import "./Rules.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

// Asset Imports with exact folder name and file extensions
import step0Image from "../../assets/rules-photos/0 step.png";
import step1Image from "../../assets/rules-photos/1 step.png";
import step2Image from "../../assets/rules-photos/2 step.png";
import step3Image from "../../assets/rules-photos/3 step.JPG";
import step4Image from "../../assets/rules-photos/4 step.JPG";
import step5Image from "../../assets/rules-photos/5 step.JPG";
import step6Image from "../../assets/rules-photos/6 step.JPG";
import step45Image from "../../assets/rules-photos/4.5 step.png";
import img1132Image from "../../assets/rules-photos/IMG_1132.JPG";

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

        {/* Initial Layout & Setup */}
        <section className="rules-section">
          <h2 className="rules-title">Initial Game Layout & Setup</h2>

          <div className="setup-step">
            <h3 className="rules-subtitle2">Step 1: Set Up the Card Decks</h3>
            <p className="rules-text">
              Arrange your play area by placing the{" "}
              <strong>Black Market (BM)</strong> deck on the left, line up the
              four
              <strong> Plot Armor Cards (PA)</strong> face-up across the center
              by attribute color (<strong>Strength</strong>,{" "}
              <strong>Dexterity</strong>, <strong>Intelligence</strong>, and{" "}
              <strong>Wisdom</strong>), and place the
              <strong> Executioner's Deck</strong> on the far right.
            </p>
            <img
              src={step0Image}
              alt="Setup layout showing Black Market, Plot Armor, and Executioner deck"
            />
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">Step 2: Build the Death Line</h3>
            <p className="rules-text">
              Directly below the top row, set up the <strong>Death Line</strong>{" "}
              with the <strong>Main Deck (MD)</strong> sitting at the far right
              end:
            </p>
            <ul className="rules-bullets">
              <li>
                <strong>The Executioner:</strong> Always takes the very first
                spot on the far left.
              </li>
              <li>
                <strong>The 3 Peasants:</strong> Place all 3 Peasant cards
                immediately after the Executioner. They serve as a buffer before
                any real player is in danger.
              </li>
              <li>
                <strong>Player Turn Order (The Death Line):</strong> Shuffle all
                chosen Character cards. Pick one randomly to decide who starts
                first in line behind the Peasants (for example, <em>Misero</em>
                ).
              </li>
              <li>
                <strong>Seating Alignment:</strong> Place the remaining player
                characters in line following the physical seating order around
                the table, moving clockwise (e.g., the player sitting to the
                right of Misero places their character next, followed by the
                next player, and so on).
              </li>
            </ul>
            <img
              src={step1Image}
              alt="Death Line layout showing Executioner, 3 Peasants, player queue, and Main Deck"
            />
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">Step 3: Lay Out the Board</h3>
            <p className="rules-text">
              Directly below the Death Line, create <strong>The Board</strong>{" "}
              by drawing cards from the Main Deck.
            </p>
            <ul className="rules-bullets">
              <li>
                <strong>Card Count Formula:</strong> Deal out{" "}
                <strong>N + 2 cards</strong> face-down onto the board, where{" "}
                <strong>N</strong> is the total number of players in the game
                (e.g., if 4 players are playing, deal 6 cards).
              </li>
              <li>
                <strong>Card Types:</strong> The board contains cards drawn from
                the Main Deck, which include <strong>Resource cards</strong>{" "}
                (red borders) and <strong>Action cards</strong> (blue borders).
              </li>
            </ul>
            <img
              src={step2Image}
              alt="The Board layout positioned below the Death Line"
            />
          </div>
        </section>

        {/* Phase 1: Draw Phase */}
        <section className="rules-section">
          <h2 className="rules-title">Phase 1: The Draw Phase</h2>
          <div className="setup-step">
            <p className="rules-text">
              The game officially begins with the <strong>Draw Phase</strong>,
              the first of three round phases.
            </p>
            <ul className="rules-bullets">
              <li>
                <strong>Order of Play:</strong> Players take turns drawing
                strictly in line death line's order.
              </li>
              <li>
                <strong>Taking a Card:</strong> The first character in line (in
                this example, <em>Misero</em>) chooses and draws{" "}
                <strong>one card</strong> of their choice directly from the
                available cards on the Board.
              </li>
              <li>
                <strong>Empty Board Rule:</strong> If no cards are available on
                the board when your turn comes, draw your card directly from the{" "}
                <strong>Main Deck</strong> instead.
              </li>
            </ul>
            <img
              src={step3Image}
              alt="Draw Phase step showing Misero taking a card from the board"
            />
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">Completing the Draw Phase</h3>
            <p className="rules-text">
              Drawing continues down the line in queue order until{" "}
              <strong>every player</strong> has picked one card from the board.
            </p>
            <ul className="rules-bullets">
              <li>
                <strong>Queue Sequence:</strong> After Misero draws, the next
                player in line (Notferatu) takes their card, followed by
                Paprika, Hamlet, and so on.
              </li>
              <li>
                <strong>Board Depletion:</strong> As players take their cards,
                the board will naturally shrink. Once all players have drawn
                their single card for the round, the Draw Phase ends and you
                immediately move to the <strong>Action Phase</strong>.
              </li>
            </ul>
            <img
              src={step4Image}
              alt="Board after all players have drawn their card in queue order"
            />
          </div>
        </section>

        {/* Phase 2: Action Phase */}
        <section className="rules-section">
          <h2 className="rules-title">Phase 2: The Action Phase</h2>
          <div className="setup-step">
            <p className="rules-text">
              Once all players have drawn a card, the{" "}
              <strong>Action Phase</strong> begins in queue order starting with
              the first player in the death line.
            </p>
            <p className="rules-text">
              On your turn, you can perform one of three main options:
            </p>

            <ul className="rules-bullets">
              <li>
                <strong>1) Play an Action Card:</strong> Play a blue action card
                from your hand (such as <em>Unfair Trade</em>) directly into
                your play area and immediately resolve its printed effect.
                Discarded Action cards go to the main discard pile below the
                Main Deck (MD).
              </li>
              <li>
                <strong>2) Buy a Plot Armor Card:</strong> Discard{" "}
                <strong>3 matching Resource cards</strong> +{" "}
                <strong>1 Holy Duck Tape card</strong> from your hand to claim
                the corresponding Plot Armor card.
                <br />
                <em>Example:</em> Discarding 3 Strength resources + 1 Holy Duck
                Tape awards you 1 Strength Plot Armor card. Discarding 3
                Dexterity resources + 1 Holy Duck Tape awards 1 Dexterity Plot
                Armor card (the same logic applies for Intelligence and Wisdom).
              </li>
              <li>
                <strong>3) Buy or Play a Black Market Card:</strong> Discard{" "}
                <strong>any 3 cards</strong> from your hand to take the top card
                from the Black Market deck. When played, Black Market cards
                resolve their effect and go directly to the main discard pile.
              </li>
            </ul>

            <div className="rules-callout">
              <h4 className="rules-callout-title">
                Action Phase Priority & Passing
              </h4>
              <p className="rules-text">
                During the Action Phase, each player takes{" "}
                <strong>one action</strong> on their turn, or they may choose to{" "}
                <strong>pass</strong> and do nothing.
              </p>
              <p className="rules-text">
                Turn priority moves down the queue from player to player. If any
                player performs an action, the cycle resets and continues around
                the table. The Action Phase only ends when{" "}
                <strong>every player passes consecutively in a row</strong>.
              </p>
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                Playing an Action Card Example
              </h4>
              <p className="rules-text">
                The active player plays <strong>Unfair Trade</strong> to execute
                its effect immediately ("Draw 2 cards from the Main Deck").
              </p>
              <img
                src={step5Image}
                alt="Showing a player playing an Action card during the Action Phase"
              />
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">Buying Plot Armor Example</h4>
              <p className="rules-text">
                To purchase a Strength Plot Armor card, submit 3 Strength cards
                alongside 1 Holy Duck Tape card.
              </p>
              <img
                src={step6Image}
                alt="Showing 3 Strength resources and 1 Holy Duck Tape card used to purchase Strength Plot Armor"
              />
            </div>
          </div>
        </section>

        {/* Phase 3: Executioner Phase */}
        <section className="rules-section">
          <h2 className="rules-title">Phase 3: The Executioner Phase</h2>
          <div className="setup-step">
            <p className="rules-text">
              When all players have passed, reveal the top card of the{" "}
              <strong>Executioner Deck</strong>. Discarded Executioner cards go
              directly to the <strong>Executioner Discard Deck</strong> placed
              right next to it (note: standard Main Deck cards and played Black
              Market cards go directly to the main discard pile below the Main
              Deck).
            </p>

            <ul className="rules-bullets">
              <li>
                <strong>Refilling the Board:</strong> Some Executioner cards
                instruct players to refill empty spots on the Board using cards
                from the Main Deck.
              </li>
              <li>
                <strong>"YOU ARE UP NEXT":</strong> When this card is revealed,
                the Executioner executes the very next card in the Death Line.
              </li>
              <li>
                <strong>Peasant Buffer:</strong> The Executioner must kill all 3
                Peasants first before any player character is in danger.
              </li>
              <li>
                <strong>Flipping to Death State:</strong> When a player
                character dies, flip their card over to reveal their{" "}
                <strong>Death State</strong> artwork.
              </li>
            </ul>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                Executioner Reveal Example
              </h4>
              <p className="rules-text">
                Drawing "YOU ARE UP NEXT" forces the Executioner to advance and
                eliminate the next target in line.
              </p>
              <img
                src={step45Image}
                alt="Executioner card reveal showing YOU ARE UP NEXT next to the Executioner discard stack"
              />
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                Character Death State Example
              </h4>
              <p className="rules-text">
                Eliminated characters are flipped over to display their unique
                Death State illustrations.
              </p>
              <img
                src={img1132Image}
                alt="Character cards flipped over showing their death state illustrations"
              />
            </div>
          </div>
        </section>

        {/* Purpose of the Game */}
        <section className="rules-section">
          <h2 className="rules-title">Purpose of the Game</h2>
          <p className="rules-text">
            Prove you are the protagonist! The first player to collect
            <strong> 3 Plot Armor cards</strong> wins.
          </p>
          <p className="rules-text">
            Alternatively, if all other players die, the
            <strong> last player standing</strong> wins immediately.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
