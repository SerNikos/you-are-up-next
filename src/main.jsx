import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AllCharactersLore from "./components/AllCharactersLore/AllCharactersLore.jsx"
import NotFound from "./components/NotFound/NotFound.jsx";
import Rules from "./components/Rules/Rules.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import Team from "./components/Team/Team.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/AllCharactersLore", element: <AllCharactersLore /> },
  { path: "/Rules", element: <Rules /> },
  { path: "/ContactUs", element: <ContactUs /> },
  { path: "/Team", element: <Team /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
