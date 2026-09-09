import { useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import i18n from "../../i18n.js";

export default function LocaleRoute({ language, children }) {
  const { lang } = useParams();
  const { pathname } = useLocation();
  const activeLanguage = language || lang;
  const [readyLanguage, setReadyLanguage] = useState(null);

  useLayoutEffect(() => {
    let isMounted = true;

    const setRouteLanguage = async () => {
      if (i18n.language !== activeLanguage) {
        await i18n.changeLanguage(activeLanguage);
      }

      if (isMounted) {
        setReadyLanguage(activeLanguage);
      }
    };

    setRouteLanguage();

    return () => {
      isMounted = false;
    };
  }, [activeLanguage]);

  if (readyLanguage !== activeLanguage || i18n.language !== activeLanguage) {
    return null;
  }

  return children || <Outlet key={pathname} />;
}