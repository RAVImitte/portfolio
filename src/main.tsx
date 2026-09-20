import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RoleProvider } from "./role/RoleContext";
import { startInViewReveals } from "./motion/inView";
import "./styles.css";
import "./styles-depth.css";

startInViewReveals();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RoleProvider>
        <App />
      </RoleProvider>
    </BrowserRouter>
  </StrictMode>,
);
