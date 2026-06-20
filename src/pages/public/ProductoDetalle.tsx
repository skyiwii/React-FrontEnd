import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Producto } from "../../types/Producto";
import { obtenerProductos } from "../../services/productosStorage";
import { formatearPrecio } from "../../utils/formatters";
import { resolverImagen } from "../../utils/images";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";


function ProductoDetalle() {
  const { id } = useParams();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [imagenActual, setImagenActual] = useState("");

  useEffect(() => {
    const productosStorage = obtenerProductos();
    setProductos(productosStorage);

    const productoEncontrado = productosStorage.find(
      (producto) => String(producto.id) === String(id)
    );

    if (productoEncontrado) {
      setImagenActual(productoEncontrado.imagen);
    }
  }, [id]);

  const producto = productos.find(
    (productoItem) => String(productoItem.id) === String(id)
  );

  if (!producto) {
    return (
      <>
        <Navbar />

        <main className="producto-detalle-layout">
          <div className="text-center mt-5">
            <h2>Producto no encontrado</h2>

            <Link to="/productos" className="btn btn-dark mt-3">
              Volver a productos
            </Link>
          </div>
        </main>
      </>
    );
  }

  const miniaturasProducto = producto.miniaturas || [producto.imagen];

  const relacionados = productos.filter(
    (productoItem) => String(productoItem.id) !== String(producto.id)
  );

  return (
    <>
      <Navbar />

      <main className="producto-detalle-layout">
        <section className="producto-hero">
          <div className="container">
            <nav className="breadcrumb-custom" aria-label="breadcrumb">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <Link to="/productos">Productos</Link>
              <span>/</span>
              <span>{producto.nombre}</span>
            </nav>

            <div className="fila-detalle">
              <section className="producto-galeria">
                <div className="imagen-principal-wrapper">
                  <div className="badge-natural">NATURAL · ARTESANAL</div>

                  <img
                    className="img-principal"
                    src={resolverImagen(imagenActual || producto.imagen)}
                    alt={producto.nombre}
                    loading="lazy"
                  />
                </div>

                <div className="miniaturas">
                  {miniaturasProducto.map((imagenSrc) => (
                    <img
                      key={imagenSrc}
                      src={resolverImagen(imagenSrc)}
                      className={`miniatura-item ${
                        imagenActual === imagenSrc ? "activa" : ""
                      }`}
                      alt={producto.nombre}
                      onClick={() => setImagenActual(imagenSrc)}
                    />
                  ))}
                </div>
              </section>

              <section className="producto-info">
                <div className="producto-categoria">{producto.categoria}</div>

                <h1 className="producto-titulo">{producto.nombre}</h1>

                <p className="precio">{formatearPrecio(producto.precio)}</p>

                <div className="descripcion-corta">
                  <p>{producto.descripcion}</p>
                </div>

                <div className="beneficios-grid">
                  <article className="beneficio-item">
                    <h4>🌿 Ingredientes Naturales</h4>
                    <p>Elaborado con componentes cuidadosamente seleccionados.</p>
                  </article>

                  <article className="beneficio-item">
                    <h4>✨ Producción Artesanal</h4>
                    <p>Procesos responsables y de baja intervención.</p>
                  </article>

                  <article className="beneficio-item">
                    <h4>🤍 Bienestar Integral</h4>
                    <p>Pensado para hábitos conscientes y naturales.</p>
                  </article>

                  <article className="beneficio-item">
                    <h4>🚚 Envíos Nacionales</h4>
                    <p>Cobertura de despacho a distintas regiones de Chile.</p>
                  </article>
                </div>

                <div className="producto-accion">
                  <a
                    href="https://wa.me/56912345678"
                    target="_blank"
                    className="btn btn-dark btn-lg"
                  >
                    Consultar por WhatsApp
                  </a>

                  <Link to="/productos" className="btn btn-outline-dark btn-lg">
                    Ver más productos
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="detalles-tecnicos">
          <div className="container">
            <div className="detalles-grid">
              <article className="detalle-card">
                <h3>Información Técnica</h3>

                <ul>
                  {(producto.info || ["Producto agregado desde administración"]).map(
                    (item) => (
                      <li key={item}>{item}</li>
                    )
                  )}
                </ul>
              </article>

              <article className="detalle-card">
                <h3>Consejos de Uso</h3>

                <p>{producto.uso || "Producto agregado desde administración."}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="relacionados">
          <div className="container">
            <h2>También te puede interesar</h2>

            <div className="grilla-relacionados">
              {relacionados.map((productoRelacionado) => (
                <article className="card-mini" key={productoRelacionado.id}>
                  <div className="card-img">
                    <img
                      src={resolverImagen(productoRelacionado.imagen)}
                      alt={productoRelacionado.nombre}
                    />
                  </div>

                  <div className="card-body">
                    <h4>{productoRelacionado.nombre}</h4>

                    <p>{formatearPrecio(productoRelacionado.precio)}</p>

                    <Link
                      to={`/productos/${productoRelacionado.id}`}
                      className="btn btn-sm"
                    >
                      Ver producto
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    <Footer />
    </>
  );
}

export default ProductoDetalle;