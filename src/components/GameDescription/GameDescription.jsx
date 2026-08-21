import "./GameDescription.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

export default function GameDescription() {
  const { t } = useTranslation();
  const [buy, setBuy] = useState(false);
  const modalRoot = document.getElementById("buy-modal");

  return (
    <div className="game-description">
      <h1 className="titleOfDiscription">{t("home.title")}</h1>

      <p>
        {t("home.description_part1")}{" "}
        <strong>{t("home.description_highlight")}</strong>{" "}
        {t("home.description_part2")}
      </p>

      <button className="buy-button" onClick={() => setBuy(true)}>
        {t("home.buy_button")}
      </button>

      {buy &&
        createPortal(
          <div className="modal-overlay" onClick={() => setBuy(false)}>
            <div className="buy-box" onClick={(e) => e.stopPropagation()}>
              {t("home.modal_kickstarter")}
              <button className="x-btn" onClick={() => setBuy(false)}>
                X
              </button>
            </div>
          </div>,
          modalRoot,
        )}
    </div>
  );
}
