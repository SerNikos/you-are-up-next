import "./App.css";
import Navbar from "./components/NavBar/Navbar.jsx";
import YaunCard from "./components/YaunCard/YaunCard.jsx";

import misero from "./assets/protagonists/misero.jpg";
import executioner from "./assets/protagonists/executioner.jpg";
import notferatu from "./assets/protagonists/notferatu.jpg";
import hamlet from "./assets/protagonists/hamlet.jpg";
import paprika from "./assets/protagonists/paprika.jpg";

import Footer from "./components/Footer/Footer.jsx";
import GameDescription from "./components/GameDescription/GameDescription.jsx";
import { Link, useLocation } from "react-router-dom";
import { Accordion } from "./components/Accordion/Accordion.jsx";
import { Analytics } from "@vercel/analytics/react";
import { useTranslation } from "react-i18next";
import SEO from "./components/SEO/SEO.jsx";
import { getLanguageFromPath } from "./utils/localePath.js";

function App() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname) || "en";
  const charactersPath = `/${language}/characters`;

  return (
    <>
      <SEO />
      <section className="header">
        <Navbar />
      </section>

      <section className="GameDescription">
        <GameDescription />
      </section>

      <main>
        <section className="characterCards">
          <Link to={`${charactersPath}#executioner`}>
          <YaunCard
            img={executioner}
            name={t("home.cards.executioner_title")}
            description={t("home.cards.executioner_desc")}
          />
          </Link>

        <Link to={`${charactersPath}#notferatu`}>
          <YaunCard
            img={notferatu}
            name={t("home.cards.notferatu_title")}
            description={t("home.cards.notferatu_desc")}
          />
          </Link>

        <Link to={`${charactersPath}#misero`}>
          <YaunCard
            img={misero}
            name={t("home.cards.misero_title")}
            description={t("home.cards.misero_desc")}
          />
          </Link>

        <Link to={`${charactersPath}#paprika`}>
          <YaunCard
            img={paprika}
            name={t("home.cards.paprika_title")}
            description={t("home.cards.paprika_desc")}
          />
          </Link>

        <Link to={`${charactersPath}#hamlet`}>
          <YaunCard
            img={hamlet}
            name={t("home.cards.hamlet_title")}
            description={t("home.cards.hamlet_desc")}
          />
          </Link>
        </section>

        <Accordion />
      </main>
      <Footer />

      <Analytics />
    </>
  );
}

export default App;
