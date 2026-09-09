import React, { useState } from "react";
import "./Accordion.css";
import { useTranslation } from "react-i18next";

export const Accordion = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected(selected === index ? null : index);
  };

  const data = [
    {
      question: t("faq.questions.q1"),
      answer: t("faq.questions.a1"),
    },
    {
      question: t("faq.questions.q2"),
      answer: t("faq.questions.a2"),
    },
    {
      question: t("faq.questions.q3"),
      answer: t("faq.questions.a3"),
    },
    {
      question: t("faq.questions.q4"),
      answer: (
        <>
          {t("faq.questions.a4_part1")}
          <a
            href="https://www.instagram.com/yaun_game"
            target="_blank"
            rel="noopener noreferrer"
            className="accordion-span"
          >
            {t("faq.questions.a4_link")}
          </a>
          {t("faq.questions.a4_part2")}
        </>
      ),
    },
  ];

  return (
    <div className="accordion-container">
      <div className="accordion">
        <h2 className="accordion-title">{t("faq.title")}</h2>
        <p className="accordion-description">{t("faq.description")}</p>
        <ul>
          {data.map((faq, index) => (
            <li key={index} className="accordion-item">
              <button
                type="button"
                className="accordion-question"
                onClick={() => toggle(index)}
                aria-expanded={selected === index}
                aria-controls={`faq-answer-${index}`}
              >
                {faq.question}
                <span className="expand-symbol">
                  {selected === index ? "-" : "+"}
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`accordion-answer ${
                  selected === index ? "open" : ""
                }`}
                role="region"
                aria-hidden={selected !== index}
              >
                {faq.answer}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
