import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LivrosProvider } from "./context/LivrosContext";
import { UsuarioProvider } from "./context/UsuarioContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsuarioProvider>
          <LivrosProvider>
            <App />
          </LivrosProvider>
        </UsuarioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
