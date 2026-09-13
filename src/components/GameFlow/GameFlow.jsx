import React, { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./GameFlow.css";

const guidedPhases = ["phase1", "phase2", "phase3", "win"];

export default function GameFlow({ activePhase, onPhaseToggle, children }) {
  const { t } = useTranslation();
  const [cuePhase, setCuePhase] = useState("phase1");
  const pendingScrollPosition = useRef(null);
  const phasePanels = React.Children.toArray(children);

  useLayoutEffect(() => {
    if (!pendingScrollPosition.current) {
      return;
    }

    const { left, top } = pendingScrollPosition.current;
    window.scrollTo(left, top);
    pendingScrollPosition.current = null;
  }, [activePhase]);

  const handlePhaseToggle = (phase) => {
    pendingScrollPosition.current = {
      left: window.scrollX,
      top: window.scrollY,
    };

    if (phase === cuePhase) {
      const phaseIndex = guidedPhases.indexOf(phase);
      setCuePhase(guidedPhases[phaseIndex + 1] || null);
    }

    onPhaseToggle(phase);
  };

  return (
    <div className="game-flow-wrapper" data-active-phase={activePhase || ""}>
      <h3 className="game-flow-main-title">{t("game_flow.title")}</h3>

      <div className="game-flow-grid">
        <div className="flow-node" data-phase="phase1">
          {/* Phase 1 */}
          <button
            type="button"
            className="flow-card phase-1-card"
            aria-controls="phase1-section"
            aria-expanded={activePhase === "phase1"}
            onClick={() => handlePhaseToggle("phase1")}
          >
            {cuePhase === "phase1" && (
              <span className="flow-click-cue" aria-hidden="true" />
            )}
            <div className="flow-badge">1</div>
            <div className="flow-content">
              <span className="flow-phase-title">
                {t("game_flow.phase1_title")}
              </span>
              <span className="flow-action">
                {t("game_flow.phase1_action")}
              </span>
            </div>
          </button>
          {phasePanels[0]}
        </div>

        <div className="flow-connector">→</div>

        <div className="flow-node" data-phase="phase2">
          {/* Phase 2 */}
          <button
            type="button"
            className="flow-card phase-2-card"
            aria-controls="phase2-section"
            aria-expanded={activePhase === "phase2"}
            onClick={() => handlePhaseToggle("phase2")}
          >
            {cuePhase === "phase2" && (
              <span className="flow-click-cue" aria-hidden="true" />
            )}
            <div className="flow-badge">2</div>
            <div className="flow-content">
              <span className="flow-phase-title">
                {t("game_flow.phase2_title")}
              </span>
              <span className="flow-action">
                {t("game_flow.phase2_action")}
              </span>
            </div>
          </button>
          {phasePanels[1]}
        </div>

        <div className="flow-connector">→</div>

        <div className="flow-node" data-phase="phase3">
          {/* Phase 3 */}
          <button
            type="button"
            className="flow-card phase-3-card"
            aria-controls="phase3-section"
            aria-expanded={activePhase === "phase3"}
            onClick={() => handlePhaseToggle("phase3")}
          >
            {cuePhase === "phase3" && (
              <span className="flow-click-cue" aria-hidden="true" />
            )}
            <div className="flow-badge">3</div>
            <div className="flow-content">
              <span className="flow-phase-title">
                {t("game_flow.phase3_title")}
              </span>
              <span className="flow-action">
                {t("game_flow.phase3_action")}
              </span>
            </div>
          </button>
          {phasePanels[2]}
        </div>

        <div className="flow-connector">→</div>

        <div className="flow-node" data-phase="win">
          {/* Win State */}
          <button
            type="button"
            className="flow-card win-card"
            aria-controls="purpose-section"
            aria-expanded={activePhase === "win"}
            onClick={() => handlePhaseToggle("win")}
          >
            {cuePhase === "win" && (
              <span className="flow-click-cue" aria-hidden="true" />
            )}
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
          {phasePanels[3]}
        </div>
      </div>

      {/* Loop Indicator */}
      <div className="flow-loop-indicator">
        <span className="loop-icon">🔄</span>
        <span className="loop-text">{t("game_flow.loop_text")}</span>
      </div>
    </div>
  );
}
