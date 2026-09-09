import { useLayoutEffect } from "react";

export default function AppReveal({ children, rootElement }) {
  useLayoutEffect(() => {
    rootElement.classList.remove("app-loading");
    rootElement.style.visibility = "visible";
  }, [rootElement]);

  return children;
}