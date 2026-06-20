import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { blogs } from "../../data/blogsData";

function Blogs() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const categorias = [
    "Todos",
    "Recetas",
    "Cuidado Natural",
    "Herbolaria"
  ];

  const blogsFiltrados = blogs.filter((post) => {
    const coincideCategoria =
      categoriaActiva === "Todos" || post.categoria === categoriaActiva;

    const coincideBusqueda =
      post.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
      post.resumen.toLowerCase().includes(textoBusqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <>
      <Navbar />

      <main className="container blog-layout">
        <section className="blog-hero seccion-animada">
          <h1>Bienestar Natural y Vida Consciente</h1>

          <p>
            Descubre recetas, rituales naturales y consejos simples
            para conectar con una vida más equilibrada.
          </p>
        </section>

        <section className="blog-search seccion-animada">
          <form
            onSubmit={(evento) => {
              evento.preventDefault();
            }}
          >
            <input
              type="search"
              placeholder="Buscar recetas, bienestar o ingredientes..."
              aria-label="Buscar artículos"
              value={textoBusqueda}
              onChange={(evento) => setTextoBusqueda(evento.target.value)}
            />

            <button type="submit">
              Buscar
            </button>
          </form>

          <div className="blog-tags">
            <span>Filtrar:</span>

            {categorias.map((categoria) => (
              <a
                href="#"
                key={categoria}
                data-categoria={categoria}
                className={categoriaActiva === categoria ? "tag-activo" : ""}
                onClick={(evento) => {
                  evento.preventDefault();
                  setCategoriaActiva(categoria);
                }}
              >
                {categoria === "Todos" ? "Todos" : `#${categoria}`}
              </a>
            ))}
          </div>
        </section>

        <section className="grilla-articulos">
          {blogsFiltrados.length === 0 ? (
            <div className="sin-resultados text-center py-5">
              <h3>No se encontraron artículos</h3>
              <p>Intenta con otra categoría o búsqueda.</p>
            </div>
          ) : (
            blogsFiltrados.map((post) => (
              <article
                className="post-card seccion-animada"
                key={post.id}
              >
                <img
                  src={post.imagen}
                  alt={post.imagenAlt}
                />

                <div className="contenido-post">
                  <span className="etiqueta">
                    {post.categoria}
                  </span>

                  <h3>{post.titulo}</h3>

                  <p>{post.resumen}</p>

                  <Link
                    to={`/blogs/${post.id}`}
                    className="btn btn-outline-dark"
                  >
                    Leer artículo
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>

        <nav
          className="paginacion"
          aria-label="Paginación blog"
        >
          <a href="#" aria-label="Página anterior">«</a>
          <a href="#" className="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" aria-label="Página siguiente">»</a>
        </nav>
      </main>

      <Footer />
    </>
  );
}

export default Blogs;