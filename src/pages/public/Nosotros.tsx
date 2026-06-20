import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Nosotros() {
  return (
    <>
      <Navbar />

      <main>
        <section className="nosotros-hero">
          <div className="container hero-contenido">
            <span className="hero-etiqueta">
              Origen Natural Chileno
            </span>

            <h1>Nuestra Esencia</h1>

            <p>
              Conectando la sabiduría de la tierra chilena
              con bienestar auténtico y consciente.
            </p>
          </div>
        </section>

        <section className="historia-section">
          <div className="container">
            <div className="historia-grid">
              <div className="historia-texto">
                <h2>Nuestra Historia</h2>

                <p>
                  Vura nació en el corazón de Chile como una respuesta
                  a la necesidad de volver a lo natural.
                </p>

                <p>
                  Trabajamos con productores locales, asegurando calidad
                  desde el origen hasta tu hogar.
                </p>
              </div>

              <div className="historia-imagen">
                <img
                  src="/media/productos-naturales.jpg"
                  className="img-fluid"
                  alt="Productos naturales Vura"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="valores-section">
          <div className="container text-center">
            <h2>Lo que nos mueve</h2>

            <div className="row mt-5 gy-4">
              <div className="col-md-4">
                <article className="valor-card card-base">
                  <div className="icono">🌿</div>

                  <h3>Pureza</h3>

                  <p>Productos 100% naturales.</p>
                </article>
              </div>

              <div className="col-md-4">
                <article className="valor-card card-base">
                  <div className="icono">🇨🇱</div>

                  <h3>Origen Local</h3>

                  <p>Apoyamos productores chilenos.</p>
                </article>
              </div>

              <div className="col-md-4">
                <article className="valor-card card-base">
                  <div className="icono">♻️</div>

                  <h3>Consciencia</h3>

                  <p>Compromiso ambiental real.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="nosotros-final text-center">
          <div className="container">
            <h2>¿Listo para empezar?</h2>

            <p>Explora nuestra selección natural.</p>

            <Link to="/productos" className="btn btn-light">
              Ver Catálogo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Nosotros;