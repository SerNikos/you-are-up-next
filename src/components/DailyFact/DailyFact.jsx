import "./DailyFact.css";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import factWinSound from "../../assets/audio/sound effects/fact-win-sound.mp3";
import scratchSound from "../../assets/audio/sound effects/scracth.mp3";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const resetAudio = (audio) => {
  if (!audio) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
};

const playAudio = (audio) => {
  if (!audio) {
    return;
  }

  audio.play().catch(() => {});
};

const getLocalDayNumber = (date = new Date()) =>
  Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) /
      MILLISECONDS_PER_DAY,
  );

const getMillisecondsUntilNextLocalMidnight = (date = new Date()) => {
  const nextMidnight = new Date(date);
  nextMidnight.setHours(24, 0, 0, 0);

  return Math.max(nextMidnight.getTime() - date.getTime(), 1000);
};

const formatCountdown = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
};

export default function DailyFact() {
  const { t } = useTranslation();
  const [dailyFactDay, setDailyFactDay] = useState(() => getLocalDayNumber());
  const [millisecondsUntilMidnight, setMillisecondsUntilMidnight] = useState(
    () => getMillisecondsUntilNextLocalMidnight(),
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealAnimating, setIsRevealAnimating] = useState(false);
  const canvasRef = useRef(null);
  const isScratchingRef = useRef(false);
  const isRevealedRef = useRef(false);
  const lastPointRef = useRef(null);
  const scratchAudioRef = useRef(null);
  const factWinAudioRef = useRef(null);

  useEffect(() => {
    const scratchAudio = new Audio(scratchSound);
    scratchAudio.loop = true;
    scratchAudio.volume = 0.45;
    scratchAudio.preload = "auto";

    const factWinAudio = new Audio(factWinSound);
    factWinAudio.volume = 0.7;
    factWinAudio.preload = "auto";

    scratchAudioRef.current = scratchAudio;
    factWinAudioRef.current = factWinAudio;

    return () => {
      resetAudio(scratchAudio);
      resetAudio(factWinAudio);
      scratchAudioRef.current = null;
      factWinAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    let midnightTimer;

    const updateDailyFact = () => {
      const now = new Date();
      setDailyFactDay(getLocalDayNumber(now));
      setMillisecondsUntilMidnight(getMillisecondsUntilNextLocalMidnight(now));
      midnightTimer = window.setTimeout(
        updateDailyFact,
        getMillisecondsUntilNextLocalMidnight(now),
      );
    };

    const countdownTimer = window.setInterval(() => {
      setMillisecondsUntilMidnight(getMillisecondsUntilNextLocalMidnight());
    }, 1000);

    midnightTimer = window.setTimeout(
      updateDailyFact,
      getMillisecondsUntilNextLocalMidnight(),
    );

    return () => {
      window.clearTimeout(midnightTimer);
      window.clearInterval(countdownTimer);
    };
  }, []);

  const dailyFacts = t("dailyFact.items", { returnObjects: true });
  const dailyFactItems = Array.isArray(dailyFacts) ? dailyFacts : [];
  const dailyFact =
    dailyFactItems.length > 0
      ? dailyFactItems[dailyFactDay % dailyFactItems.length]
      : "";
  const countdown = formatCountdown(millisecondsUntilMidnight);

  useEffect(() => {
    isRevealedRef.current = false;
    setIsRevealed(false);
    setIsRevealAnimating(false);
    resetAudio(scratchAudioRef.current);
  }, [dailyFact, dailyFactDay]);

  useEffect(() => {
    if (isRevealed) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const drawScratchSurface = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;

      if (!width || !height) {
        return;
      }

      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);

      const context = canvas.getContext("2d");
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const surfaceGradient = context.createLinearGradient(0, 0, width, height);
      surfaceGradient.addColorStop(0, "#7b654d");
      surfaceGradient.addColorStop(0.5, "#a18458");
      surfaceGradient.addColorStop(1, "#514a4a");
      context.fillStyle = surfaceGradient;
      context.fillRect(0, 0, width, height);

      context.globalAlpha = 0.22;
      context.strokeStyle = "#f4e4c2";
      context.lineWidth = 1;
      for (let offset = -height; offset < width; offset += 16) {
        context.beginPath();
        context.moveTo(offset, 0);
        context.lineTo(offset + height, height);
        context.stroke();
      }

      context.globalAlpha = 0.2;
      context.fillStyle = "#201b1d";
      for (let x = 8; x < width; x += 24) {
        for (let y = 8; y < height; y += 24) {
          context.beginPath();
          context.arc(x, y, 1.5, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.globalAlpha = 0.9;
      context.fillStyle = "#f4e4c2";
      const questionMarkSize = Math.max(
        18,
        Math.min(72, width * 0.18, height * 0.72),
      );
      context.font = `700 ${questionMarkSize}px Georgia, serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("?", width / 2, height / 2);
      context.globalAlpha = 1;
    };

    drawScratchSurface();
    const resizeObserver = new ResizeObserver(drawScratchSurface);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [dailyFact, dailyFactDay, isRevealed]);

  const scratchAt = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const point = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    const context = canvas.getContext("2d");
    const previousPoint = lastPointRef.current;

    context.save();
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = Math.max(34, Math.min(72, bounds.width * 0.16));
    context.beginPath();

    if (previousPoint) {
      context.moveTo(previousPoint.x, previousPoint.y);
      context.lineTo(point.x, point.y);
    } else {
      context.moveTo(point.x, point.y);
      context.lineTo(point.x + 0.01, point.y + 0.01);
    }

    context.stroke();
    context.restore();
    lastPointRef.current = point;
  };

  const getScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return 0;
    }

    const context = canvas.getContext("2d");
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const sampleStep = 8;
    let sampledPixels = 0;
    let clearedPixels = 0;

    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        sampledPixels += 1;
        if (pixels[(y * canvas.width + x) * 4 + 3] === 0) {
          clearedPixels += 1;
        }
      }
    }

    return sampledPixels > 0 ? clearedPixels / sampledPixels : 0;
  };

  const revealFact = () => {
    if (isRevealedRef.current) {
      return;
    }

    isRevealedRef.current = true;
    resetAudio(scratchAudioRef.current);
    playAudio(factWinAudioRef.current);
    setIsRevealAnimating(true);
    setIsRevealed(true);
  };

  const finishScratch = (event) => {
    if (!isScratchingRef.current) {
      return;
    }

    isScratchingRef.current = false;
    lastPointRef.current = null;
    resetAudio(scratchAudioRef.current);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (getScratchPercentage() >= 0.55) {
      revealFact();
    }
  };

  return (
    <section
      className={`daily-lore-fact${isRevealAnimating ? " is-revealing" : ""}`}
      aria-labelledby="daily-fact-title"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          setIsRevealAnimating(false);
        }
      }}
    >
      <h2 id="daily-fact-title">{t("dailyFact.title")}</h2>
      <div
        className={`daily-lore-fact-reveal-area${
          isRevealed ? " is-revealed" : ""
        }`}
      >
        <p className="daily-lore-fact-text" aria-live="polite">
          {dailyFact}
        </p>
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="daily-lore-fact-scratch"
            role="button"
            tabIndex={0}
            aria-label={t("dailyFact.scratchLabel")}
            title={t("dailyFact.scratchLabel")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealFact();
              }
            }}
            onPointerDown={(event) => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              isScratchingRef.current = true;
              lastPointRef.current = null;
              playAudio(scratchAudioRef.current);
              scratchAt(event);
            }}
            onPointerMove={(event) => {
              if (isScratchingRef.current) {
                scratchAt(event);
              }
            }}
            onPointerUp={finishScratch}
            onPointerCancel={finishScratch}
          />
        )}
      </div>
      <div className="daily-lore-fact-refresh-row">
        <p className="daily-lore-fact-refresh">{t("dailyFact.refresh")}</p>
        <p className="daily-lore-fact-countdown">
          {t("dailyFact.nextFact")}
          <time dateTime={`PT${Math.ceil(millisecondsUntilMidnight / 1000)}S`}>
            {countdown}
          </time>
        </p>
      </div>
    </section>
  );
}
