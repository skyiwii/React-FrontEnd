import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";


import "./styles/general.css";
import "./styles/login.css";
import "./styles/registro.css";
import "./styles/dashboard-admin.css";
import "./styles/categorias-admin.css";
import "./styles/productos-admin.css";
import "./styles/usuarios-admin.css";
import "./styles/contactos-admin.css";
import "./styles/dashboard-cliente.css";
import "./styles/productos.css";
import "./styles/producto-detalle.css";
import "./styles/index.css";
import "./styles/nosotros.css";
import "./styles/contacto.css";
import "./styles/blogs.css";
import "./styles/post-detalle.css";
import "./styles/comentarios.css";
import { ThemeProvider } from "./context/ThemeContext";



import { inicializarStorage } from "./services/initStorage";

await inicializarStorage();

import App from "./App";

import {
  AuthProvider
} from "./context/AuthContext";


ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>

  </React.StrictMode>

);


