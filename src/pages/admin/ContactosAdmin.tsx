import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Contacto, EstadoContacto } from "../../types/Contacto";

import {
  obtenerContactos,
  eliminarContacto,
  marcarContactoRespondido,
  archivarContacto
} from "../../services/contactosStorage";

import { useAuth } from "../../context/AuthContext";

function ContactosAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState<"todos" | EstadoContacto>("todos");

  useEffect(() => {
    setContactos(obtenerContactos());
  }, []);

  function recargarContactos() {
    setContactos(obtenerContactos());
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleEliminar(contacto: Contacto) {
    const confirmar = confirm(`¿Eliminar mensaje de ${contacto.nombre}?`);

    if (!confirmar) {
      return;
    }

    eliminarContacto(contacto.id);
    recargarContactos();
  }

  const contactosFiltrados = contactos.filter((contacto) => {
    const texto = busqueda.trim().toLowerCase();

    const coincideTexto =
      contacto.nombre.toLowerCase().includes(texto) ||
      contacto.correo.toLowerCase().includes(texto) ||
      contacto.mensaje.toLowerCase().includes(texto);

    const coincideEstado =
      estado === "todos" || contacto.estado === estado;

    return coincideTexto && coincideEstado;
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

      <main className="contactos-admin-main">
        <section className="contactos-hero">
          <div className="container">
            <span className="admin-tag">Administración</span>

            <h1>Mensajes de Contacto</h1>

            <p>
              Revisa, busca y administra los mensajes enviados desde contacto y
              el widget del inicio.
            </p>
          </div>
        </section>

        <section className="contactos-panel">
          <div className="container">
            <div className="contactos-toolbar card-base">
              <div>
                <h2>Bandeja de mensajes</h2>

                <p>Gestiona dudas, consultas y solicitudes de clientes.</p>
              </div>

              <div className="contactos-filtros">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre, correo o mensaje..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />

                <select
                  className="form-control"
                  value={estado}
                  onChange={(e) =>
                    setEstado(e.target.value as "todos" | EstadoContacto)
                  }
                >
                  <option value="todos">Todos</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="respondido">Respondidos</option>
                  <option value="archivado">Archivados</option>
                </select>
              </div>
            </div>

            <div className="contador-contactos">
              Mensajes encontrados: {contactosFiltrados.length}
            </div>

            <div className="contactos-grid">
              {contactosFiltrados.length === 0 ? (
                <p>No hay mensajes para mostrar.</p>
              ) : (
                contactosFiltrados.map((contacto) => (
                  <article className="contacto-card" key={contacto.id}>
                    <div className="contacto-header">
                      <div>
                        <h3>{contacto.nombre}</h3>

                        <p className="contacto-correo">{contacto.correo}</p>

                        <p className="contacto-telefono">
                          {contacto.telefono || "Sin teléfono"}
                        </p>

                        <p className="contacto-fecha">{contacto.fecha}</p>
                      </div>

                      <span
                        className={`estado-contacto estado-${contacto.estado}`}
                      >
                        {contacto.estado}
                      </span>
                    </div>

                    <div className="contacto-mensaje">
                      <p>{contacto.mensaje}</p>
                    </div>

                    <div className="contacto-actions">
                      <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => {
                          marcarContactoRespondido(contacto.id);
                          recargarContactos();
                        }}
                      >
                        Respondido
                      </button>

                      <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => {
                          archivarContacto(contacto.id);
                          recargarContactos();
                        }}
                      >
                        Archivar
                      </button>

                      <button
                        className="btn btn-dark"
                        type="button"
                        onClick={() => handleEliminar(contacto)}
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

export default ContactosAdmin;