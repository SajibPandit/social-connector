import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";

//css imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";

// Create a root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);
