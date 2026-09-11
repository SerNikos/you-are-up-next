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
import misero from "../../assets/protagonists/misero.png";
import paprika from "../../assets/protagonists/paprika.jpg";
import hamlet from "../../assets/protagonists/hamlet.jpg";

// Cursed/Dead card image asset paths
import executionerDead from "../../assets/heros-dead/executioner-dead.png";
import hamletDead from "../../assets/heros-dead/hamlet-dead.png";
import miseroDead from "../../assets/heros-dead/misero-dead.png";
import notferatuDead from "../../assets/heros-dead/notferatu-dead.png";
import paprikaDead from "../../assets/heros-dead/paprika-dead.png";

// Locale-specific audio asset paths
import executionerEnglishAudio from "../../assets/audio/English/executioner-en.mp3";
import hamletEnglishAudio from "../../assets/audio/English/hamlet-en.mp3";
import miseroEnglishAudio from "../../assets/audio/English/misero-en.mp3";
import notferatuEnglishAudio from "../../assets/audio/English/notferatu-en.mp3";
import paprikaEnglishAudio from "../../assets/audio/English/paprika-en.mp3";
import executionerGreekAudio from "../../assets/audio/Greek/executioner-gr.mp3";
import hamletGreekAudio from "../../assets/audio/Greek/hamlet-gr.mp3";
import miseroGreekAudio from "../../assets/audio/Greek/misero-gr.mp3";
import notferatuGreekAudio from "../../assets/audio/Greek/notferatu-gr.mp3";
import paprikaGreekAudio from "../../assets/audio/Greek/paprika-gr.mp3";

import SEO from "../SEO/SEO.jsx";

const characterList = [
  {
    id: "executioner",
    image: executioner,
    deadImage: executionerDead,
    englishAudio: executionerEnglishAudio,
    greekAudio: executionerGreekAudio,
  },
  {
    id: "notferatu",
    image: notferatu,
    deadImage: notferatuDead,
    englishAudio: notferatuEnglishAudio,
    greekAudio: notferatuGreekAudio,
  },
  {
    id: "misero",
    image: misero,
    deadImage: miseroDead,
    englishAudio: miseroEnglishAudio,
    greekAudio: miseroGreekAudio,
  },
  {
    id: "paprika",
    image: paprika,
    deadImage: paprikaDead,
    englishAudio: paprikaEnglishAudio,
    greekAudio: paprikaGreekAudio,
  },
  {
    id: "hamlet",
    image: hamlet,
    deadImage: hamletDead,
    englishAudio: hamletEnglishAudio,
    greekAudio: hamletGreekAudio,
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
    if (!element) return;

    // Use native scrollIntoView so CSS `scroll-margin-top` controls precise alignment
    const scrollToCharacter = () => {
      element.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    };

    let resizeTimer;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(scrollToCharacter, 80);
    });

    const fullDescContainer = document.querySelector(".fullDescriptions");
    if (fullDescContainer) {
      resizeObserver.observe(fullDescContainer);
    }

    requestAnimationFrame(scrollToCharacter);

    return () => {
      window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
    };
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

                <AudioPlayer
                  audioSrc={isGreek ? char.greekAudio : char.englishAudio}
                  characterName={name}
                  isPlaying={playingAudioId === char.id}
                  onToggle={(isPlaying) =>
                    handleAudioToggle(char.id, isPlaying)
                  }
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
