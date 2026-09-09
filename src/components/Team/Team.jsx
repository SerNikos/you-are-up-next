import React, { useEffect } from "react";
import "./Team.css";
import { useTranslation } from "react-i18next";

import ser from "../../assets/team-photos/ser.png";
import mat from "../../assets/team-photos/mat.png";
import dold from "../../assets/team-photos/dold.png";
import kat from "../../assets/team-photos/kat.png";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import LoadingImage from "../LoadingImage/LoadingImage";
import SEO from "../SEO/SEO";

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
      <SEO />
      <Navbar />

      <main className="team-container">
        <h1 className="team-top-title">{t("team.page_title")}</h1>
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
              <LoadingImage src={dold} alt={t("team.dold_name")} />
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
              <LoadingImage src={ser} alt={t("team.sergis_name")} />
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
              <LoadingImage src={mat} alt={t("team.mat_name")} />
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
              <LoadingImage src={kat} alt={t("team.kat_name")} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
