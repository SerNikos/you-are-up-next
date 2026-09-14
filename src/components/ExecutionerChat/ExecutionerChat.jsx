import { useEffect, useRef, useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./ExecutionerChat.css";

const MAX_MESSAGE_LENGTH = 1200;

export default function ExecutionerChat() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => [
    { role: "model", text: t("chat.initial") },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setMessages((currentMessages) => {
      if (
        currentMessages.length !== 1 ||
        currentMessages[0].role !== "model"
      ) {
        return currentMessages;
      }

      const translatedInitialMessage = t("chat.initial");
      if (currentMessages[0].text === translatedInitialMessage) {
        return currentMessages;
      }

      return [{ role: "model", text: translatedInitialMessage }];
    });
  }, [i18n.language, t]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (messagesElement) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    }
  }, [messages, isSending]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) return;

    const userMessage = { role: "user", text: trimmedMessage };
    const history = messages.slice(-10);
    const language = i18n.language?.startsWith("el") ? "el" : "en";

    setMessage("");
    setError("");
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsSending(true);

    try {
      const response = await fetch("/api/executioner-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          history,
          language,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || t("chat.error"));
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "model", text: data.reply },
      ]);
    } catch (requestError) {
      setError(requestError.message || t("chat.error"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="executioner-chat">
      {isOpen && (
        <section
          className="executioner-chat-panel"
          aria-label={t("chat.title")}
          aria-live="polite"
        >
          <header className="executioner-chat-header">
            <div>
              <p className="executioner-chat-eyebrow">YOU ARE UP NEXT</p>
              <h2>{t("chat.title")}</h2>
              <p>{t("chat.subtitle")}</p>
            </div>
            <button
              type="button"
              className="executioner-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label={t("chat.close")}
              title={t("chat.close")}
            >
              <FaTimes aria-hidden="true" />
            </button>
          </header>

          <div
            ref={messagesRef}
            className="executioner-chat-messages"
            role="log"
            aria-live="polite"
            aria-busy={isSending}
          >
            {messages.map((chatMessage, index) => (
              <div
                className={`executioner-chat-message ${chatMessage.role}`}
                key={`${chatMessage.role}-${index}`}
              >
                <p>{chatMessage.text}</p>
              </div>
            ))}
            {isSending && (
              <div className="executioner-chat-message model is-typing">
                <span className="executioner-chat-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="visually-hidden">{t("chat.typing")}</span>
              </div>
            )}
          </div>

          {error && (
            <p className="executioner-chat-error" role="alert">
              {error}
            </p>
          )}

          <form className="executioner-chat-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("chat.placeholder")}
              maxLength={MAX_MESSAGE_LENGTH}
              disabled={isSending}
              aria-label={t("chat.placeholder")}
            />
            <button
              type="submit"
              className="executioner-chat-send"
              disabled={!message.trim() || isSending}
              aria-label={t("chat.send")}
              title={t("chat.send")}
            >
              <FaPaperPlane aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`executioner-chat-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? t("chat.close") : t("chat.open")}
        title={isOpen ? t("chat.close") : t("chat.open")}
      >
        {isOpen ? (
          <FaTimes aria-hidden="true" />
        ) : (
          <FaComments aria-hidden="true" />
        )}
      </button>
    </div>
  );
}