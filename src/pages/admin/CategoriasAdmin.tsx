import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Categoria } from "../../types/Categoria";
import {
  obtenerCategorias,
  crearCategoria,
  editarCategoria,
  eliminarCategoria
} from "../../services/categoriasStorage";
import { useAuth } from "../../context/AuthContext";

function CategoriasAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState("");
  const [categoriaEditandoId, setCategoriaEditandoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  async function cargarCategorias() {
    const categorias = await obtenerCategorias();
    setCategorias(categorias);
    }

    cargarCategorias();
  }, []);
  async function recargarCategorias() {
  const categorias = await obtenerCategorias();
    setCategorias(categorias);
  }

  async function handleSubmit( evento: React.FormEvent<HTMLFormElement>){
    evento.preventDefault();

    if (!nombre.trim()) {
      setError("Ingresa un nombre");
      return;
    }

    if (categoriaEditandoId) {
      await editarCategoria(categoriaEditandoId, {
        nombre: nombre.trim()
      });

      setCategoriaEditandoId(null);
    } else {
      await crearCategoria({
          id: "",
          nombre: nombre.trim()
      });
    }

    setNombre("");
    setError("");
    await recargarCategorias();
  }

  function cargarEditar(categoria: Categoria) {
    setCategoriaEditandoId(categoria.id);
    setNombre(categoria.nombre);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function handleEliminar(categoria: Categoria) {
    const confirmar = confirm(`¿Eliminar "${categoria.nombre}"?`);

    if (!confirmar) {
      return;
    }

    await eliminarCategoria(categoria.id);
    await recargarCategorias();
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
            <Link className="navbar-brand fw-bold" to="/">
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

      <main className="categorias-main">
        <section className="categorias-hero">
          <div className="container">
            <span className="admin-tag">Gestión Administrativa</span>

            <h1>Gestión de Categorías</h1>

            <p>
              Organiza y administra las categorías visibles dentro del catálogo
              Vura.
            </p>
          </div>
        </section>

        <section className="categorias-form-section">
          <div className="container">
            <div className="categorias-form card-base">
              <h2>
                {categoriaEditandoId ? "Editar Categoría" : "Crear Categoría"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nombre-categoria" className="form-label">
                    Nombre Categoría
                  </label>

                  <input
                    type="text"
                    id="nombre-categoria"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    maxLength={50}
                    required
                  />

                  {error && (
                    <p style={{ color: "#dc3545", marginTop: "8px" }}>
                      {error}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  {categoriaEditandoId ? "Actualizar Categoría" : "Guardar Categoría"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="categorias-lista-section">
          <div className="container">
            <div className="categorias-grid">
              {categorias.length === 0 ? (
                <p>No hay categorías registradas.</p>
              ) : (
                categorias.map((categoria) => (
                  <article className="categoria-card" key={categoria.id}>
                    <h3>{categoria.nombre}</h3>

                    <div className="categoria-actions">
                      <button
                        className="btn btn-outline-dark btn-editar"
                        type="button"
                        onClick={() => cargarEditar(categoria)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-dark btn-eliminar"
                        type="button"
                        onClick={() => handleEliminar(categoria)}
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
    </>
  );
}

export default CategoriasAdmin;