import { lazy, Suspense, useEffect, useState } from "react";

const ExecutionerChat = lazy(
  () => import("../ExecutionerChat/ExecutionerChat.jsx"),
);

export default function DeferredExecutionerChat() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadChat = () => setIsReady(true);

    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(loadChat, {
        timeout: 2500,
      });

      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = window.setTimeout(loadChat, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isReady) return null;

  return (
    <Suspense fallback={null}>
      <ExecutionerChat />
    </Suspense>
  );
}
