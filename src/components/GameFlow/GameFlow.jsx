import React from "react";
import { useTranslation } from "react-i18next";
import "./GameFlow.css";

export default function GameFlow() {
  const { t } = useTranslation();

  return (
    <div className="game-flow-container">
      <h3 className="game-flow-main-title">{t("game_flow.title")}</h3>
      
      <div className="game-flow-steps">
        {/* Phase 1 */}
        <div className="flow-step-card phase-1">
          <div className="flow-box">
            <h4>{t("game_flow.phase1_title")}</h4>
          </div>
          <span className="flow-connector-text">{t("game_flow.phase1_action")}</span>
        </div>

        <div className="flow-arrow">↓</div>

        {/* Phase 2 */}
        <div className="flow-step-card phase-2">
          <div className="flow-box">
            <h4>{t("game_flow.phase2_title")}</h4>
          </div>
          <span className="flow-connector-text">{t("game_flow.phase2_action")}</span>
        </div>

        <div className="flow-arrow">↓</div>

        {/* Phase 3 */}
        <div className="flow-step-card phase-3">
          <div className="flow-box">
            <h4>{t("game_flow.phase3_title")}</h4>
          </div>
          <span className="flow-connector-text">{t("game_flow.phase3_action")}</span>
        </div>
      </div>
    </div>
  );
}