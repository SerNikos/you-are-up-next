import "./AllCharactersLore.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../NavBar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import LoadingImage from "../LoadingImage/LoadingImage.jsx";

// Alive card image asset paths
import executioner from "../../assets/protagonists/executioner.jpg";
import notferatu from "../../assets/protagonists/notferatu.jpg";
import misero from "../../assets/protagonists/misero.jpg";
import paprika from "../../assets/protagonists/paprika.jpg";
import hamlet from "../../assets/protagonists/hamlet.jpg";

// Cursed/Dead card image asset paths
import executionerDead from "../../assets/heros-dead/executioner-dead.png";
import hamletDead from "../../assets/heros-dead/hamlet-dead.png";
import miseroDead from "../../assets/heros-dead/misero-dead card.png";
import notferatuDead from "../../assets/heros-dead/notferatu-dead card.png";
import paprikaDead from "../../assets/heros-dead/paprika-dead.png";

// Audio asset paths (για τα Αγγλικά ή όποτε υπάρχουν)
import executionerAudio from "../../assets/audio/executioner.mp3";
import hamletAudio from "../../assets/audio/hamlet.mp3";
import miseroAudio from "../../assets/audio/misero.mp3";
import notferatuAudio from "../../assets/audio/notferatu.mp3";
import paprikaAudio from "../../assets/audio/paprika.mp3";

import SEO from "../SEO/SEO.jsx";

const characterList = [
  {
    id: "executioner",
    image: executioner,
    deadImage: executionerDead,
    audio: executionerAudio,
  },
  {
    id: "notferatu",
    image: notferatu,
    deadImage: notferatuDead,
    audio: notferatuAudio,
  },
  {
    id: "misero",
    image: misero,
    deadImage: miseroDead,
    audio: miseroAudio,
  },
  {
    id: "paprika",
    image: paprika,
    deadImage: paprikaDead,
    audio: paprikaAudio,
  },
  {
    id: "hamlet",
    image: hamlet,
    deadImage: hamletDead,
    audio: hamletAudio,
  },
];

export default function AllCharactersLore() {
  const { t, i18n } = useTranslation();
  const { hash } = useLocation();

  const [activeCard, setActiveCard] = useState(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Έλεγχος αν η τρέχουσα γλώσσα είναι Ελληνική
  const isGreek = i18n.language && i18n.language.startsWith("el");

  useEffect(() => {
    if (!hash) return;

    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  const handleCardClick = (id) => {
    setActiveCard((prevId) => (prevId === id ? null : id));
  };

  const handleAudioToggle = (id, isPlaying) => {
    setPlayingAudioId(isPlaying ? id : null);
  };

  return (
    <div>
      <SEO />

      <Navbar />

      <main className="fullDescriptions">
        <h1 className="visually-hidden">{t("nav.protagonists")}</h1>
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
                <LoadingImage
                  src={char.image}
                  alt={`${name} alive card`}
                  className="character-photo alive"
                  wrapperClassName="character-image-loader alive-image"
                  loading="eager"
                />
                {char.deadImage && (
                  <LoadingImage
                    src={char.deadImage}
                    alt={`${name} dead card`}
                    className="character-photo dead"
                    wrapperClassName="character-image-loader dead-image"
                    loading="eager"
                  />
                )}
              </div>

              <div className="second-half">
                <h2 id={`${char.id}-title`}>{name}</h2>

                <p
                  className="character-discription"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />

                {/* Εμφάνιση του AudioPlayer ΜΟΝΟ αν ΔΕΝ είναι στα ελληνικά (!isGreek) */}
                {!isGreek && (
                  <AudioPlayer
                    audioSrc={char.audio}
                    characterName={name}
                    isPlaying={playingAudioId === char.id}
                    onToggle={(isPlaying) =>
                      handleAudioToggle(char.id, isPlaying)
                    }
                  />
                )}
              </div>
            </section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
