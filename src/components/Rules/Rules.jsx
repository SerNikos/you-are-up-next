import React from "react";
import { useTranslation } from "react-i18next";
import "./Rules.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import GameFlow from "../GameFlow/GameFlow";
import LoadingImage from "../LoadingImage/LoadingImage";
import SEO from "../SEO/SEO";

// Asset Imports
import step0Image from "../../assets/rules-photos/setup-initial-layout.png";
import step1Image from "../../assets/rules-photos/setup-death-line.png";
import step2Image from "../../assets/rules-photos/setup-board-layout.png";
import step3Image from "../../assets/rules-photos/draw-phase.png";
import step4Image from "../../assets/rules-photos/draw-phase-complete.png";
import step5Image from "../../assets/rules-photos/action-phase-action-card.jpg";
import step6Image from "../../assets/rules-photos/action-phase-purchase.png";
import step45Image from "../../assets/rules-photos/executioner-phase-reveal.png";
import img1132Image from "../../assets/rules-photos/executioner-phase-dead-characters.jpg";

// New Component Asset Imports
import resourcesAllImg from "../../assets/rules-photos/resources-all.png";
import actionCardsAllImg from "../../assets/rules-photos/action-cards-all.png";
import plotArmorAllImg from "../../assets/rules-photos/plot-armor-all.png";
import executionersDeckAllImg from "../../assets/rules-photos/executioner-deck-all.png";
import blackMarketAllImg from "../../assets/rules-photos/black-market-all.png";

export default function Rules() {
  const { t } = useTranslation();

  return (
    <div className="the-container">
      <SEO />
      <Navbar />
      <div className="rules-container">
        <header className="rules-header">
          <h1 className="rules-main-title">{t("rules.header_title")}</h1>
          <p className="rules-subtitle">{t("rules.header_subtitle")}</p>
        </header>

        {/* --- GAME COMPONENTS SECTION --- */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.components.title")}</h2>
          <p className="rules-text">{t("rules.components.subtitle")}</p>

          {/* 1. Plot Armor Cards */}
          <h3 className="rules-subtitle2">
            {t("rules.components.plot_armor_card_title")}
          </h3>
          <p className="rules-text">
            {t("rules.components.plot_armor_card_desc")}
          </p>
          <div className="image-progress-wrapper">
            <LoadingImage
              src={plotArmorAllImg}
              alt="Plot Armor Cards"
              className="rules-img"
            />
          </div>

          {/* 2. Executioner's Deck */}
          <h3 className="rules-subtitle2">
            {t("rules.components.executioner_card_title")}
          </h3>
          <p className="rules-text">
            {t("rules.components.executioner_card_desc")}
          </p>
          <div className="image-progress-wrapper">
            <LoadingImage
              src={executionersDeckAllImg}
              alt="Executioner's Deck Cards"
              className="rules-img"
              style={{ maxHeight: "300px" }}
            />
          </div>

          {/* 3. Black Market Cards (Νέα Προσθήκη) */}
          <h3 className="rules-subtitle2">
            {t("rules.components.black_market_card_title")}
          </h3>
          <p className="rules-text">
            {t("rules.components.black_market_card_desc")}
          </p>
          <div className="image-progress-wrapper">
            <LoadingImage
              src={blackMarketAllImg}
              alt="Black Market Cards"
              className="rules-img"
            />
          </div>

          {/* 4. Resource Cards Sub-section */}
          <h3 className="rules-subtitle2">
            {t("rules.components.res_card_title")}
          </h3>
          <p className="rules-text">{t("rules.components.res_card_desc")}</p>
          <div className="image-progress-wrapper">
            <LoadingImage
              src={resourcesAllImg}
              alt="Resource Cards"
              className="rules-img"
            />
          </div>

          {/* 5. Action Cards Sub-section */}
          <h3 className="rules-subtitle2">
            {t("rules.components.action_card_title")}
          </h3>
          <p className="rules-text">{t("rules.components.action_card_desc")}</p>
          <div className="image-progress-wrapper">
            <LoadingImage
              src={actionCardsAllImg}
              alt="Action Cards"
              className="rules-img"
            />
          </div>

          {/* 6. Deck Mixing Callout */}
          <div className="rules-callout rules-mt-30">
            <p
              className="rules-text"
              style={{ margin: 0 }}
              dangerouslySetInnerHTML={{
                __html: t("rules.components.deck_mixing_desc"),
              }}
            />
          </div>
        </section>

        {/* Initial Layout & Setup */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.setup_title")}</h2>

          <div className="setup-step">
            <h3 className="rules-subtitle2">{t("rules.step1_title")}</h3>
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.step1_desc") }}
            />
            <div className="image-progress-wrapper">
              <LoadingImage
                src={step0Image}
                alt="Setup layout showing Black Market, Plot Armor, and Executioner deck"
                className="rules-img"
              />
            </div>
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">{t("rules.step2_title")}</h3>
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.step2_desc") }}
            />
            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.step2_list1") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.step2_list2") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.step2_list3") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.step2_list4") }}
              />
              {t("rules.step2_list5") && (
                <li
                  dangerouslySetInnerHTML={{ __html: t("rules.step2_list5") }}
                />
              )}
            </ul>
            <div className="image-progress-wrapper">
              <LoadingImage
                src={step1Image}
                alt="Death Line layout showing Executioner, 3 Peasants, player queue, and Main Deck"
                className="rules-img"
              />
            </div>
          </div>

          {/* Player Count Deck Adjustments Section */}

          <div className="rules-callout">
            <h4 className="rules-callout-title">
              {t("rules.adjustments_2p_title")}
            </h4>
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{
                __html: t("rules.adjustments_2p_intro"),
              }}
            />
            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{
                  __html: t("rules.adjustments_2p_item1"),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t("rules.adjustments_2p_item2"),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t("rules.adjustments_2p_item3"),
                }}
              />
            </ul>
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">{t("rules.step3_title")}</h3>
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.step3_desc") }}
            />
            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.step3_list1") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.step3_list2") }}
              />
              {t("rules.step4_list3") && (
                <li
                  dangerouslySetInnerHTML={{ __html: t("rules.step4_list3") }}
                />
              )}
            </ul>
            <div className="image-progress-wrapper">
              <LoadingImage
                src={step2Image}
                alt="The Board layout positioned below the Death Line"
                className="rules-img"
              />
            </div>
          </div>
        </section>
        {/* Game Flow Component */}
        <GameFlow />
        {/* Phase 1: Draw Phase with id */}
        <section className="rules-section" id="phase1-section">
          <h2 className="rules-title">{t("rules.phase1_title")}</h2>
          <div className="setup-step">
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.phase1_desc") }}
            />
            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase1_list1") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase1_list3") }}
              />
            </ul>
            <div className="image-progress-wrapper">
              <LoadingImage
                src={step3Image}
                alt="Draw Phase step showing Misero taking a card from the board"
                className="rules-img"
              />
            </div>
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">
              {t("rules.phase1_complete_title")}
            </h3>
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{
                __html: t("rules.phase1_complete_desc"),
              }}
            />
            <div className="rules-callout">
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{
                  __html: t("rules.phase1_complete_list1"),
                }}
              />
            </div>
            <div className="image-progress-wrapper">
              <LoadingImage
                src={step4Image}
                alt="Board after all players have drawn their card in queue order"
                className="rules-img"
              />
            </div>
          </div>
        </section>
        {/* Phase 2: Action Phase with id */}
        <section className="rules-section" id="phase2-section">
          <h2 className="rules-title">{t("rules.phase2_title")}</h2>
          <div className="setup-step">
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.phase2_desc1") }}
            />
            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase2_opt1") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase2_opt2") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase2_opt3") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase2_opt4") }}
              />
            </ul>

            <div className="rules-callout">
              <h4 className="rules-callout-title">
                {t("rules.phase2_priority_title")}
              </h4>
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{
                  __html: t("rules.phase2_priority_text1"),
                }}
              />
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{
                  __html: t("rules.phase2_priority_text2"),
                }}
              />
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase2_ex1_title")}
              </h4>
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{ __html: t("rules.phase2_ex1_text") }}
              />
              <div className="image-progress-wrapper">
                <LoadingImage
                  src={step5Image}
                  alt="Showing a player playing an Action card during the Action Phase"
                  className="rules-img"
                />
              </div>
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase2_ex2_title")}
              </h4>
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{ __html: t("rules.phase2_ex2_text") }}
              />
              <div className="image-progress-wrapper">
                <LoadingImage
                  src={step6Image}
                  alt="Showing 3 Strength resources and 1 Holy Duck Tape card used to purchase Strength Plot Armor"
                  className="rules-img"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Phase 3: Executioner Phase with id */}
        <section className="rules-section" id="phase3-section">
          <h2 className="rules-title">{t("rules.phase3_title")}</h2>
          <div className="setup-step">
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.phase3_desc") }}
            />

            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_list1") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_list2") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_list3") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_list4") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_list5") }}
              />
            </ul>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase3_ex1_title")}
              </h4>
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_ex1_text") }}
              />
              <div className="image-progress-wrapper">
                <LoadingImage
                  src={step45Image}
                  alt="Executioner card reveal showing YOU ARE UP NEXT next to the Executioner discard stack"
                  className="rules-img"
                />
              </div>
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase3_ex2_title")}
              </h4>
              <p
                className="rules-text"
                dangerouslySetInnerHTML={{ __html: t("rules.phase3_ex2_text") }}
              />
              <div className="image-progress-wrapper">
                <LoadingImage
                  src={img1132Image}
                  alt="Character cards flipped over showing their death state illustrations"
                  className="rules-img"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Purpose of the Game / Win State with id */}
        <section className="rules-section" id="purpose-section">
          <h2 className="rules-title">{t("rules.purpose_title")}</h2>
          <p
            className="rules-text"
            dangerouslySetInnerHTML={{ __html: t("rules.purpose_text1") }}
          />
          <p
            className="rules-text"
            dangerouslySetInnerHTML={{ __html: t("rules.purpose_text2") }}
          />
        </section>
        {/* Glossary of Terms / Λεξικό Όρων */}
        <section className="rules-section glossary-section">
          <h2 className="rules-title">{t("glossary.title")}</h2>
          <div className="glossary-grid">
            <div className="glossary-item">
              <span className="glossary-badge">MD</span>
              <div className="glossary-content">
                <strong>Main Deck</strong>
                <span>{t("glossary.md_desc")}</span>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">BM</span>
              <div className="glossary-content">
                <strong>Black Market</strong>
                <span>{t("glossary.bm_desc")}</span>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">PA</span>
              <div className="glossary-content">
                <strong>Plot Armor</strong>
                <span>{t("glossary.pa_desc")}</span>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">DP</span>
              <div className="glossary-content">
                <strong>Discard Pile</strong>
                <span>{t("glossary.dp_desc")}</span>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">RM</span>
              <div className="glossary-content">
                <strong>Remove</strong>
                <span>{t("glossary.remove_desc")}</span>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">ST</span>
              <div className="glossary-content">
                <strong>Steal</strong>
                <span>{t("glossary.steal_desc")}</span>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">YU</span>
              <div className="glossary-content">
                <strong>YOU ARE UP NEXT</strong>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("glossary.yuan_desc"),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
