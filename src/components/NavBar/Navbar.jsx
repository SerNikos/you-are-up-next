import { Link } from "react-router-dom";
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
import { toggleSpeech } from "../../utils/voice"; // Προσαρμόστε το path αν χρειάζεται

function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language || "el";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const handleVoiceToggle = () => {
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
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="nav-logo-link"
        >
          <span className="nav-logo">{t("nav.title")}</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li className="nav-item">{t("nav.home")}</li>
          </Link>
          <Link to="/AllCharactersLore" onClick={() => setMenuOpen(false)}>
            <li className="nav-item">{t("nav.protagonists")}</li>
          </Link>
          <Link to="/Team" onClick={() => setMenuOpen(false)}>
            <li className="nav-item">{t("nav.team")}</li>
          </Link>
          <Link to="/Rules" onClick={() => setMenuOpen(false)}>
            <li className="nav-item">{t("nav.rules")}</li>
          </Link>
          <Link to="/ContactUs" onClick={() => setMenuOpen(false)}>
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
  );
}

export default Navbar;
