import React from "react";
import { useTranslation } from "react-i18next";
import "./Rules.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import GameFlow from "../GameFlow/GameFlow";

// Asset Imports
import step0Image from "../../assets/rules-photos/0 step.png";
import step1Image from "../../assets/rules-photos/1 step.png";
import step2Image from "../../assets/rules-photos/2 step.png";
import step3Image from "../../assets/rules-photos/3 step.JPG";
import step4Image from "../../assets/rules-photos/4 step.JPG";
import step5Image from "../../assets/rules-photos/5 step.JPG";
import step6Image from "../../assets/rules-photos/6 step.JPG";
import step45Image from "../../assets/rules-photos/4.5 step.png";
import img1132Image from "../../assets/rules-photos/IMG_1132.JPG";

// New Component Asset Imports
import resourcesAllImg from "../../assets/rules-photos/ResourcesAll.png";
import actionCardsAllImg from "../../assets/rules-photos/ActionCardsAll.png";
import dBackImg from "../../assets/rules-photos/D BACK.jpg";
import wImg from "../../assets/rules-photos/W.jpg";
import iBackImg from "../../assets/rules-photos/I BACK.jpg";
import sImg from "../../assets/rules-photos/S.jpg";
import plotArmorAllImg from "../../assets/rules-photos/PlotArmorAll.png";
import executionersDeckAllImg from "../../assets/rules-photos/ExecutionersDeckAll.png";
import blackMarketAllImg from "../../assets/rules-photos/BlackMarketAll.png";

export default function Rules() {
  const { t } = useTranslation();

  return (
    <div className="the-container">
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
            <img
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
            <img
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
            <img
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
            <img
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
            <img
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
              <img
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
              <img
                src={step1Image}
                alt="Death Line layout showing Executioner, 3 Peasants, player queue, and Main Deck"
                className="rules-img"
              />
            </div>
          </div>

          {/* Player Count Deck Adjustments Section */}
          <p
            className="rules-text"
            dangerouslySetInnerHTML={{ __html: t("rules.adjustments_desc") }}
          />
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
              <img
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
                dangerouslySetInnerHTML={{ __html: t("rules.phase1_list2") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("rules.phase1_list3") }}
              />
            </ul>
            <div className="image-progress-wrapper">
              <img
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
            <ul className="rules-bullets">
              <li
                dangerouslySetInnerHTML={{
                  __html: t("rules.phase1_complete_list1"),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t("rules.phase1_complete_list2"),
                }}
              />
            </ul>
            <div className="image-progress-wrapper">
              <img
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
            <p
              className="rules-text"
              dangerouslySetInnerHTML={{ __html: t("rules.phase2_desc2") }}
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
                <img
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
                <img
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
                <img
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
                <img
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
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">BM</span>
              <div className="glossary-content">
                <strong>Black Market</strong>
              </div>
            </div>
            <div className="glossary-item">
              <span className="glossary-badge">PA</span>
              <div className="glossary-content">
                <strong>Plot Armor</strong>
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
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
