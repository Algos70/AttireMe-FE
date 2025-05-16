import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
