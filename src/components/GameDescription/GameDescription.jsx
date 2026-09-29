import "./GameDescription.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Trans, useTranslation } from "react-i18next";
import scrollCloseSound from "../../assets/audio/sound effects/scroll close.mp3";
import scrollOpenSound from "../../assets/audio/sound effects/scroll open.mp3";
import dialogCard from "../../assets/useful-art/dialog-card.png";
import LoadingImage from "../LoadingImage/LoadingImage";
import { getOptimizedImageSources } from "../../utils/optimizedImages.js";

function playModalSound(soundSource) {
  const sound = new Audio(soundSource);
  sound.volume = 0.7;
  sound.play().catch(() => {});
}

// Warms the browser cache for the modal art so it's already there when the modal opens.
function preloadBuyBoxArt() {
  const sources = getOptimizedImageSources(dialogCard);
  const targetWidth = Math.ceil(550 * (window.devicePixelRatio || 1));
  const pickSrc = (variants) =>
    variants?.find((variant) => variant.width >= targetWidth)?.src ||
    variants?.[variants.length - 1]?.src;

  const hrefs = [pickSrc(sources?.avif), pickSrc(sources?.webp)].filter(
    Boolean,
  );

  hrefs.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
  });
}

export default function GameDescription() {
  const { t } = useTranslation();
  const [buy, setBuy] = useState(false);
  const modalRoot = document.getElementById("buy-modal");

  useEffect(() => {
    preloadBuyBoxArt();
  }, []);

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
              <LoadingImage
                className="buy-box-art"
                src={dialogCard}
                alt=""
                aria-hidden="true"
                loading="eager"
                wrapperClassName="buy-box-art-wrapper"
              />
              <p className="buy-box-message">
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
              </p>
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
