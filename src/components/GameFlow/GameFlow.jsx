import React from "react";
import { useTranslation } from "react-i18next";
import "./GameFlow.css";

export default function GameFlow() {
  const { t } = useTranslation();

  return (
    <div className="game-flow-wrapper">
      <h3 className="game-flow-main-title">{t("game_flow.title")}</h3>
      <div className="game-flow-box">
        {/* Phase 1 Link */}
        <a href="#phase1-section" className="flow-step flow-link-step">
          <span className="flow-indicator phase-1"></span>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.phase1_title")}
            </span>
            <span className="flow-action">{t("game_flow.phase1_action")}</span>
          </div>
        </a>

        <div className="flow-arrow">↓</div>

        {/* Phase 2 Link */}
        <a href="#phase2-section" className="flow-step flow-link-step">
          <span className="flow-indicator phase-2"></span>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.phase2_title")}
            </span>
            <span className="flow-action">{t("game_flow.phase2_action")}</span>
          </div>
        </a>

        <div className="flow-arrow">↓</div>

        {/* Phase 3 Link */}
        <a href="#phase3-section" className="flow-step flow-link-step">
          <span className="flow-indicator phase-3"></span>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.phase3_title")}
            </span>
            <span className="flow-action">{t("game_flow.phase3_action")}</span>
          </div>
        </a>

        <div className="flow-arrow">↓</div>

        {/* Win State Link */}
        <a href="#purpose-section" className="flow-step flow-link-step">
          <span className="flow-indicator win-state"></span>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.win_state_title")}
            </span>
            <span className="flow-action">
              {t("game_flow.win_state_action")}
            </span>
          </div>
        </a>

        {/* Loop Graphic / Indicator back to Phase 1 */}
        <div className="flow-loop-indicator">
          <span className="loop-icon">🔄</span>
          <span className="loop-text">{t("game_flow.loop_text")}</span>
        </div>
      </div>
    </div>
  );
}
