import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AllCharactersLore from "./components/AllCharactersLore/AllCharactersLore.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound404 from "./components/NotFound404/NotFound404.JSX";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/AllCharactersLore", element: <AllCharactersLore /> },
  { path: "*", element: <NotFound404 /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
