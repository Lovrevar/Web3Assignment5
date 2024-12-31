import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appappStore } from "./appappStores/appappStore.ts";

createRoot(document.getElementById("root")!).render(
  <Provider appappStore={appappStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
