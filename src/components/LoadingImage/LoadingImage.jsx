import { useEffect, useRef, useState } from "react";
import "./LoadingImage.css";
import { getOptimizedImageSources } from "../../utils/optimizedImages.js";

const MINIMUM_LOADING_TIME = 150;
const EMPTY_IMAGE_SRC =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
const imageFormatSupport = new Map();

function supportsImageFormat(format, source) {
  if (imageFormatSupport.has(format)) return imageFormatSupport.get(format);
  if (typeof Image === "undefined" || !source) {
    const unsupported = Promise.resolve(false);
    imageFormatSupport.set(format, unsupported);
    return unsupported;
  }

  const supported = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = source;
  });
  imageFormatSupport.set(format, supported);
  return supported;
}

async function getOptimizedSource(sources, element) {
  if (!sources) return null;

  let format = null;
  for (const candidateFormat of ["avif", "webp"]) {
    const variants = sources[candidateFormat];
    if (
      variants?.length &&
      (await supportsImageFormat(candidateFormat, variants[0].src))
    ) {
      format = candidateFormat;
      break;
    }
  }

  const variants = format ? sources[format] : null;
  if (!variants?.length) return null;

  const renderedWidth =
    element?.getBoundingClientRect().width || window.innerWidth;
  const targetWidth = Math.max(
    1,
    Math.ceil(renderedWidth * (window.devicePixelRatio || 1)),
  );

  return (
    variants.find(({ width }) => width >= targetWidth)?.src ||
    variants[variants.length - 1].src
  );
}

async function readImageResponse(response, onProgress) {
  if (!response.ok) {
    throw new Error(`Image request failed with status ${response.status}`);
  }

  const totalBytes = Number(response.headers.get("content-length"));
  const hasTotalBytes = Number.isFinite(totalBytes) && totalBytes > 0;
  const reader = response.body?.getReader();

  if (!reader) {
    const blob = await response.blob();
    onProgress(100, false);
    return blob;
  }

  const chunks = [];
  let loadedBytes = 0;
  onProgress(0, !hasTotalBytes);

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    if (value) {
      chunks.push(value);
      loadedBytes += value.byteLength;

      if (hasTotalBytes) {
        onProgress(
          Math.min(99, Math.round((loadedBytes / totalBytes) * 100)),
          false,
        );
      } else {
        onProgress(0, true);
      }
    }
  }

  onProgress(100, false);
  return new Blob(chunks, {
    type: response.headers.get("content-type") || "application/octet-stream",
  });
}

export default function LoadingImage({
  alt,
  className = "",
  wrapperClassName = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  src,
  srcSet,
  sizes = "100vw",
  onLoad: onImageLoad,
  onError: onImageError,
  ...imageProps
}) {
  const optimizedSources = getOptimizedImageSources(src);
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [progress, setProgress] = useState(0);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [useOriginalSource, setUseOriginalSource] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const shouldUseNativeSource = !optimizedSources || loading === "eager";
  const [useNativeSource, setUseNativeSource] = useState(shouldUseNativeSource);
  const wrapperRef = useRef(null);
  const loadingTimer = useRef(null);
  const abortController = useRef(null);
  const objectUrl = useRef(null);
  const requestId = useRef(0);
  const activeSource = useRef("native");
  const retryOriginalSource = useRef(null);
  const optimizedSrcSet = (variants) =>
    variants
      ?.map(({ src: variantSrc, width }) => `${variantSrc} ${width}w`)
      .join(", ");

  useEffect(() => {
    let cancelled = false;
    let observer;

    const revokeObjectUrl = () => {
      if (!objectUrl.current) return;
      URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
    };

    const clearLoadingTimer = () => {
      if (!loadingTimer.current) return;
      window.clearTimeout(loadingTimer.current);
      loadingTimer.current = null;
    };

    const startRequest = (requestUrl, sourceType) => {
      if (cancelled) return;

      const currentRequestId = ++requestId.current;
      abortController.current?.abort();
      abortController.current = new AbortController();
      revokeObjectUrl();
      clearLoadingTimer();
      activeSource.current = sourceType;

      setImageSrc(null);
      setIsLoading(true);
      setProgress(0);
      setIsIndeterminate(false);
      setUseOriginalSource(sourceType === "original");
      setImageFailed(false);

      fetch(requestUrl, {
        signal: abortController.current.signal,
        ...(fetchPriority ? { priority: fetchPriority } : {}),
      })
        .then((response) =>
          readImageResponse(response, (nextProgress, indeterminate) => {
            if (cancelled || currentRequestId !== requestId.current) return;
            setProgress(nextProgress);
            setIsIndeterminate(indeterminate);
          }),
        )
        .then((blob) => {
          if (cancelled || currentRequestId !== requestId.current) return;

          const nextObjectUrl = URL.createObjectURL(blob);
          objectUrl.current = nextObjectUrl;
          setImageSrc(nextObjectUrl);
        })
        .catch((error) => {
          if (
            cancelled ||
            currentRequestId !== requestId.current ||
            error?.name === "AbortError"
          ) {
            return;
          }

          if (sourceType === "optimized") {
            startRequest(src, "original");
            return;
          }

          activeSource.current = "failed";
          setProgress(100);
          setIsIndeterminate(false);
          setImageFailed(true);
          setIsLoading(false);
          onImageError?.(error);
        });
    };

    const startLoading = async () => {
      if (cancelled || !src) return;

      const selectedSource = await getOptimizedSource(
        optimizedSources,
        wrapperRef.current,
      );

      if (cancelled) return;

      if (!selectedSource) {
        activeSource.current = "native";
        setUseNativeSource(true);
        setIsIndeterminate(true);
        return;
      }

      setUseNativeSource(false);
      startRequest(selectedSource, "optimized");
    };

    abortController.current?.abort();
    abortController.current = null;
    requestId.current += 1;
    revokeObjectUrl();
    clearLoadingTimer();
    retryOriginalSource.current = null;
    activeSource.current = shouldUseNativeSource ? "native" : "waiting";
    setIsLoading(Boolean(src));
    setProgress(0);
    setIsIndeterminate(Boolean(src && shouldUseNativeSource));
    setUseOriginalSource(false);
    setImageFailed(false);
    setImageSrc(null);
    setUseNativeSource(shouldUseNativeSource);

    if (!src || !optimizedSources || loading === "eager") {
      return () => {
        cancelled = true;
        abortController.current?.abort();
        abortController.current = null;
        revokeObjectUrl();
        clearLoadingTimer();
      };
    }

    retryOriginalSource.current = () => {
      if (!cancelled && activeSource.current === "optimized") {
        startRequest(src, "original");
      }
    };

    if (loading !== "lazy" || typeof IntersectionObserver === "undefined") {
      startLoading();
    } else if (wrapperRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          startLoading();
        },
        { rootMargin: "200px" },
      );
      observer.observe(wrapperRef.current);
    } else {
      startLoading();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      abortController.current?.abort();
      abortController.current = null;
      requestId.current += 1;
      retryOriginalSource.current = null;
      revokeObjectUrl();
      clearLoadingTimer();
    };
  }, [
    fetchPriority,
    loading,
    onImageError,
    optimizedSources,
    shouldUseNativeSource,
    src,
  ]);

  const handleLoad = (event) => {
    if (src && !useNativeSource && !imageSrc) return;

    onImageLoad?.(event);
    if (!src) {
      setProgress(100);
      setIsLoading(false);
      return;
    }

    if (loadingTimer.current) window.clearTimeout(loadingTimer.current);
    loadingTimer.current = window.setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
    }, MINIMUM_LOADING_TIME);
  };

  const handleError = (event) => {
    if (loadingTimer.current) window.clearTimeout(loadingTimer.current);

    if (activeSource.current === "optimized") {
      retryOriginalSource.current?.();
      return;
    }

    onImageError?.(event);
    setProgress(100);
    setIsIndeterminate(false);
    setImageFailed(true);
    setIsLoading(false);
  };

  const showNativePictureSources =
    useNativeSource && !imageFailed && !useOriginalSource;
  const renderedImageSrc = imageFailed
    ? EMPTY_IMAGE_SRC
    : useNativeSource
      ? src || EMPTY_IMAGE_SRC
      : imageSrc || EMPTY_IMAGE_SRC;

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
          {...(!isIndeterminate && { "aria-valuenow": progress })}
        >
          <span
            className={`loading-image-bar${isIndeterminate ? " is-indeterminate" : ""}`}
          >
            <span
              style={isIndeterminate ? undefined : { width: `${progress}%` }}
            />
          </span>
          <span className="loading-image-percentage">
            {isIndeterminate ? "..." : `${progress}%`}
          </span>
        </span>
      )}
      <picture>
        {showNativePictureSources && optimizedSources?.avif && (
          <source
            type="image/avif"
            srcSet={optimizedSrcSet(optimizedSources.avif)}
            sizes={sizes}
          />
        )}
        {showNativePictureSources && optimizedSources?.webp && (
          <source
            type="image/webp"
            srcSet={optimizedSrcSet(optimizedSources.webp)}
            sizes={sizes}
          />
        )}
        <img
          {...imageProps}
          src={renderedImageSrc}
          srcSet={useNativeSource && !imageFailed ? srcSet : undefined}
          sizes={sizes}
          alt={alt}
          className={className}
          loading={useNativeSource ? loading : "eager"}
          decoding={decoding}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    </span>
  );
}
