import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { obtenerProductos } from "../../services/productosStorage";
import { formatearPrecio } from "../../utils/formatters";
import { resolverImagen } from "../../utils/images";

function DashboardCliente() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const productos = obtenerProductos();

  const favoritosIds = usuario?.favoritos || [];

  const productosFavoritos = productos.filter((producto) =>
    favoritosIds.some(
      (idFavorito) => String(idFavorito) === String(producto.id)
    )
  );

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

              <Link to="/productos" className="btn btn-outline-dark btn-sm">
                Productos
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

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar card-base">
              <div className="sidebar-user">
                <div className="avatar-usuario">🌿</div>

                <h3>{usuario?.nombre || "Usuario"}</h3>

                <p>Cliente Vura</p>
              </div>

              <nav className="sidebar-nav">
                <a href="#favoritos" className="sidebar-link activo">
                  ❤️ Favoritos
                </a>
              </nav>
            </aside>

            <section className="dashboard-contenido">
              <section className="dashboard-hero card-base">
                <span className="dashboard-tag">Panel Personal</span>

                <h1>Bienvenido a tu espacio Vura</h1>

                <p>
                  Aquí podrás guardar productos favoritos, gestionar futuras
                  compras y acceder a funciones personalizadas.
                </p>
              </section>

              <section id="favoritos" className="dashboard-seccion">
                <div className="dashboard-header-seccion">
                  <h2>Tus Favoritos</h2>

                  <p>Productos guardados por ti.</p>
                </div>

                {productosFavoritos.length === 0 ? (
                  <div className="favoritos-vacio card-base">
                    <span>🤍</span>

                    <h3>No tienes favoritos aún</h3>

                    <p>
                      Explora productos y agrégalos a tu colección personal.
                    </p>

                    <Link to="/productos" className="btn btn-dark">
                      Explorar Productos
                    </Link>
                  </div>
                ) : (
                  <div className="favoritos-grid">
                    {productosFavoritos.map((producto) => (
                      <article
                        className="card-base favorito-card"
                        key={producto.id}
                      >
                        <img
                          src={resolverImagen(producto.imagen)}
                          alt={producto.nombre}
                        />

                        <div className="p-4">
                          <h3 className="mb-3">{producto.nombre}</h3>

                          <p>{producto.descripcion}</p>

                          <strong>{formatearPrecio(producto.precio)}</strong>

                          <div className="mt-4">
                            <Link
                              to={`/productos/${producto.id}`}
                              className="btn btn-dark"
                            >
                              Ver producto
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </section>
          </div>
        </div>
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

export default DashboardCliente;