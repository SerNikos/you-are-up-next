import "./AllCharactersLore.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../NavBar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

// Alive card image asset paths
import executioner from "../../assets/executioner.jpg";
import notferatu from "../../assets/notferatu.jpg";
import misero from "../../assets/misero.jpg";
import paprika from "../../assets/paprika.jpg";
import hamlet from "../../assets/hamlet.jpg";

// Cursed/Dead card image asset paths
import executionerDead from "../../assets/heros-dead/executioner-dead.png";
import hamletDead from "../../assets/heros-dead/hamlet-dead.png";
import miseroDead from "../../assets/heros-dead/misero-dead card.png";
import notferatuDead from "../../assets/heros-dead/notferatu-dead card.png";
import paprikaDead from "../../assets/heros-dead/paprika-dead.png";

import { Helmet } from "react-helmet-async";

// Κρατάμε μόνο τα δομικά στοιχεία (IDs & Images)
const characterList = [
  {
    id: "executioner",
    image: executioner,
    deadImage: executionerDead,
  },
  {
    id: "notferatu",
    image: notferatu,
    deadImage: notferatuDead,
  },
  {
    id: "misero",
    image: misero,
    deadImage: miseroDead,
  },
  {
    id: "paprika",
    image: paprika,
    deadImage: paprikaDead,
  },
  {
    id: "hamlet",
    image: hamlet,
    deadImage: hamletDead,
  },
];

export default function AllCharactersLore() {
  const { t } = useTranslation();
  const { hash } = useLocation();

  // Tracks active dynamic elements across small screen display touch triggers
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (!hash) return;

    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  // Safely registers context states when handling click-to-reveal mechanisms
  const handleCardClick = (id) => {
    setActiveCard((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <Helmet>
        <title>{t("meta.charactersTitle")}</title>
        <meta name="description" content={t("meta.charactersDescription")} />
        <meta property="og:title" content={t("meta.charactersTitle")} />
        <meta
          property="og:description"
          content={t("meta.charactersDescription")}
        />
      </Helmet>

      <Navbar />

      <main className="fullDescriptions">
        {characterList.map((char) => {
          const name = t(`characters.${char.id}.name`);
          const descriptionHtml = t(`characters.${char.id}.description`);

          return (
            <section
              key={char.id}
              id={char.id}
              aria-labelledby={`${char.id}-title`}
            >
              <div
                className={`photo-container ${
                  activeCard === char.id ? "revealed" : ""
                }`}
                onClick={() => handleCardClick(char.id)}
              >
                <img
                  src={char.image}
                  alt={`${name} alive card`}
                  className="character-photo alive"
                />
                {char.deadImage && (
                  <img
                    src={char.deadImage}
                    alt={`${name} dead card`}
                    className="character-photo dead"
                  />
                )}
              </div>

              <div className="second-half">
                <h2 id={`${char.id}-title`}>{name}</h2>

                {/* Εδώ γίνεται το render του HTML από τα JSON αρχεία */}
                <p
                  className="character-discription"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>
            </section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
