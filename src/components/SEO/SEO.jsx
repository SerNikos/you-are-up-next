import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  getLanguageFromPath,
  getLocalizedPath,
} from "../../utils/localePath.js";

const SITE_URL = "https://www.youareupnext.gr";
const DEFAULT_IMAGE = `${SITE_URL}/tablogo.png`;

const pageMetadata = {
  "/": {
    titleKey: "meta.homeTitle",
    descriptionKey: "meta.homeDescription",
  },
  "/AllCharactersLore": {
    titleKey: "meta.charactersTitle",
    descriptionKey: "meta.charactersDescription",
  },
  "/Rules": {
    titleKey: "meta.rulesTitle",
    descriptionKey: "meta.rulesDescription",
  },
  "/Team": {
    titleKey: "meta.teamTitle",
    descriptionKey: "meta.teamDescription",
  },
  "/ContactUs": {
    titleKey: "meta.contactTitle",
    descriptionKey: "meta.contactDescription",
  },
};

const routeAliases = {
  "/en": "/",
  "/el": "/",
  "/en/characters": "/AllCharactersLore",
  "/el/characters": "/AllCharactersLore",
  "/en/rules": "/Rules",
  "/el/rules": "/Rules",
  "/en/team": "/Team",
  "/el/team": "/Team",
  "/en/contact": "/ContactUs",
  "/el/contact": "/ContactUs",
};

export default function SEO({ noindex = false }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const metadata = pageMetadata[
    routeAliases[normalizedPath] || normalizedPath
  ] || {
    titleKey: "meta.notFoundTitle",
    descriptionKey: "meta.notFoundDescription",
  };
  const title = t(metadata.titleKey);
  const description = t(metadata.descriptionKey);
  const locale = i18n.language?.startsWith("el") ? "el_GR" : "en_US";
  const language =
    getLanguageFromPath(normalizedPath) || (locale === "el_GR" ? "el" : "en");
  const routePath = routeAliases[normalizedPath] || normalizedPath;
  const canonicalPath = getLanguageFromPath(normalizedPath)
    ? normalizedPath
    : getLocalizedPath(routePath, "en");
  const canonical = `${SITE_URL}${canonicalPath}`;
  const englishUrl = `${SITE_URL}${getLocalizedPath(routePath, "en")}`;
  const greekUrl = `${SITE_URL}${getLocalizedPath(routePath, "el")}`;
  const pageUrl = canonical;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "You Are Up Next",
        inLanguage: language,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#game` },
      },
      {
        "@type": "BoardGame",
        "@id": `${SITE_URL}/#game`,
        name: "You Are Up Next",
        url: englishUrl,
        description: t("meta.homeDescription"),
        image: DEFAULT_IMAGE,
        genre: ["Strategy", "Card game", "Medieval game"],
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="el" href={greekUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="You Are Up Next" />
      <meta property="og:locale" content={locale} />
      <meta
        property="og:locale:alternate"
        content={locale === "el_GR" ? "en_US" : "el_GR"}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
