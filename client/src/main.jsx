import React from "react";
import ReactDOM from "react-dom/client";
import { ListingProvider } from "./context/ListingContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListingProvider>
      <App />
    </ListingProvider>
  </React.StrictMode>
);
