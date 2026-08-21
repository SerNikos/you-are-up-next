import "./App.css";
import Navbar from "./components/NavBar/Navbar.jsx";
import YaunCard from "./components/YaunCard/YaunCard.jsx";

import misero from "./assets/misero.jpg";
import executioner from "./assets/executioner.jpg";
import notferatu from "./assets/notferatu.jpg";
import hamlet from "./assets/hamlet.jpg";
import paprika from "./assets/paprika.jpg";

import Footer from "./components/Footer/Footer.jsx";
import GameDescription from "./components/GameDescription/GameDescription.jsx";
import { Link } from "react-router-dom";
import { Accordion } from "./components/Accordion/Accordion.jsx";
import { Analytics } from "@vercel/analytics/react";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

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
            name={t("home.cards.executioner_title")}
            description={t("home.cards.executioner_desc")}
          />
        </Link>

        <Link to="/AllCharactersLore#notferatu">
          <YaunCard
            img={notferatu}
            name={t("home.cards.notferatu_title")}
            description={t("home.cards.notferatu_desc")}
          />
        </Link>

        <Link to="/AllCharactersLore#misero">
          <YaunCard
            img={misero}
            name={t("home.cards.misero_title")}
            description={t("home.cards.misero_desc")}
          />
        </Link>

        <Link to="/AllCharactersLore#paprika">
          <YaunCard
            img={paprika}
            name={t("home.cards.paprika_title")}
            description={t("home.cards.paprika_desc")}
          />
        </Link>

        <Link to="/AllCharactersLore#hamlet">
          <YaunCard
            img={hamlet}
            name={t("home.cards.hamlet_title")}
            description={t("home.cards.hamlet_desc")}
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
