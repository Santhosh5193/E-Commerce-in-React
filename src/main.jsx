import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { ContextProvider } from "./context/ExclusiveContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider> */}
      <ContextProvider>
        <App />
      </ContextProvider>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </StrictMode>
);
