import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

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
              <Link to="/" className="btn btn-outline-dark btn-sm">
                Inicio
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

      <main className="admin-main">
        <section className="admin-hero">
          <div className="admin-overlay"></div>

          <div className="container position-relative">
            <div className="admin-hero-content">
              <span className="admin-tag">Intranet Administrativa</span>

              <h1>Panel de Administración</h1>

              <p>
                Gestiona productos, categorías, usuarios registrados y
                formularios de contacto de la plataforma Vura.
              </p>
            </div>
          </div>
        </section>

        <section className="admin-panel">
          <div className="container">
            <div className="admin-grid">
              <article className="admin-card">
                <div className="admin-icon">📦</div>

                <h3>Productos</h3>

                <p>
                  Crear, editar y eliminar productos del catálogo principal.
                </p>

                <Link to="/intranet/admin/productos" className="btn btn-dark w-100">
                  Gestionar Productos
                </Link>
              </article>

              <article className="admin-card">
                <div className="admin-icon">🏷️</div>

                <h3>Categorías</h3>

                <p>
                  Organiza el catálogo mediante categorías y zonas naturales.
                </p>

                <Link
                  to="/intranet/admin/categorias"
                  className="btn btn-dark w-100"
                >
                  Gestionar Categorías
                </Link>
              </article>

              <article className="admin-card">
                <div className="admin-icon">👥</div>

                <h3>Usuarios</h3>

                <p>
                  Visualiza usuarios registrados dentro del sistema Vura.
                </p>

                <Link
                  to="/intranet/admin/usuarios"
                  className="btn btn-dark w-100"
                >
                  Ver Usuarios
                </Link>
              </article>

              <article className="admin-card">
                <div className="admin-icon">✉️</div>

                <h3>Contacto</h3>

                <p>
                  Revisa formularios enviados desde contacto.html y el widget
                  principal.
                </p>

                <Link
                  to="/intranet/admin/contactos"
                  className="btn btn-dark w-100"
                >
                  Ver Mensajes
                </Link>
              </article>
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

export default DashboardAdmin;