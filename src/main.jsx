import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { WalletProvider } from "../context/WalletContext.jsx";
import "./styles/style.min.css";
import "./styles/swiper-bundle.min.css";
import "./styles/fancybox.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
        <WalletProvider>
          <App />
        </WalletProvider>
  </BrowserRouter>
);