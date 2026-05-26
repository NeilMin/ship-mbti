import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./app/app.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { cleanupAnalytics, initializeAnalytics } from "./utils/analytics";

initializeAnalytics();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanupAnalytics();
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
