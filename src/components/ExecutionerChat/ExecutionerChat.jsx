import { useEffect, useRef, useState } from "react";
import { FaComments, FaKey, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./ExecutionerChat.css";

const MAX_MESSAGE_LENGTH = 1200;
const MOBILE_BREAKPOINT = 520;
const SECRET_MODE_PASSWORD = "696969";

export default function ExecutionerChat() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => [
    { role: "model", text: t("chat.initial") },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(null);
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [isSecretPromptOpen, setIsSecretPromptOpen] = useState(false);
  const [secretPassword, setSecretPassword] = useState("");
  const [secretError, setSecretError] = useState("");
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const virtualKeyboard = navigator.virtualKeyboard;

    const updateViewport = () => {
      const layoutViewportHeight = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const visualViewportHeight = viewport?.height || layoutViewportHeight;
      const visualViewportBottom =
        visualViewportHeight + (viewport?.offsetTop || 0);
      const measuredKeyboardOffset = Math.max(
        0,
        layoutViewportHeight - visualViewportBottom,
      );
      const virtualKeyboardOffset = virtualKeyboard?.boundingRect?.height || 0;
      const isMobileViewport = window.matchMedia(
        `(max-width: ${MOBILE_BREAKPOINT}px)`,
      ).matches;
      const hasKeyboardGeometry =
        measuredKeyboardOffset > 80 || virtualKeyboardOffset > 0;
      const fallbackKeyboardOffset =
        isOpen && isInputFocused && isMobileViewport && !hasKeyboardGeometry
          ? Math.min(Math.max(layoutViewportHeight * 0.45, 300), 440)
          : 0;
      const nextKeyboardOffset =
        isOpen && isInputFocused
          ? Math.max(
              measuredKeyboardOffset,
              virtualKeyboardOffset,
              fallbackKeyboardOffset,
            )
          : 0;
      const nextViewportHeight = Math.max(
        0,
        isOpen
          ? Math.min(
              visualViewportHeight,
              layoutViewportHeight - nextKeyboardOffset,
            )
          : visualViewportHeight,
      );

      setKeyboardOffset(nextKeyboardOffset);
      setViewportHeight(nextViewportHeight);
    };

    let animationFrameId = 0;
    const handleViewportChange = () => {
      updateViewport();
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateViewport);
    };

    updateViewport();
    viewport?.addEventListener("resize", handleViewportChange);
    viewport?.addEventListener("scroll", handleViewportChange);
    window.addEventListener("resize", handleViewportChange);
    document.addEventListener("focusin", updateViewport);
    document.addEventListener("focusout", updateViewport);
    virtualKeyboard?.addEventListener("geometrychange", updateViewport);
    const delayedUpdate = window.setTimeout(updateViewport, 250);

    return () => {
      viewport?.removeEventListener("resize", handleViewportChange);
      viewport?.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      document.removeEventListener("focusin", updateViewport);
      document.removeEventListener("focusout", updateViewport);
      virtualKeyboard?.removeEventListener("geometrychange", updateViewport);
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(delayedUpdate);
    };
  }, [isInputFocused, isOpen]);

  useEffect(() => {
    setMessages((currentMessages) => {
      if (currentMessages.length !== 1 || currentMessages[0].role !== "model") {
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

  const toggleSecretMode = () => {
    if (isSecretMode) {
      setIsSecretMode(false);
      setIsSecretPromptOpen(false);
      setMessages([{ role: "model", text: t("chat.initial") }]);
      setMessage("");
      setError("");
      setSecretPassword("");
      setSecretError("");
      return;
    }

    setSecretError("");
    setSecretPassword("");
    setIsSecretPromptOpen((isOpen) => !isOpen);
  };

  const unlockSecretMode = (event) => {
    event.preventDefault();

    if (secretPassword !== SECRET_MODE_PASSWORD) {
      setSecretError(t("chat.secretWrong"));
      return;
    }

    setIsSecretMode(true);
    setIsSecretPromptOpen(false);
    setSecretPassword("");
    setSecretError("");
  };

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
          secretCode: isSecretMode ? SECRET_MODE_PASSWORD : "",
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
    <div
      className={`executioner-chat ${isSecretMode ? "is-secret-mode" : ""} ${keyboardOffset > 0 ? "is-keyboard-open" : ""}`}
      style={{
        "--executioner-keyboard-offset": `${keyboardOffset}px`,
        "--executioner-viewport-height": viewportHeight
          ? `${viewportHeight}px`
          : undefined,
      }}
    >
      {isOpen && (
        <section
          className={`executioner-chat-panel ${isSecretMode ? "is-secret" : ""}`}
          aria-label={t("chat.title")}
          aria-live="polite"
        >
          <header className="executioner-chat-header">
            <div>
              <p className="executioner-chat-eyebrow">YOU ARE UP NEXT</p>
              <h2>{t("chat.title")}</h2>
              <p>{t("chat.subtitle")}</p>
              {isSecretMode && (
                <span className="executioner-chat-secret-badge">
                  {t("chat.secretActive")}
                </span>
              )}
            </div>
            <div className="executioner-chat-header-actions">
              <button
                type="button"
                className={`executioner-chat-secret-toggle ${isSecretMode ? "is-active" : ""}`}
                onClick={toggleSecretMode}
                aria-pressed={isSecretMode}
                aria-label={
                  isSecretMode
                    ? t("chat.secretDisable")
                    : t("chat.secretEnable")
                }
                title={
                  isSecretMode
                    ? t("chat.secretDisable")
                    : t("chat.secretEnable")
                }
              >
                <FaKey aria-hidden="true" />
              </button>
              <button
                type="button"
                className="executioner-chat-close"
                onClick={() => setIsOpen(false)}
                aria-label={t("chat.close")}
                title={t("chat.close")}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          </header>

          {isSecretPromptOpen && !isSecretMode && (
            <form
              className="executioner-chat-secret-form"
              onSubmit={unlockSecretMode}
            >
              <label htmlFor="executioner-secret-password">
                {t("chat.secretLabel")}
              </label>
              <div className="executioner-chat-secret-fields">
                <input
                  id="executioner-secret-password"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  value={secretPassword}
                  onChange={(event) => {
                    setSecretPassword(event.target.value);
                    setSecretError("");
                  }}
                  placeholder={t("chat.secretPlaceholder")}
                  maxLength={SECRET_MODE_PASSWORD.length}
                  aria-describedby={
                    secretError ? "executioner-secret-error" : undefined
                  }
                />
                <button
                  type="submit"
                  className="executioner-chat-secret-submit"
                  disabled={!secretPassword}
                  aria-label={t("chat.secretSubmit")}
                  title={t("chat.secretSubmit")}
                >
                  <FaKey aria-hidden="true" />
                </button>
              </div>
              {secretError && (
                <p
                  id="executioner-secret-error"
                  className="executioner-chat-secret-error"
                  role="alert"
                >
                  {secretError}
                </p>
              )}
            </form>
          )}

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
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
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
