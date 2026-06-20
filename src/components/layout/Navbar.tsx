import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { tema, toggleTema } = useTheme();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const [menuAbierto, setMenuAbierto] = useState(false);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  function handleLogout() {
    logout();
    cerrarMenu();
    navigate("/");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm navbar-custom">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center fw-bold"
            to="/"
            onClick={cerrarMenu}
          >
            <img
              src="/media/logo.png"
              width="40"
              className="me-2"
              alt="Logo Vura"
            />
            VURA
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            aria-controls="navbarNav"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="navbarNav"
            className={`navbar-collapse ${menuAbierto ? "menu-activo" : ""}`}
            aria-hidden={!menuAbierto}
          >
            <ul className="navbar-nav ms-auto text-uppercase small align-items-lg-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={cerrarMenu}>
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/productos"
                  onClick={cerrarMenu}
                >
                  Productos
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/nosotros"
                  onClick={cerrarMenu}
                >
                  Nosotros
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contacto"
                  onClick={cerrarMenu}
                >
                  Contacto
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/blogs" onClick={cerrarMenu}>
                  Blogs
                </NavLink>
              </li>

              {!usuario ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={cerrarMenu}
                    >
                      Ingresar
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/registro"
                      onClick={cerrarMenu}
                    >
                      Registro
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={
                        usuario.rol === "admin"
                          ? "/intranet/admin"
                          : "/intranet/cliente"
                      }
                      onClick={cerrarMenu}
                    >
                      {usuario.rol === "admin" ? "Panel Admin" : usuario.nombre}
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-sm btn-dark ms-lg-2"
                      type="button"
                      onClick={handleLogout}
                    >
                      Salir
                    </button>
                  </li>
                </>
              )}

              <li className="nav-item ms-lg-3">
                <button
                  className="btn btn-sm btn-outline-dark"
                  type="button"
                  aria-label="Cambiar modo oscuro"
                  onClick={toggleTema}
                >
                  {tema === "dark" ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;