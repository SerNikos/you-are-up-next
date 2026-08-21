import React from "react";
import { useTranslation } from "react-i18next";
import "./Rules.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

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

        {/* Initial Layout & Setup */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.setup_title")}</h2>

          <div className="setup-step">
            <h3 className="rules-subtitle2">{t("rules.step1_title")}</h3>
            <p className="rules-text">{t("rules.step1_desc")}</p>
            <img
              src={step0Image}
              alt="Setup layout showing Black Market, Plot Armor, and Executioner deck"
            />
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">{t("rules.step2_title")}</h3>
            <p className="rules-text">{t("rules.step2_desc")}</p>
            <ul className="rules-bullets">
              <li>{t("rules.step2_list1")}</li>
              <li>{t("rules.step2_list2")}</li>
              <li>{t("rules.step2_list3")}</li>
              <li>{t("rules.step2_list4")}</li>
            </ul>
            <img
              src={step1Image}
              alt="Death Line layout showing Executioner, 3 Peasants, player queue, and Main Deck"
            />
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">{t("rules.step3_title")}</h3>
            <p className="rules-text">{t("rules.step3_desc")}</p>
            <ul className="rules-bullets">
              <li>{t("rules.step3_list1")}</li>
              <li>{t("rules.step3_list2")}</li>
            </ul>
            <img
              src={step2Image}
              alt="The Board layout positioned below the Death Line"
            />
          </div>
        </section>

        {/* Phase 1: Draw Phase */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.phase1_title")}</h2>
          <div className="setup-step">
            <p className="rules-text">{t("rules.phase1_desc")}</p>
            <ul className="rules-bullets">
              <li>{t("rules.phase1_list1")}</li>
              <li>{t("rules.phase1_list2")}</li>
              <li>{t("rules.phase1_list3")}</li>
            </ul>
            <img
              src={step3Image}
              alt="Draw Phase step showing Misero taking a card from the board"
            />
          </div>

          <div className="setup-step">
            <h3 className="rules-subtitle2">
              {t("rules.phase1_complete_title")}
            </h3>
            <p className="rules-text">{t("rules.phase1_complete_desc")}</p>
            <ul className="rules-bullets">
              <li>{t("rules.phase1_complete_list1")}</li>
              <li>{t("rules.phase1_complete_list2")}</li>
            </ul>
            <img
              src={step4Image}
              alt="Board after all players have drawn their card in queue order"
            />
          </div>
        </section>

        {/* Phase 2: Action Phase */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.phase2_title")}</h2>
          <div className="setup-step">
            <p className="rules-text">{t("rules.phase2_desc1")}</p>
            <p className="rules-text">{t("rules.phase2_desc2")}</p>

            <ul className="rules-bullets">
              <li>{t("rules.phase2_opt1")}</li>
              <li>
                {t("rules.phase2_opt2")}
                <br />
                <em>{t("rules.phase2_opt2_ex")}</em>
              </li>
              <li>{t("rules.phase2_opt3")}</li>
            </ul>

            <div className="rules-callout">
              <h4 className="rules-callout-title">
                {t("rules.phase2_priority_title")}
              </h4>
              <p className="rules-text">{t("rules.phase2_priority_text1")}</p>
              <p className="rules-text">{t("rules.phase2_priority_text2")}</p>
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase2_ex1_title")}
              </h4>
              <p className="rules-text">{t("rules.phase2_ex1_text")}</p>
              <img
                src={step5Image}
                alt="Showing a player playing an Action card during the Action Phase"
              />
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase2_ex2_title")}
              </h4>
              <p className="rules-text">{t("rules.phase2_ex2_text")}</p>
              <img
                src={step6Image}
                alt="Showing 3 Strength resources and 1 Holy Duck Tape card used to purchase Strength Plot Armor"
              />
            </div>
          </div>
        </section>

        {/* Phase 3: Executioner Phase */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.phase3_title")}</h2>
          <div className="setup-step">
            <p className="rules-text">{t("rules.phase3_desc")}</p>

            <ul className="rules-bullets">
              <li>{t("rules.phase3_list1")}</li>
              <li>{t("rules.phase3_list2")}</li>
              <li>{t("rules.phase3_list3")}</li>
              <li>{t("rules.phase3_list4")}</li>
            </ul>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase3_ex1_title")}
              </h4>
              <p className="rules-text">{t("rules.phase3_ex1_text")}</p>
              <img
                src={step45Image}
                alt="Executioner card reveal showing YOU ARE UP NEXT next to the Executioner discard stack"
              />
            </div>

            <div className="rules-example">
              <h4 className="rules-callout-title">
                {t("rules.phase3_ex2_title")}
              </h4>
              <p className="rules-text">{t("rules.phase3_ex2_text")}</p>
              <img
                src={img1132Image}
                alt="Character cards flipped over showing their death state illustrations"
              />
            </div>
          </div>
        </section>

        {/* Purpose of the Game */}
        <section className="rules-section">
          <h2 className="rules-title">{t("rules.purpose_title")}</h2>
          <p className="rules-text">{t("rules.purpose_text1")}</p>
          <p className="rules-text">{t("rules.purpose_text2")}</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
