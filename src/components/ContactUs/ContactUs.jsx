import "./ContactUs.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer.jsx";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

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

  // ---------- VALIDATION ----------
  const nameInvalid = didEdit.name && formValues.name.trim().length < 2;

  const surnameInvalid =
    didEdit.surname && formValues.surname.trim().length < 2;

  const emailInvalid =
    didEdit.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim());

  const messageInvalid =
    didEdit.message && formValues.message.trim().length < 5;

  // Basic check to see if fields are empty to handle proper disabled states
  const isFormEmpty =
    !formValues.name.trim() ||
    !formValues.surname.trim() ||
    !formValues.email.trim() ||
    !formValues.message.trim();

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
  }

  function handleBlur(identifier) {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  // --------EMAILJS SERVICE--------
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      nameInvalid ||
      surnameInvalid ||
      emailInvalid ||
      messageInvalid ||
      isFormEmpty
    ) {
      return;
    }

    emailjs
      .sendForm("service_3m724yx", "template_ey7p0c9", form.current, {
        publicKey: "zMXdAVQUMDWNFxPBj",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert(t("contact.alert_success"));

          // Reset fields safely
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
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <div>
      <Navbar />

      <div className="contact-us-container">
        <div className="contact-us">
          <h2>{t("contact.title")}</h2>

          <form ref={form} onSubmit={sendEmail}>
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
            ></textarea>
            <div className="invalid-error">
              {messageInvalid && <p>{t("contact.errors.message")}</p>}
            </div>

            <button
              type="submit"
              disabled={
                nameInvalid ||
                surnameInvalid ||
                emailInvalid ||
                messageInvalid ||
                isFormEmpty
              }
            >
              {t("contact.button")}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
