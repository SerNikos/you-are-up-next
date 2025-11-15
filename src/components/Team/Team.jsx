import React, { useEffect } from "react";
import "./Team.css";

import ser from "../../assets/team-photos/ser.png";
import mat from "../../assets/team-photos/mat.png";
import dold from "../../assets/team-photos/dold.png";
import kat from "../../assets/team-photos/kat.png";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

export default function Team() {
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
        <div className="team-top-title">- YAUN Team -</div>
        <div className="horizontral-line"></div>

        <div className="photos-container">
          {/* Dold */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">The game designer</div>
              <a
                className="team-name"
                href="https://www.linkedin.com/in/konstantinos-doldoukis-278768282/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konstantinos Doldoukis
              </a>
            </div>
            <img src={dold} alt="dold" />
          </div>

          {/* Sergis */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">The game designer</div>
              <a
                className="team-name"
                href="https://gr.linkedin.com/in/nikolaos-sergis"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nikolaos Sergis
              </a>
            </div>
            <img src={ser} alt="ser" />
          </div>

          {/* Mat */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">The graphic designer</div>
              <a
                className="team-name"
                href="https://www.instagram.com/mat_hazzart/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mat Eustathiou
              </a>
            </div>
            <img src={mat} alt="mat" />
          </div>

          {/* Katerina */}
          <div className="team-photo">
            <div className="team-left-info">
              <div className="team-title">The digital Marketer</div>
              <a
                className="team-name"
                href="https://www.linkedin.com/in/katerina-gkatsou-93a276237/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Katerina Gkatsou
              </a>
            </div>
            <img src={kat} alt="kat" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
