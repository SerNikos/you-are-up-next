import "./App.css";
import Navbar from "./components/NavBar/Navbar.jsx";
import YaunCard from "./components/YaunCard/YaunCard.jsx";

import misero from "./assets/misero.png";
import executioner from "./assets/executioner.png";
import notferatu from "./assets/notferatu.png";
import hamlet from "./assets/hamlet.png";
import paprika from "./assets/paprika.png";

import Footer from "./components/Footer/Footer.jsx";

import GameDescription from "./components/GameDescription/GameDescription.jsx";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <section className="header">
        <Navbar></Navbar>
      </section>
      <section className="GameDescription">
        <GameDescription></GameDescription>
      </section>

      <section className="characterCards">
        <Link to="/AllCharactersLore#executioner">
          <YaunCard
            className="yaun-card"
            img={executioner}
            name="The Executioner"
            description="He is the one who decides who is next"
          />
        </Link>

        <Link to="/AllCharactersLore#notferatu">
          <YaunCard
            className="yaun-card"
            img={notferatu}
            name="Notferatu"
            description="The most fealess vampire hunter ever"
          />
        </Link>
        <Link to="/AllCharactersLore#misero">
          <YaunCard
            className="yaun-card"
            img={misero}
            name="Misero"
            description="They are not here to entertain You"
          />
        </Link>
        <Link to="/AllCharactersLore#paprika">
          <YaunCard
            className="yaun-card"
            img={paprika}
            name="Paprika"
            description="She thinks she can fix him"
          />
        </Link>

        <Link to="/AllCharactersLore#hamlet">
          <YaunCard
            className="yaun-card"
            img={hamlet}
            name="Hamlet"
            description="An Innocent animal or an evil genius?"
          />
        </Link>
      </section>
      <Footer></Footer>
    </>
  );
}

export default App;
