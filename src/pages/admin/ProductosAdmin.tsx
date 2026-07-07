import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Producto } from "../../types/Producto";
import type { Categoria } from "../../types/Categoria";

import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto
} from "../../services/productosStorage";

import {
  obtenerCategorias
} from "../../services/categoriasStorage";

import { useAuth } from "../../context/AuthContext";
import { formatearPrecio } from "../../utils/formatters";
import { resolverImagen } from "../../utils/images";

function ProductosAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [productoEditandoId, setProductoEditandoId] =
    useState<string | number | null>(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [infoTexto, setInfoTexto] = useState("");
  const [uso, setUso] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      const productos = await obtenerProductos();
      const categorias = await obtenerCategorias();

      setProductos(productos);
      setCategorias(categorias);
    }

    cargarDatos();
  }, []);

  async function recargarProductos() {
    const productos = await obtenerProductos();
    setProductos(productos);
  }

  function limpiarFormulario() {
    setProductoEditandoId(null);
    setNombre("");
    setDescripcion("");
    setInfoTexto("");
    setUso("");
    setPrecio("");
    setCategoria("");
    setImagen("");
    setError("");
  }

  function obtenerInfoProducto(): string[] {
    return infoTexto
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  }

  async function handleSubmit(
    evento: React.FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();

    const precioNumber = Number(precio);
    const info = obtenerInfoProducto();

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !precioNumber ||
      !categoria ||
      info.length === 0 ||
      !uso.trim()
    ) {
      setError("Completa todos los campos obligatorios");
      return;
    }

    const imagenFinal = imagen.trim() || "logo.png";

    const datosProducto: Omit<Producto, "id"> = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioNumber,
      categoria,
      imagen: imagenFinal,
      zona: "general",
      miniaturas: [imagenFinal],
      info,
      uso: uso.trim()
    };

    if (productoEditandoId) {
      await editarProducto(
        String(productoEditandoId),
        datosProducto
      );
    } else {
      await crearProducto(datosProducto);
    }

    limpiarFormulario();
    await recargarProductos();
  }

  function cargarFormularioEditar(producto: Producto) {
    setProductoEditandoId(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(String(producto.precio));
    setCategoria(producto.categoria || "");
    setImagen(producto.imagen);
    setInfoTexto(producto.info?.join("\n") || "");
    setUso(producto.uso || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function handleEliminar(producto: Producto) {
    const confirmar = confirm(`¿Eliminar "${producto.nombre}"?`);

    if (!confirmar) {
      return;
    }

    await eliminarProducto(String(producto.id));
    await recargarProductos();
  }

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
                alt="Logo"
              />
              VURA
            </Link>

            <div className="ms-auto d-flex gap-2">
              <Link
                to="/intranet/admin"
                className="btn btn-outline-dark btn-sm"
              >
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

      <main className="productos-admin-main">
        <section className="productos-admin-hero">
          <div className="container">
            <div className="productos-admin-hero-content">
              <span className="admin-tag">Gestión Administrativa</span>

              <h1>Gestión de Productos</h1>

              <p>
                Administra los productos visibles dentro del catálogo principal
                de Vura.
              </p>
            </div>
          </div>
        </section>

        <section className="productos-form-section">
          <div className="container">
            <div className="productos-form card-base">
              <div className="form-header">
                <h2>
                  {productoEditandoId
                    ? "Editar Producto"
                    : "Crear Producto"}
                </h2>

                <p>Completa la información del producto.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="nombre-producto"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    id="nombre-producto"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    maxLength={80}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="descripcion-producto"
                    className="form-label"
                  >
                    Descripción
                  </label>

                  <textarea
                    id="descripcion-producto"
                    className="form-control"
                    rows={4}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    maxLength={300}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="info-producto"
                    className="form-label"
                  >
                    Información Técnica
                  </label>

                  <textarea
                    id="info-producto"
                    className="form-control"
                    rows={4}
                    placeholder={"Ej: 100% natural\nOrigen: Chile\nFormato: 30ml"}
                    value={infoTexto}
                    onChange={(e) => setInfoTexto(e.target.value)}
                    required
                  />

                  <small className="text-muted">
                    Escribe una característica por línea.
                  </small>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="uso-producto"
                    className="form-label"
                  >
                    Consejos de Uso
                  </label>

                  <textarea
                    id="uso-producto"
                    className="form-control"
                    rows={4}
                    placeholder="Ej: Aplicar durante la noche sobre la piel limpia."
                    value={uso}
                    onChange={(e) => setUso(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="precio-producto"
                    className="form-label"
                  >
                    Precio
                  </label>

                  <input
                    type="number"
                    id="precio-producto"
                    className="form-control"
                    min={0}
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="categoria-producto"
                    className="form-label"
                  >
                    Categoría
                  </label>

                  <select
                    id="categoria-producto"
                    className="form-control"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                  >
                    <option value="">
                      {categorias.length === 0
                        ? "No hay categorías creadas"
                        : "Selecciona una categoría"}
                    </option>

                    {categorias.map((categoriaItem) => (
                      <option
                        key={categoriaItem.id}
                        value={categoriaItem.nombre}
                      >
                        {categoriaItem.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="imagen-producto"
                    className="form-label"
                  >
                    URL Imagen
                  </label>

                  <input
                    type="text"
                    id="imagen-producto"
                    className="form-control"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                  />
                </div>

                {error && (
                  <p style={{ color: "#dc3545" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  {productoEditandoId
                    ? "Actualizar Producto"
                    : "Guardar Producto"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="productos-lista-section">
          <div className="container">
            <div className="lista-header">
              <h2>Productos Registrados</h2>

              <p>Productos creados dentro del sistema.</p>
            </div>

            <div className="productos-admin-grid">
              {productos.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                  No hay productos registrados.
                </p>
              ) : (
                productos.map((producto) => (
                  <article
                    className="producto-admin-card"
                    key={producto.id}
                  >
                    <img
                      src={resolverImagen(producto.imagen)}
                      alt={producto.nombre}
                      className="producto-admin-img"
                    />

                    <div className="producto-admin-body">
                      <h3>{producto.nombre}</h3>

                      <p>{producto.descripcion}</p>

                      <p className="mb-2">
                        <strong>Categoría:</strong>{" "}
                        {producto.categoria || "Sin categoría"}
                      </p>

                      <p className="mb-2">
                        <strong>Uso:</strong>{" "}
                        {producto.uso || "Sin información"}
                      </p>

                      <span className="producto-admin-precio">
                        {formatearPrecio(producto.precio)}
                      </span>

                      <div className="producto-admin-actions">
                        <button
                          className="btn btn-outline-dark btn-editar"
                          type="button"
                          onClick={() =>
                            cargarFormularioEditar(producto)
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-dark btn-eliminar"
                          type="button"
                          onClick={() =>
                            handleEliminar(producto)
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductosAdmin;