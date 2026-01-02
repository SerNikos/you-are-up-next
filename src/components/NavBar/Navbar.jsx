import { Link } from "react-router";
import "./NavBar.css";
import { useState } from "react";

function Navbar() {
  const [buy, setBuy] = useState(false);

  function handleBuy() {
    setBuy(true);
  }

  function handleClose() {
    setBuy(false);
  }
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <Link to="/">
          <li className="nav-logo">YOU ARE UP NEXT</li>
        </Link>

        <Link to="/">
          <li className="nav-item">Home</li>
        </Link>

        <Link to="/AllCharactersLore">
          <li className="nav-item">Protagonists</li>
        </Link>
        <Link to="/Team">
          <li className="nav-item">Team</li>
        </Link>
        <Link to="/Rules">
          <li className="nav-item">Rules</li>
        </Link>
        <Link to="/ContactUs">
          <li className="nav-item">Contact Us</li>
        </Link>
      </ul>
      {buy && (
        <div className="buy-box">
          Congrats, you bought YAUN!
          <button className="x-btn" onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
