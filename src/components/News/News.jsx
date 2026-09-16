import "./News.css";
import { useTranslation } from "react-i18next";
import Navbar from "../NavBar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import SEO from "../SEO/SEO.jsx";
import DailyFact from "../DailyFact/DailyFact.jsx";

export default function News() {
  const { t } = useTranslation();
  const latestItems = t("news.latest_items", { returnObjects: true });
  const newsItems = Array.isArray(latestItems) ? latestItems : [];

  return (
    <div className="news-layout">
      <SEO />
      <Navbar />

      <main className="news-page" aria-labelledby="news-latest-title">
        <section className="news-latest">
          <h1 id="news-latest-title">{t("news.latest_title")}</h1>
          <ul className="news-latest-list">
            {newsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <DailyFact />
      </main>

      <Footer />
    </div>
  );
}