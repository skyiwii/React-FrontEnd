import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function NotFound() {
  return (
    <>
      <Navbar />

      <main className="container text-center py-5">
        <section className="card-base p-5 mt-5">
          <h1>404</h1>

          <h2>Página no encontrada</h2>

          <p>
            La ruta que intentas visitar no existe o fue movida.
          </p>

          <Link to="/" className="btn btn-dark mt-3">
            Volver al inicio
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default NotFound;