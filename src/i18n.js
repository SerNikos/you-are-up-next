import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en.json";
import translationEL from "./locales/el.json";

const resources = {
  en: { translation: translationEN },
  el: { translation: translationEL },
};

i18n
  .use(LanguageDetector) // Αποθηκεύει τη γλωσσική προτίμηση στο localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
