import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import "flag-icons/css/flag-icons.min.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaGlobe,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaVolumeUp,
  FaStop,
} from "react-icons/fa";
import { toggleSpeech, isInAppBrowser } from "../../utils/voice";
import OpenSpeechInWindowModal from "../OpenSpeechInWindowModal/OpenSpeechInWindowModal";
import { getLocalizedPath } from "../../utils/localePath.js";
import bloodLeft from "../../assets/useful-art/BLOOD1.svg";
import bloodRight from "../../assets/useful-art/BLOOD2.svg";
import yaunLogo from "../../assets/useful-art/LOGO YAUN.svg";

function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSpeechModal, setShowSpeechModal] = useState(false);

  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentLang = i18n.language || "el";
  const localizedLink = (path) => getLocalizedPath(path, currentLang.slice(0, 2));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    navigate(getLocalizedPath(pathname, lng));
    setLangOpen(false);
  };

  const handleVoiceToggle = () => {
    if (isInAppBrowser()) {
      setShowSpeechModal(true);
      return;
    }

    const active = toggleSpeech(i18n.language);
    setIsSpeaking(active);
  };

  const VoiceButton = () => (
    <button
      className={`voice-btn ${isSpeaking ? "speaking" : ""}`}
      onClick={handleVoiceToggle}
      aria-label={isSpeaking ? t("nav.voice.stop") : t("nav.voice.listen")}
      title={isSpeaking ? t("nav.voice.stop") : t("nav.voice.listen")}
    >
      {isSpeaking ? (
        <FaStop className="voice-icon" />
      ) : (
        <FaVolumeUp className="voice-icon" />
      )}
      <span className="voice-text">
        {isSpeaking ? t("nav.voice.stop") : t("nav.voice.listen")}
      </span>
    </button>
  );

  const LangMenu = () => (
    <div className="lang-menu-container">
      <button
        className="lang-btn"
        onClick={() => setLangOpen(!langOpen)}
        aria-label="Select Language"
      >
        <FaGlobe className="globe-icon" />
        <span className="current-lang">
          {currentLang.toUpperCase().slice(0, 2)}
        </span>
        <FaChevronDown className={`arrow-icon ${langOpen ? "open" : ""}`} />
      </button>

      {langOpen && (
        <div className="lang-dropdown">
          <button
            className={`lang-option ${currentLang.startsWith("el") ? "active" : ""}`}
            onClick={() => changeLanguage("el")}
          >
            <span className="fi fi-gr"></span> Ελληνικά
          </button>
          <button
            className={`lang-option ${currentLang.startsWith("en") ? "active" : ""}`}
            onClick={() => changeLanguage("en")}
          >
            <span className="fi fi-gb"></span> English
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="above-nav-art">
        <img className="above-nav-blood above-nav-blood-left" src={bloodLeft} alt="" aria-hidden="true" />
        <Link
          to={localizedLink("/")}
          onClick={() => setMenuOpen(false)}
          className="above-nav-logo-link"
          aria-label={t("nav.home")}
        >
          <img className="above-nav-logo" src={yaunLogo} alt="You Are Up Next logo" />
        </Link>
        <img className="above-nav-blood above-nav-blood-right" src={bloodRight} alt="" aria-hidden="true" />
      </div>
      <nav className="navbar">
        <div className="nav-container">
          {/* NAVIGATION LINKS */}
          <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
            <Link to={localizedLink("/")} onClick={() => setMenuOpen(false)}>
              <li className="nav-item">{t("nav.home")}</li>
            </Link>
            <Link to={localizedLink("/AllCharactersLore")} onClick={() => setMenuOpen(false)}>
              <li className="nav-item">{t("nav.protagonists")}</li>
            </Link>
            <Link to={localizedLink("/Team")} onClick={() => setMenuOpen(false)}>
              <li className="nav-item">{t("nav.team")}</li>
            </Link>
            <Link to={localizedLink("/Rules")} onClick={() => setMenuOpen(false)}>
              <li className="nav-item">{t("nav.rules")}</li>
            </Link>
            <Link to={localizedLink("/ContactUs")} onClick={() => setMenuOpen(false)}>
              <li className="nav-item">{t("nav.contact")}</li>
            </Link>

            {/* MOBILE CONTROLS (VOICE & LANG) */}
            <li className="mobile-controls-item">
              <VoiceButton />
              <LangMenu />
            </li>
          </ul>

          {/* DESKTOP CONTROLS */}
          <div className="desktop-controls">
            <VoiceButton />
            <LangMenu />
          </div>

          {/* HAMBURGER BUTTON (Mobile Only) */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* CUSTOM IN-APP BROWSER MODAL */}
      <OpenSpeechInWindowModal
        isOpen={showSpeechModal}
        onClose={() => setShowSpeechModal(false)}
        lang={currentLang}
      />
    </>
  );
}

export default Navbar;
