import { useState, useRef, useEffect, useCallback } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({
  audioSrc,
  characterName,
  isPlaying,
  onToggle,
}) {
  const audioRef = useRef(null);
  const wrapperRef = useRef(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isDraggingRef = useRef(false);
  isDraggingRef.current = isDragging;

  const triggerToggle = (value) => {
    if (typeof onToggle === "function") {
      onToggle(value);
    }
  };

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration && !isDraggingRef.current) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
      }
    };

    const handleEnded = () => {
      triggerToggle(false);
      setAudioProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Audio playback error:", err);
        triggerToggle(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const updateAudioPosition = useCallback((clientX) => {
    const audio = audioRef.current;
    const wrapper = wrapperRef.current;
    if (!audio || !audio.duration || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    let clickX = clientX - rect.left;
    clickX = Math.max(0, Math.min(clickX, rect.width));
    const percentage = clickX / rect.width;

    audio.currentTime = percentage * audio.duration;
    setAudioProgress(percentage * 100);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateAudioPosition(e.clientX);
    if (!isPlaying) {
      triggerToggle(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      updateAudioPosition(e.clientX);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updateAudioPosition]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      updateAudioPosition(e.touches[0].clientX);
    }
    if (!isPlaying) {
      triggerToggle(true);
    }
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        updateAudioPosition(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updateAudioPosition]);

  return (
    <div className="audio-player-container">
      <button
        className={`lore-play-btn ${isPlaying ? "playing" : ""}`}
        onClick={() => triggerToggle(!isPlaying)}
        aria-label={`Play lore for ${characterName}`}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z" />
          </svg>
        )}
      </button>

      <div
        ref={wrapperRef}
        className="soundwave-wrapper"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        title="Click or drag to seek audio"
      >
        <div className="soundwave-bars">
          {/* Αυξήσαμε τις μπάρες σε 50 για πυκνό αποτέλεσμα */}
          {[...Array(50)].map((_, i) => {
            const barThreshold = (i / 50) * 100;
            const isActiveBar = audioProgress >= barThreshold;

            return (
              <span
                key={i}
                className={`wave-bar ${isPlaying && isActiveBar ? "passed" : isPlaying ? "active" : ""}`}
                style={{
                  height: `${Math.max(35, Math.sin(i * 0.25) * 50 + 50)}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
