import "./GameDescription.css";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function GameDescription() {
  const [buy, setBuy] = useState(false);
  const modalRoot = document.getElementById("buy-modal");

  return (
    <div className="game-description">
      <h1 className="titleOfDiscription">YOU ARE UP NEXT</h1>
      <p>You have little but precious time to steal, trade, accuse...</p>

      <button className="buy-button" onClick={() => setBuy(true)}>
        Buy Now
      </button>

      {buy &&
        createPortal(
          <div className="modal-overlay" onClick={() => setBuy(false)}>
            <div className="buy-box" onClick={(e) => e.stopPropagation()}>
              Soon on KICKSTARTER...
              <button className="x-btn" onClick={() => setBuy(false)}>
                X
              </button>
            </div>
          </div>,
          modalRoot
        )}
    </div>
  );
}
