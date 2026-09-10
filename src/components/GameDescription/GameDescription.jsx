import "./GameDescription.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Trans, useTranslation } from "react-i18next";
import scrollCloseSound from "../../assets/audio/sound effects/scroll close.mp3";
import scrollOpenSound from "../../assets/audio/sound effects/scroll open.mp3";

function playModalSound(soundSource) {
  const sound = new Audio(soundSource);
  sound.volume = 0.7;
  sound.play().catch(() => {});
}

export default function GameDescription() {
  const { t } = useTranslation();
  const [buy, setBuy] = useState(false);
  const modalRoot = document.getElementById("buy-modal");

  const openModal = () => {
    playModalSound(scrollOpenSound);
    setBuy(true);
  };

  const closeModal = () => {
    playModalSound(scrollCloseSound);
    setBuy(false);
  };

  return (
    <div className="game-description">
      <h1 className="titleOfDiscription">{t("home.title")}</h1>

      <p>
        {t("home.seo_description")} {t("home.description_part1")}
        <strong>{t("home.description_highlight")}</strong>{" "}
        {t("home.description_part2")}
      </p>

      <button className="buy-button" onClick={openModal}>
        {t("home.buy_button")}
      </button>

      {buy &&
        createPortal(
          <div className="modal-overlay" onClick={closeModal}>
            <div className="buy-box" onClick={(e) => e.stopPropagation()}>
              <Trans
                i18nKey="home.modal_kickstarter"
                components={[
                  <a
                    className="instagram-link"
                    href="https://www.instagram.com/yaun_game"
                    target="_blank"
                    rel="noreferrer"
                  />,
                ]}
              />
              <button className="x-btn" onClick={closeModal}>
                X
              </button>
            </div>
          </div>,
          modalRoot,
        )}
    </div>
  );
}
