import english from "./src/locales/en.json";
import greek from "./src/locales/el.json";

const routes = [
  "/en",
  "/en/characters",
  "/en/rules",
  "/en/team",
  "/en/contact",
  "/el",
  "/el/characters",
  "/el/rules",
  "/el/team",
  "/el/contact",
];

const pageNames = {
  en: {
    characters: "Characters and Lore",
    rules: "Game Rules",
    team: "The Team",
    contact: "Contact You Are Up Next",
    home: "Frequently Asked Questions",
  },
  el: {
    characters: "Χαρακτήρες και Ιστορία",
    rules: "Κανόνες Παιχνιδιού",
    team: "Η Ομάδα",
    contact: "Επικοινωνία με το ΕΙΣΑΙ Ο ΕΠΟΜΕΝΟΣ",
    home: "Συχνές Ερωτήσεις",
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getPage(pathname) {
  return pathname.split("/").filter(Boolean)[1] || "home";
}

function getContent(pathname, language) {
  const translations = language === "el" ? greek : english;
  const page = getPage(pathname);
  const titleKey = page === "home" ? "homeTitle" : `${page}Title`;
  const descriptionKey =
    page === "home" ? "homeDescription" : `${page}Description`;
  const title = translations.meta[titleKey] || translations.meta.homeTitle;
  const description =
    translations.meta[descriptionKey] || translations.meta.homeDescription;
  const pageHeading = pageNames[language][page] || pageNames[language].home;
  const homePath = language === "el" ? "/el" : "/en";

  return `
    <main aria-label="${escapeHtml(title)}">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
      <nav aria-label="${language === "el" ? "Κύρια πλοήγηση" : "Main navigation"}">
        <a href="${homePath}">${language === "el" ? "Αρχική" : "Home"}</a>
        <a href="${homePath}/characters">${pageNames[language].characters}</a>
        <a href="${homePath}/rules">${pageNames[language].rules}</a>
        <a href="${homePath}/team">${pageNames[language].team}</a>
        <a href="${homePath}/contact">${pageNames[language].contact}</a>
      </nav>
      <h2>${pageHeading}</h2>
      <p>${escapeHtml(description)}</p>
    </main>
  `;
}

export async function prerender({ url }) {
  const pathname = new URL(url, "https://www.youareupnext.gr").pathname;
  const language = pathname.startsWith("/el") ? "el" : "en";
  const translations = language === "el" ? greek : english;
  const page = getPage(pathname);
  const titleKey = page === "home" ? "homeTitle" : `${page}Title`;
  const descriptionKey =
    page === "home" ? "homeDescription" : `${page}Description`;
  const title = translations.meta[titleKey] || translations.meta.homeTitle;
  const description =
    translations.meta[descriptionKey] || translations.meta.homeDescription;
  const canonical = `https://www.youareupnext.gr${pathname}`;
  const alternatePath = pathname.replace(
    /^\/(en|el)/,
    language === "en" ? "/el" : "/en",
  );

  return {
    html: getContent(pathname, language),
    links: new Set(routes),
    head: {
      lang: language,
      title,
      elements: new Set([
        { type: "meta", props: { name: "description", content: description } },
        { type: "meta", props: { property: "og:title", content: title } },
        {
          type: "meta",
          props: { property: "og:description", content: description },
        },
        { type: "meta", props: { property: "og:url", content: canonical } },
        { type: "link", props: { rel: "canonical", href: canonical } },
        {
          type: "link",
          props: { rel: "alternate", hrefLang: language, href: canonical },
        },
        {
          type: "link",
          props: {
            rel: "alternate",
            hrefLang: language === "en" ? "el" : "en",
            href: `https://www.youareupnext.gr${alternatePath}`,
          },
        },
      ]),
    },
  };
}
