import english from "./src/locales/en.json";
import greek from "./src/locales/el.json";

const routes = [
  "/",
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

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, "");
}

function getPage(pathname) {
  return pathname.split("/").filter(Boolean)[1] || "home";
}

function getLocalizedPath(pathname, language) {
  const routePath = pathname.replace(/^\/(en|el)(?=\/|$)/, "") || "/";
  return `/${language}${routePath === "/" ? "" : routePath}`;
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

  let pageContent = `<h2>${escapeHtml(pageHeading)}</h2><p>${escapeHtml(
    description,
  )}</p>`;

  if (page === "home") {
    pageContent = `
      <h2>${escapeHtml(translations.home.title)}</h2>
      <p>${escapeHtml(translations.home.seo_description)}</p>
      <h2>${escapeHtml(translations.faq.title)}</h2>
      <p>${escapeHtml(translations.faq.description)}</p>
    `;
  } else if (page === "characters") {
    pageContent = Object.values(translations.characters)
      .map(
        (character) => `
          <section>
            <h2>${escapeHtml(character.name)}</h2>
            <p>${escapeHtml(stripHtml(character.description))}</p>
          </section>
        `,
      )
      .join("");
  } else if (page === "rules") {
    pageContent = `
      <h2>${escapeHtml(translations.rules.header_title)}</h2>
      <p>${escapeHtml(translations.rules.header_subtitle)}</p>
      <h2>${escapeHtml(translations.rules.components.title)}</h2>
      <p>${escapeHtml(translations.rules.components.subtitle)}</p>
      <h2>${escapeHtml(translations.rules.purpose_title)}</h2>
      <p>${escapeHtml(stripHtml(translations.rules.purpose_text1))}</p>
      <p>${escapeHtml(stripHtml(translations.rules.purpose_text2))}</p>
    `;
  } else if (page === "team") {
    pageContent = ["dold", "sergis", "mat", "kat"]
      .map(
        (member) => `
          <section>
            <h2>${escapeHtml(translations.team[`${member}_name`])}</h2>
            <p>${escapeHtml(translations.team[`${member}_role`])}</p>
          </section>
        `,
      )
      .join("");
  } else if (page === "contact") {
    pageContent = `
      <h2>${escapeHtml(translations.contact.title)}</h2>
      <p>${escapeHtml(description)}</p>
      <p>${escapeHtml(translations.contact.button)}</p>
    `;
  }

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
      ${pageContent}
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
  const canonicalPath = getLocalizedPath(pathname, language);
  const canonical = `https://www.youareupnext.gr${canonicalPath}`;
  const englishUrl = `https://www.youareupnext.gr${getLocalizedPath(pathname, "en")}`;
  const greekUrl = `https://www.youareupnext.gr${getLocalizedPath(pathname, "el")}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.youareupnext.gr/#website",
        "url": "https://www.youareupnext.gr",
        "name": "You Are Up Next",
        "inLanguage": language,
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": description,
        "inLanguage": language,
        "isPartOf": { "@id": "https://www.youareupnext.gr/#website" },
        "about": { "@id": "https://www.youareupnext.gr/#game" },
      },
      {
        "@type": "BoardGame",
        "@id": "https://www.youareupnext.gr/#game",
        "name": "You Are Up Next",
        "url": englishUrl,
        "description": translations.meta.homeDescription,
        "image": "https://www.youareupnext.gr/social-share.png",
        "genre": ["Strategy", "Card game", "Medieval game"],
        "isPartOf": { "@id": "https://www.youareupnext.gr/#website" },
      },
    ],
  };

  return {
    html: getContent(pathname, language),
    links: new Set(routes),
    head: {
      lang: language,
      title,
      elements: new Set([
        { type: "meta", props: { name: "description", content: description } },
        { type: "meta", props: { name: "robots", content: "index, follow" } },
        { type: "meta", props: { property: "og:type", content: "website" } },
        { type: "meta", props: { property: "og:site_name", content: "You Are Up Next" } },
        { type: "meta", props: { property: "og:locale", content: language === "el" ? "el_GR" : "en_US" } },
        { type: "meta", props: { property: "og:title", content: title } },
        {
          type: "meta",
          props: { property: "og:description", content: description },
        },
        { type: "meta", props: { property: "og:image", content: "https://www.youareupnext.gr/social-share.png" } },
        { type: "meta", props: { property: "og:image:width", content: "1200" } },
        { type: "meta", props: { property: "og:image:height", content: "630" } },
        { type: "meta", props: { property: "og:image:type", content: "image/png" } },
        { type: "meta", props: { property: "og:url", content: canonical } },
        { type: "meta", props: { name: "twitter:card", content: "summary_large_image" } },
        { type: "meta", props: { name: "twitter:title", content: title } },
        { type: "meta", props: { name: "twitter:description", content: description } },
        { type: "meta", props: { name: "twitter:image", content: "https://www.youareupnext.gr/social-share.png" } },
        { type: "link", props: { rel: "canonical", href: canonical } },
        {
          type: "link",
          props: { rel: "alternate", hrefLang: "en", href: englishUrl },
        },
        {
          type: "link",
          props: { rel: "alternate", hrefLang: "el", href: greekUrl },
        },
        {
          type: "link",
          props: {
            rel: "alternate",
            hrefLang: "x-default",
            href: englishUrl,
          },
        },
        {
          type: "script",
          props: {
            type: "application/ld+json",
            children: JSON.stringify(structuredData),
          },
        },
      ]),
    },
  };
}
