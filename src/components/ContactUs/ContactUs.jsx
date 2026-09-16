import "./ContactUs.css";
import Navbar from "../NavBar/Navbar";
import SEO from "../SEO/SEO";
import Footer from "../Footer/Footer.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MAX_NAME_LENGTH = 80;
const MAX_SURNAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

export default function ContactUs() {
  const { t } = useTranslation();

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const [didEdit, setDidEdit] = useState({
    name: false,
    surname: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ---------- VALIDATION ----------
  const nameValueInvalid =
    formValues.name.trim().length < 2 ||
    formValues.name.trim().length > MAX_NAME_LENGTH;
  const nameInvalid = didEdit.name && nameValueInvalid;

  const surnameValueInvalid =
    formValues.surname.trim().length < 2 ||
    formValues.surname.trim().length > MAX_SURNAME_LENGTH;
  const surnameInvalid = didEdit.surname && surnameValueInvalid;

  const emailValueInvalid =
    formValues.email.trim().length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(formValues.email.trim());
  const emailInvalid = didEdit.email && emailValueInvalid;

  const messageValueInvalid =
    formValues.message.trim().length < 5 ||
    formValues.message.trim().length > MAX_MESSAGE_LENGTH;
  const messageInvalid = didEdit.message && messageValueInvalid;

  // Basic check to see if fields are empty to handle proper disabled states
  const isFormEmpty =
    !formValues.name.trim() ||
    !formValues.surname.trim() ||
    !formValues.email.trim() ||
    !formValues.message.trim();

  const isFormInvalid =
    nameValueInvalid ||
    surnameValueInvalid ||
    emailValueInvalid ||
    messageValueInvalid;

  // ---------- INPUT HANDLERS ----------
  function handleInputChange(identifier, value) {
    setFormValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));

    setDidEdit((prev) => ({
      ...prev,
      [identifier]: false,
    }));
    setSubmitError("");
  }

  function handleBlur(identifier) {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  const sendEmail = async (e) => {
    e.preventDefault();

    if (isFormInvalid || isFormEmpty || isSubmitting) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const website = formData.get("website");
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formValues.name.trim(),
          surname: formValues.surname.trim(),
          email: formValues.email.trim(),
          message: formValues.message.trim(),
          website: typeof website === "string" ? website : "",
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || t("contact.alert_error"));
      }

      alert(t("contact.alert_success"));
      setFormValues({
        name: "",
        surname: "",
        email: "",
        message: "",
      });
      setDidEdit({
        name: false,
        surname: false,
        email: false,
        message: false,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : t("contact.alert_error"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SEO />
      <Navbar />

      <div className="contact-us-container">
        <div className="contact-us">
          <h1>{t("contact.title")}</h1>

          <form onSubmit={sendEmail} aria-busy={isSubmitting}>
            {/* NAME */}
            <label htmlFor="name">{t("contact.labels.name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              autoComplete="given-name"
              maxLength={MAX_NAME_LENGTH}
              required
            />
            <div className="invalid-error">
              {nameInvalid && <p>{t("contact.errors.name")}</p>}
            </div>

            {/* SURNAME */}
            <label htmlFor="surname">{t("contact.labels.surname")}</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formValues.surname}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              onBlur={() => handleBlur("surname")}
              autoComplete="family-name"
              maxLength={MAX_SURNAME_LENGTH}
              required
            />
            <div className="invalid-error">
              {surnameInvalid && <p>{t("contact.errors.surname")}</p>}
            </div>

            {/* EMAIL */}
            <label htmlFor="email">{t("contact.labels.email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              autoComplete="email"
              maxLength={MAX_EMAIL_LENGTH}
              required
            />
            <div className="invalid-error">
              {emailInvalid && <p>{t("contact.errors.email")}</p>}
            </div>

            {/* MESSAGE */}
            <label htmlFor="message">{t("contact.labels.message")}</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formValues.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              maxLength={MAX_MESSAGE_LENGTH}
              required
            ></textarea>
            <div className="invalid-error">
              {messageInvalid && <p>{t("contact.errors.message")}</p>}
            </div>

            <div className="contact-honeypot" inert>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={isFormInvalid || isFormEmpty || isSubmitting}
            >
              {isSubmitting ? t("contact.sending") : t("contact.button")}
            </button>
            {submitError && (
              <p className="contact-submit-error" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
