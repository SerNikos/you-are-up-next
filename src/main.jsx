import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js"; // <-- ΠΡΟΣΘΗΚΗ ΕΔΩ

import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LocaleRoute from "./components/LocaleRoute/LocaleRoute.jsx";

const rootElement = document.getElementById("root");

const AllCharactersLore = lazy(
  () => import("./components/AllCharactersLore/AllCharactersLore.jsx"),
);
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));
const Rules = lazy(() => import("./components/Rules/Rules.jsx"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs.jsx"));
const Team = lazy(() => import("./components/Team/Team.jsx"));

const localizedRoutes = ["en", "el"].flatMap((language) => [
  {
    path: `/${language}/*`,
    element: (
      <LocaleRoute language={language}>
        <App />
      </LocaleRoute>
    ),
  },
  {
    path: `/${language}/characters`,
    element: (
      <LocaleRoute language={language}>
        <AllCharactersLore />
      </LocaleRoute>
    ),
  },
  {
    path: `/${language}/rules`,
    element: (
      <LocaleRoute language={language}>
        <Rules />
      </LocaleRoute>
    ),
  },
  {
    path: `/${language}/contact`,
    element: (
      <LocaleRoute language={language}>
        <ContactUs />
      </LocaleRoute>
    ),
  },
  {
    path: `/${language}/team`,
    element: (
      <LocaleRoute language={language}>
        <Team />
      </LocaleRoute>
    ),
  },
]);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/AllCharactersLore", element: <AllCharactersLore /> },
  { path: "/Rules", element: <Rules /> },
  { path: "/ContactUs", element: <ContactUs /> },
  { path: "/Team", element: <Team /> },
  ...localizedRoutes,
  { path: "*", element: <NotFound /> },
]);

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense
        fallback={
          <div className="route-loading" role="status" aria-live="polite">
            Loading page...
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </StrictMode>,
);
