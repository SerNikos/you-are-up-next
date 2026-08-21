import "./Footer.css";
import { useTranslation, Trans } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <p>
        © {new Date().getFullYear()} {t("footer.rights")}
      </p>
    </div>
  );
}
