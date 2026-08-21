import React, { useEffect } from "react";
import "./Team.css";
import { useTranslation } from "react-i18next";

import ser from "../../assets/team-photos/ser.png";
import mat from "../../assets/team-photos/mat.png";
import dold from "../../assets/team-photos/dold.png";
import kat from "../../assets/team-photos/kat.png";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

export default function Team() {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    });

    const photos = document.querySelectorAll(".team-photo");
    photos.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="team-container">
        <div className="team-top-title">{t("team.page_title")}</div>
        <div className="horizontral-line"></div>

        <div className="photos-container">
          {/* Dold */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">{t("team.dold_role")}</div>
              <a
                className="team-name"
                href="https://www.linkedin.com/in/konstantinos-doldoukis-278768282/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("team.dold_name")}
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/konstantinos-doldoukis-278768282/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={dold} alt="dold" />
            </a>
          </div>

          {/* Sergis */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">{t("team.sergis_role")}</div>
              <a
                className="team-name"
                href="https://gr.linkedin.com/in/nikolaos-sergis"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("team.sergis_name")}
              </a>
            </div>
            <a
              href="https://gr.linkedin.com/in/nikolaos-sergis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ser} alt="ser" />
            </a>
          </div>

          {/* Mat */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">{t("team.mat_role")}</div>
              <a
                className="team-name"
                href="https://www.instagram.com/getting_batty/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("team.mat_name")}
              </a>
            </div>
            <a
              href="https://www.instagram.com/getting_batty/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mat} alt="mat" />
            </a>
          </div>

          {/* Katerina */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">{t("team.kat_role")}</div>
              <a
                className="team-name"
                href="https://www.linkedin.com/in/katerina-gkatsou-93a276237/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("team.kat_name")}
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/katerina-gkatsou-93a276237/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kat} alt="kat" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
