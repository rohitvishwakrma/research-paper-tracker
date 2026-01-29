import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { PaperProvider } from "./context/PaperContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PaperProvider>
        <App />
      </PaperProvider>
    </BrowserRouter>
  </React.StrictMode>
);
