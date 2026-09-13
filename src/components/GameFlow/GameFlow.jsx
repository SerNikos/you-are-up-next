import React from "react";
import { useTranslation } from "react-i18next";
import "./GameFlow.css";

export default function GameFlow({ activePhase, onPhaseToggle }) {
  const { t } = useTranslation();

  return (
    <div className="game-flow-wrapper">
      <h3 className="game-flow-main-title">{t("game_flow.title")}</h3>

      <div className="game-flow-grid">
        {/* Phase 1 */}
        <button
          type="button"
          className="flow-card phase-1-card"
          aria-controls="phase1-section"
          aria-expanded={activePhase === "phase1"}
          onClick={() => onPhaseToggle("phase1")}
        >
          <div className="flow-badge">1</div>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.phase1_title")}
            </span>
            <span className="flow-action">{t("game_flow.phase1_action")}</span>
          </div>
        </button>

        <div className="flow-connector">→</div>

        {/* Phase 2 */}
        <button
          type="button"
          className="flow-card phase-2-card"
          aria-controls="phase2-section"
          aria-expanded={activePhase === "phase2"}
          onClick={() => onPhaseToggle("phase2")}
        >
          <div className="flow-badge">2</div>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.phase2_title")}
            </span>
            <span className="flow-action">{t("game_flow.phase2_action")}</span>
          </div>
        </button>

        <div className="flow-connector">→</div>

        {/* Phase 3 */}
        <button
          type="button"
          className="flow-card phase-3-card"
          aria-controls="phase3-section"
          aria-expanded={activePhase === "phase3"}
          onClick={() => onPhaseToggle("phase3")}
        >
          <div className="flow-badge">3</div>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.phase3_title")}
            </span>
            <span className="flow-action">{t("game_flow.phase3_action")}</span>
          </div>
        </button>

        <div className="flow-connector">→</div>

        {/* Win State */}
        <button
          type="button"
          className="flow-card win-card"
          aria-controls="purpose-section"
          aria-expanded={activePhase === "win"}
          onClick={() => onPhaseToggle("win")}
        >
          <div className="flow-badge win-badge">🏆</div>
          <div className="flow-content">
            <span className="flow-phase-title">
              {t("game_flow.win_state_title")}
            </span>
            <span className="flow-action">
              {t("game_flow.win_state_action")}
            </span>
          </div>
        </button>
      </div>

      {/* Loop Indicator */}
      <div className="flow-loop-indicator">
        <span className="loop-icon">🔄</span>
        <span className="loop-text">{t("game_flow.loop_text")}</span>
      </div>
    </div>
  );
}
