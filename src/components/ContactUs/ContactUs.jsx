import "./ContactUs.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer.jsx";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
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

    // Guard clause to lock submission if users bypass the disabled button state via Enter key
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
          alert(
            "The King thanks you for your message, we'll be in touch asap!",
          );

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
          <h2>Contact Us</h2>

          <form ref={form} onSubmit={sendEmail}>
            {/* NAME */}
            <label htmlFor="name">Name</label>
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
              {nameInvalid && <p>Name must be at least 2 characters long.</p>}
            </div>

            {/* SURNAME */}
            <label htmlFor="surname">Surname</label>
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
              {surnameInvalid && (
                <p>Surname must be at least 2 characters long.</p>
              )}
            </div>

            {/* EMAIL */}
            <label htmlFor="email">E-mail</label>
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
              {emailInvalid && <p>Please enter a valid email.</p>}
            </div>

            {/* MESSAGE */}
            <label htmlFor="message">Write us your message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formValues.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
            ></textarea>
            <div className="invalid-error">
              {messageInvalid && (
                <p>Message must be at least 5 characters long.</p>
              )}
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
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
