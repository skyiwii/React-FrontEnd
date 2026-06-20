import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Producto } from "../../types/Producto";
import { obtenerProductos } from "../../services/productosStorage";
import { formatearPrecio } from "../../utils/formatters";
import { resolverImagen } from "../../utils/images";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { blogs } from "../../data/blogsData";
import WidgetContacto from "../../components/contacto/WidgetContacto";


function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const destacados = productos.slice(0, 3);

    return (
    <>
        <Navbar />

        <main>
        <section
            id="Inicio"
            className="hero-video d-flex align-items-center position-relative overflow-hidden"
        >
            <video autoPlay muted loop playsInline className="video-bg">
            <source src="/media/fondo.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5
            </video>

            <div className="overlay-video"></div>

            <div className="container text-center text-white contenido-hero">
            <div className="row justify-content-center">
                <div className="col-md-8 p-4 hero-box">
                <h1 className="display-1 fw-bold">Vura</h1>

                <h2 className="display-5">Esencia Natural</h2>

                <p className="lead mb-4">
                    Conectando la esencia de la tierra con tu bienestar diario.
                </p>

                <Link
                    to="/productos"
                    className="btn btn-outline-light btn-lg px-5 shadow"
                >
                    Explorar Catálogo
                </Link>
                </div>
            </div>
            </div>
        </section>

        <section id="Destacados" className="seccion-animada">
            <h2>Lo más comprado</h2>

            <div className="contenedor-blog-destacados">
            {destacados.length === 0 ? (
                <article className="producto-card-carrusel">
                <h3>No se encontraron productos</h3>
                <p>¡Por ahora no tenemos productos!</p>
                </article>
            ) : (
                destacados.map((producto) => (
                <article className="producto-card-carrusel" key={producto.id}>
                    <img
                    src={resolverImagen(producto.imagen)}
                    alt={producto.nombre}
                    />

                    <h3>{producto.nombre}</h3>

                    <p>{formatearPrecio(producto.precio)}</p>

                    <Link
                    to={`/productos/${producto.id}`}
                    className="btn btn-primary"
                    >
                    Ver más detalles
                    </Link>
                </article>
                ))
            )}
            </div>
        </section>

        <section id="Zonas-Chile">
            <div className="zona-full norte">
            <div className="overlay"></div>

            <div className="contenido-zona">
                <h2>Norte Árido</h2>

                <p>Frutos secos y sales ancestrales del desierto.</p>

                <Link to="/productos" className="btn btn-light">
                Explorar Norte
                </Link>
            </div>
            </div>

            <div className="zona-full centro">
            <div className="overlay"></div>

            <div className="contenido-zona">
                <h2>Valle Central</h2>

                <p>Cosmética natural y lectura consciente.</p>

                <Link to="/productos" className="btn btn-light">
                Explorar Centro
                </Link>
            </div>
            </div>

            <div className="zona-full sur">
            <div className="overlay"></div>

            <div className="contenido-zona">
                <h2>Sur Nativo</h2>

                <p>Mieles e infusiones del bosque lluvioso.</p>

                <Link to="/productos" className="btn btn-light">
                Explorar Sur
                </Link>
            </div>
            </div>
        </section>

        <section id="nuestro-blog" className="seccion-animada">
        <h2>Historias y Recetas Destacadas</h2>

        <p className="text-center mb-5">
            Lo más leído de nuestra comunidad natural
        </p>

        <div className="contenedor-blog-destacados">
            {blogs.slice(0, 3).map((post) => (
            <article className="blog-card" key={post.id}>
                <div className="badge-vistas">
                👁️ {post.vistas}
                </div>

                <div className="blog-img">
                <img
                    src={post.imagen}
                    alt={post.imagenAlt}
                />
                </div>

                <h3>{post.titulo}</h3>

                <p>{post.resumen}</p>

                <div className="reacciones-preview">
                😍 {post.reacciones.love} | 🙂 {post.reacciones.like}
                </div>

                <Link
                to={`/blogs/${post.id}`}
                className="btn btn-outline-dark m-3"
                >
                Leer entrada
                </Link>
            </article>
            ))}
        </div>

        <div className="text-center mt-4">
            <Link to="/blogs" className="btn btn-dark">
            Ver todos los Blogs
            </Link>
        </div>
        </section>

        
        <WidgetContacto />


        </main>
        
        
        <Footer />
    </>
    );
}

export default Home;