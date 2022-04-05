import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={import.meta.env.VITE_DOMAIN || ""}
    clientId={import.meta.env.VITE_CLIENTE_ID || ""}
    redirectUri={window.location.origin}
    audience={import.meta.env.VITE_AUDIENCE}
    scope="read:current_user update:current_user_metadata" 
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
