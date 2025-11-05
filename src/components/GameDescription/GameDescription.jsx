import "./GameDescription.css";
import { useState } from "react";

export default function GameDescription() {
  const [buy, setBuy] = useState(false);

  function handleBuy() {
    setBuy(true);
  }

  function handleClose() {
    setBuy(false);
  }

  return (
    <div className="game-description">
      <h1 className="titleOfDiscription">YOU ARE UP NEXT</h1>
      <p>
        You have little but precious time to steal, trade, accuse, and do
        anything else while you’re in the queue to prove that you’re the
        protagonist and that you are NOT the next. "You Are Up Next" is a game
        against the clock. Only one will be the winner, and the competition
        comes not only from the other players but also from the executioner, who
        threatens the condemned in line with death. Play smart, take risks, and
        with a bit of luck you won’t be the next one to be executed.
      </p>
      <button className="buy-button" onClick={handleBuy}>
        Buy Now
      </button>
      {buy && (
        <div className="buy-box">
          Congrats, you bought YAUN!
          <button className="x-btn" onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
