import React from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import "./OpenSpeechInWindowModal.css";

function OpenSpeechInWindowModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  const isGreek = lang && lang.startsWith("el");
  const isAndroid = /android/i.test(navigator.userAgent);

  const handleOpenExternalBrowser = () => {
    // Intent URL για εξαναγκασμό ανοίγματος στον Chrome (Android)
    const currentUrl = window.location.href.replace(/^https?:\/\//, "");
    window.location.href = `intent://${currentUrl}#Intent;scheme=https;package=com.android.chrome;end`;
  };

  return (
    <div className="speech-modal-overlay" onClick={onClose}>
      <div
        className="speech-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="speech-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <h3>
          {isGreek ? "Απαιτείται Περιηγητής" : "External Browser Required"}
        </h3>

        <p>
          {isGreek
            ? "Η φωνητική ανάγνωση δεν υποστηρίζεται μέσα από την εφαρμογή (Instagram/Messenger)."
            : "Voice reading is not supported inside Instagram/Messenger."}
        </p>

        {isAndroid ? (
          /* ΓΙΑ ANDROID: Κουμπί που ανοίγει τον Chrome */
          <div className="speech-modal-action-area">
            <button
              className="open-chrome-btn"
              onClick={handleOpenExternalBrowser}
            >
              <FaExternalLinkAlt />
              {isGreek ? "Άνοιγμα σε Google Chrome" : "Open in Google Chrome"}
            </button>
          </div>
        ) : (
          /* ΓΙΑ iOS (iPhone): Οδηγία για τις 3 τελείες */
          <div className="speech-modal-instruction-box">
            <p className="instruction-text">
              {isGreek
                ? "Πατήστε τις 3 τελείες (•••) πάνω δεξιά και επιλέξτε «Άνοιγμα σε Safari»."
                : "Tap the 3 dots (•••) at the top right and select 'Open in Safari'."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OpenSpeechInWindowModal;
