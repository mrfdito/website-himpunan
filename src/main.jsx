import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // pastikan path ini sesuai
import "./App.css"; // atau "./index.css" tergantung kamu simpan di mana

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
