import React, { useState } from "react";
import "./Accordion.css";

const data = [
  {
    question: "What is YAUN?",
    answer:
      "YAUN is a self-published physical board game funded on Kickstarter.",
  },
  {
    question: "In what period of time does it take place?",
    answer: "YAUN takes place in the medieval times.",
  },
  {
    question: "How can I buy it?",
    answer:
      "For now, send us a message from our Contact Us page and we'll let you know if we can send it to you",
  },
  {
    question: "Do you have other social media?",
    answer: (
      <>
        Yes, of course! Follow us on Instagram{" "}
        <a
          href="https://www.instagram.com/yaun_game"
          target="_blank"
          rel="noopener noreferrer"
          className="accordion-span"
        >
          click here
        </a>
        .
      </>
    ),
  },
];

export const Accordion = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <div className="accordion">
        <h1 className="accordion-title">FAQs</h1>
        <h2 className="accordion-description">
          Here are some of the most frequently asked questions about YAUN.
        </h2>
        <ul>
          {data.map((faq, index) => (
            <li key={index} className="accordion-item">
              <div className="accordion-question" onClick={() => toggle(index)}>
                {faq.question}
                <span className="expand-symbol">
                  {selected === index ? "-" : "+"}
                </span>
              </div>

              <div
                className={`accordion-answer ${
                  selected === index ? "open" : ""
                }`}
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
