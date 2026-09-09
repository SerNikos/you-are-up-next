import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import i18n from "../../i18n.js";

export default function LocaleRoute({ language, children }) {
  const { lang } = useParams();
  const { pathname } = useLocation();
  const activeLanguage = language || lang;

  useEffect(() => {
    if (activeLanguage && i18n.language !== activeLanguage) {
      i18n.changeLanguage(activeLanguage);
    }
  }, [activeLanguage]);

  return children || <Outlet key={pathname} />;
}