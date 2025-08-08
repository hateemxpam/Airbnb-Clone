import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ListingProvider } from "./context/ListingProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListingProvider>
      console.log("ListingProvider initialized"); // Debugging line
      <App />
    </ListingProvider>
  </React.StrictMode>
);
