import { useEffect, useRef, useState } from "react";
import "./LoadingImage.css";

const MINIMUM_LOADING_TIME = 150;

export default function LoadingImage({
  alt,
  className = "",
  wrapperClassName = "",
  loading = "lazy",
  decoding = "async",
  src,
  ...imageProps
}) {
  const [imageSrc, setImageSrc] = useState(loading === "lazy" ? null : src);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(loading !== "lazy");
  const wrapperRef = useRef(null);
  const loadingTimer = useRef(null);

  useEffect(() => {
    if (loading !== "lazy" || !wrapperRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (!isVisible || !src) return undefined;

    let cancelled = false;
    let objectUrl;
    const controller = new AbortController();

    const loadImage = async () => {
      setIsLoading(true);
      setProgress(0);

      try {
        const response = await fetch(src, { signal: controller.signal });
        if (!response.ok || !response.body) {
          throw new Error("Image request failed");
        }

        const totalBytes = Number(response.headers.get("content-length"));
        const reader = response.body.getReader();
        const chunks = [];
        let loadedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          loadedBytes += value.length;

          if (Number.isFinite(totalBytes) && totalBytes > 0) {
            setProgress(
              Math.min(99, Math.round((loadedBytes / totalBytes) * 100)),
            );
          }
        }

        if (cancelled) return;

        objectUrl = URL.createObjectURL(new Blob(chunks));
        setImageSrc(objectUrl);
        if (!Number.isFinite(totalBytes) || totalBytes <= 0) {
          setProgress(null);
        }
      } catch (error) {
        if (error.name === "AbortError" || cancelled) return;

        setImageSrc(src);
        setProgress(null);
      }
    };

    loadImage();

    return () => {
      cancelled = true;
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (loadingTimer.current) window.clearTimeout(loadingTimer.current);
    };
  }, [isVisible, src]);

  const handleLoad = () => {
    loadingTimer.current = window.setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
    }, MINIMUM_LOADING_TIME);
  };

  const handleError = () => {
    setProgress(100);
    setIsLoading(false);
  };

  return (
    <span
      ref={wrapperRef}
      className={`loading-image ${isLoading ? "is-loading" : ""} ${wrapperClassName}`.trim()}
      aria-busy={isLoading}
    >
      {isLoading && (
        <span
          className="loading-image-progress"
          role="progressbar"
          aria-label="Loading image"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress === null ? undefined : Math.round(progress)}
        >
          <span className="loading-image-bar">
            <span
              style={{ width: progress === null ? "45%" : `${progress}%` }}
            />
          </span>
          <span className="loading-image-percentage">
            {progress === null ? "..." : `${Math.round(progress)}%`}
          </span>
        </span>
      )}
      <img
        {...imageProps}
        src={imageSrc || undefined}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  );
}