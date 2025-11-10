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
import { Accordion } from "./components/Accordion/Accordion.jsx";
import { Analytics } from "@vercel/analytics/react"; // ✅ correct import

function App() {
  return (
    <>
      <section className="header">
        <Navbar />
      </section>

      <section className="GameDescription">
        <GameDescription />
      </section>

      <section className="characterCards">
        <Link to="/AllCharactersLore#executioner">
          <YaunCard
            img={executioner}
            name="The Executioner"
            description="He is the one who decides who is next"
          />
        </Link>

        <Link to="/AllCharactersLore#notferatu">
          <YaunCard
            img={notferatu}
            name="Notferatu"
            description="The most fearless vampire hunter ever"
          />
        </Link>

        <Link to="/AllCharactersLore#misero">
          <YaunCard
            img={misero}
            name="Misero"
            description="He is not here to entertain you"
          />
        </Link>

        <Link to="/AllCharactersLore#paprika">
          <YaunCard
            img={paprika}
            name="Paprika"
            description="She thinks she can fix him"
          />
        </Link>

        <Link to="/AllCharactersLore#hamlet">
          <YaunCard
            img={hamlet}
            name="Hamlet"
            description="An Innocent animal or an evil genius?"
          />
        </Link>
      </section>

      <Accordion />
      <Footer />

      <Analytics />
    </>
  );
}

export default App;
