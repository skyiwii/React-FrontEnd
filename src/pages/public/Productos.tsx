import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Producto } from "../../types/Producto";
import { obtenerProductos } from "../../services/productosStorage";
import { obtenerCategorias } from "../../services/categoriasStorage";
import { actualizarUsuario } from "../../services/authStorage";
import { useAuth } from "../../context/AuthContext";
import { formatearPrecio } from "../../utils/formatters";
import { resolverImagen } from "../../utils/images";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";


function Productos() {
  const { usuario } = useAuth();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaActual, setCategoriaActual] = useState("Todos");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState<Array<string | number>>(
    usuario?.favoritos || []
  );

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const categoriasProductos = productos.map((producto) => producto.categoria);

  const categoriasAdmin = obtenerCategorias().map(
    (categoria) => categoria.nombre
  );

  const categorias = [
    "Todos",
    ...new Set([...categoriasProductos, ...categoriasAdmin])
  ].filter(Boolean);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActual === "Todos" || producto.categoria === categoriaActual;

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(textoBusqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  function productoEsFavorito(idProducto: string | number) {
    return favoritos.some((id) => String(id) === String(idProducto));
  }

  function toggleFavorito(idProducto: string | number) {
    if (!usuario) {
      alert("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    const existe = productoEsFavorito(idProducto);

    const favoritosActualizados = existe
      ? favoritos.filter((id) => String(id) !== String(idProducto))
      : [...favoritos, idProducto];

    const usuarioActualizado = {
      ...usuario,
      favoritos: favoritosActualizados
    };

    actualizarUsuario(usuarioActualizado);
    setFavoritos(favoritosActualizados);
  }

  return (
    <>
      <Navbar />

      <main className="container py-5 mt-5">
        <section className="hero-catalogo">
          <span className="catalogo-tag">Productos Naturales</span>

          <h1>Colección Vura</h1>

          <p>
            Productos seleccionados desde distintas zonas de Chile, enfocados en
            bienestar, naturaleza y tradición.
          </p>
        </section>

        <div className="productos-layout">
          <aside className="sidebar-filtros">
            <div className="buscador">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={textoBusqueda}
                onChange={(e) => setTextoBusqueda(e.target.value)}
              />
            </div>

            <div className="filtro-categorias">
              <details open>
                <summary>Categorías</summary>

                <ul>
                  {categorias.map((categoria) => (
                    <li key={categoria}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCategoriaActual(categoria);
                        }}
                      >
                        {categoria}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </aside>

          <section className="productos-grilla">
            {productosFiltrados.length === 0 ? (
              <div className="sin-productos text-center">
                <h3>No se encontraron productos</h3>
              </div>
            ) : (
              productosFiltrados.map((producto) => (
                <article className="producto-card" key={producto.id}>
                  <button
                    className={`btn-favorito ${
                      productoEsFavorito(producto.id) ? "favorito-activo" : ""
                    }`}
                    type="button"
                    onClick={() => toggleFavorito(producto.id)}
                    aria-label={
                      productoEsFavorito(producto.id)
                        ? "Quitar de favoritos"
                        : "Agregar a favoritos"
                    }
                  >
                    {productoEsFavorito(producto.id) ? "♥" : "♡"}
                  </button>

                  <img
                    src={resolverImagen(producto.imagen)}
                    alt={producto.nombre}
                  />

                  <h3>{producto.nombre}</h3>

                  <p>{producto.descripcion}</p>

                  <strong className="precio-card">
                    {formatearPrecio(producto.precio)}
                  </strong>

                  <Link to={`/productos/${producto.id}`} className="btn btn-dark">
                    Ver detalles
                  </Link>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    <Footer />
    </>
  );
}

export default Productos;