import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Usuario } from "../../types/Usuario";
import {
  obtenerUsuarios,
  eliminarUsuario
} from "../../services/authStorage";


import { useAuth } from "../../context/AuthContext";

function UsuariosAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
  async function cargarUsuarios() {
    const usuariosFirebase = await obtenerUsuarios();
    setUsuarios(usuariosFirebase);
    }

    cargarUsuarios();
  }, []);

  async function recargarUsuarios() {
    const usuariosFirebase = await obtenerUsuarios();
    setUsuarios(usuariosFirebase);
  }


    async function handleEliminar(usuario: Usuario) {

    if (usuario.rol === "admin") {
      alert("No puedes eliminar administradores.");
      return;
    }

    const confirmar = confirm(
      `¿Eliminar a ${usuario.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    await eliminarUsuario(usuario.id);

    await recargarUsuarios();

  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const usuariosFiltrados = usuarios.filter(usuario => {
    const texto = busqueda.toLowerCase();

    return (
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.correo.toLowerCase().includes(texto)
    );
  });

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm navbar-custom">
          <div className="container">
            <Link
              className="navbar-brand d-flex align-items-center fw-bold"
              to="/"
            >
              <img
                src="/media/logo.png"
                width="40"
                className="me-2"
                alt="Logo Vura"
              />
              VURA
            </Link>

            <div className="ms-auto d-flex gap-2">
              <Link to="/intranet/admin" className="btn btn-outline-dark btn-sm">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-dark btn-sm"
                type="button"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="usuarios-admin-main">
        <section className="usuarios-hero">
          <div className="container">
            <span className="admin-tag">Administración</span>

            <h1>Usuarios Registrados</h1>

            <p>Revisa las cuentas creadas dentro del sistema Vura.</p>
          </div>
        </section>

        <section className="usuarios-panel">
          <div className="container">
            <div className="usuarios-toolbar card-base">
              <div>
                <h2>Lista de usuarios</h2>
                <p>Administra usuarios clientes registrados.</p>
              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o correo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="contador-usuarios">
              Usuarios encontrados: {usuariosFiltrados.length}
            </div>

            <div className="usuarios-grid">
              {usuariosFiltrados.length === 0 ? (
                <p>No se encontraron usuarios.</p>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <article className="usuario-card" key={usuario.id}>
                    <h3 className="usuario-nombre">{usuario.nombre}</h3>

                    <p className="usuario-correo">{usuario.correo}</p>

                    <span className="usuario-rol">{usuario.rol}</span>

                    <p className="usuario-favoritos">
                      Favoritos: {usuario.favoritos.length}
                    </p>

                    <div className="usuario-actions">
                      <button
                        className="btn btn-dark btn-eliminar"
                        type="button"
                        onClick={() => handleEliminar(usuario)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-custom">
        <div className="container text-center py-4">
          <p className="mb-2">&copy; 2024 Vura Bazar Natural</p>
          <p className="small">Hecho en Chile</p>
        </div>
      </footer>
    </>
  );
}

export default UsuariosAdmin;