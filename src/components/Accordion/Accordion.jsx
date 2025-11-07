import React from "react";
import { Link } from "react-router-dom";
import "./Accordion.css";
import { useState } from "react";

const data = [
  {
    question: "What is YAUN?",
    answer:
      "YAUN its a physical self-published board game funded by kickstarter",
  },
  {
    question: "In What Period of Time",
    answer: "Of Course the midevel times",
  },
  {
    question: "How can i Buy it",
    answer: "Click the Buy Button we work with BoxNow and ACS",
  },
  {
    question: "Is it difficult to learn how to play?",
    answer: (
      <>
        Not at all,
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
          <span className="accordion-span"> click here </span>
        </a>
        to watch a tutorial video.
      </>
    ),
  },
];

export const Accordion = () => {
  const [selected, setSelected] = useState("");

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
              <div
                className="accordion-question"
                onClick={() => setSelected(selected === index ? null : index)}
              >
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
