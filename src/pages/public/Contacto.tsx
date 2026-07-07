import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { crearContacto } from "../../services/contactosStorage";

import {
  validarNombre,
  validarRut,
  validarCorreo,
  validarTelefono,
  validarMensaje
} from "../../utils/validaciones";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [aceptaDatos, setAceptaDatos] = useState(false);

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensajeSistema, setMensajeSistema] = useState("");

  async function handleSubmit(
  evento: React.FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();

    const nuevosErrores: Record<string, string> = {
      nombre: validarNombre(nombre),
      rut: validarRut(rut),
      correo: validarCorreo(correo),
      telefono: validarTelefono(telefono),
      asunto: asunto ? "" : "Selecciona un tipo de consulta",
      mensaje: validarMensaje(mensaje),
      aceptaDatos: aceptaDatos ? "" : "Debes aceptar el tratamiento de datos"
    };

    setErrores(nuevosErrores);

    const formularioValido = Object.values(nuevosErrores).every(
      (error) => error === ""
    );

    if (!formularioValido) {
      setMensajeSistema("");
      return;
    }

    await crearContacto({
      id: crypto.randomUUID(),
      origen: "Página Contacto",
      nombre: nombre.trim(),
      rut: rut.trim(),
      correo: correo.trim().toLowerCase(),
      telefono: telefono.trim(),
      asunto,
      mensaje: mensaje.trim(),
      fecha: new Date().toLocaleString("es-CL"),
      estado: "pendiente"
    });

    setMensajeSistema(
      "Tu mensaje fue enviado correctamente. Te responderemos lo antes posible."
    );

    setNombre("");
    setRut("");
    setCorreo("");
    setTelefono("");
    setAsunto("");
    setMensaje("");
    setAceptaDatos(false);
    setErrores({});
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="contacto-hero">
          <div className="contacto-hero-bg">
            <img
              src="/media/producto1-principal.jpg"
              alt="Bienestar natural Vura"
            />
          </div>

          <div className="contacto-overlay"></div>

          <div className="container contacto-hero-content">
            <span className="contacto-tag">CONTACTO</span>

            <h1>Hablemos de bienestar natural</h1>

            <p>
              ¿Tienes preguntas sobre nuestros productos, envíos o
              colaboraciones? Nuestro equipo responderá lo antes posible.
            </p>
          </div>
        </section>

        <section className="contacto-wrapper">
          <div className="container">
            <div className="contacto-grid">
              <div className="contacto-form-card">
                <div className="titulo-formulario">
                  <h2>Envíanos un mensaje</h2>

                  <p>
                    Completa el formulario y te responderemos dentro de las
                    próximas 24 horas.
                  </p>
                </div>

                <form className="formulario-contacto" onSubmit={handleSubmit}>
                  <div className="grupo-input">
                    <label htmlFor="nombre">Nombre completo</label>

                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ej: Juan Pérez"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className={
                        errores.nombre
                          ? "input-error"
                          : nombre.length > 0
                          ? "input-ok"
                          : ""
                      }
                      required
                      minLength={3}
                      maxLength={60}
                    />

                    {errores.nombre && (
                      <p className="mensaje-error">{errores.nombre}</p>
                    )}
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="rut">RUT</label>

                    <input
                      type="text"
                      id="rut"
                      name="rut"
                      placeholder="12345678-9"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      className={
                        errores.rut
                          ? "input-error"
                          : rut.length > 0
                          ? "input-ok"
                          : ""
                      }
                      maxLength={10}
                      required
                    />

                    {errores.rut && (
                      <p className="mensaje-error">{errores.rut}</p>
                    )}
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="correo">Correo electrónico</label>

                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      placeholder="correo@ejemplo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className={
                        errores.correo
                          ? "input-error"
                          : correo.length > 0
                          ? "input-ok"
                          : ""
                      }
                      required
                    />

                    {errores.correo && (
                      <p className="mensaje-error">{errores.correo}</p>
                    )}
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="telefono">Teléfono</label>

                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      placeholder="+56 9 1234 5678"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className={
                        errores.telefono
                          ? "input-error"
                          : telefono.length > 0
                          ? "input-ok"
                          : ""
                      }
                      maxLength={15}
                      required
                    />

                    {errores.telefono && (
                      <p className="mensaje-error">{errores.telefono}</p>
                    )}
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="asunto">Tipo de consulta</label>

                    <select
                      id="asunto"
                      name="asunto"
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      className={
                        errores.asunto
                          ? "input-error"
                          : asunto
                          ? "input-ok"
                          : ""
                      }
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Consulta de producto">
                        Consulta de producto
                      </option>
                      <option value="Estado de envío">Estado de envío</option>
                      <option value="Venta mayorista">Venta mayorista</option>
                      <option value="Colaboraciones">Colaboraciones</option>
                      <option value="Otro">Otro</option>
                    </select>

                    {errores.asunto && (
                      <p className="mensaje-error">{errores.asunto}</p>
                    )}
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="mensaje">Mensaje</label>

                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={6}
                      placeholder="Escribe tu mensaje..."
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      className={
                        errores.mensaje
                          ? "input-error"
                          : mensaje.length > 0
                          ? "input-ok"
                          : ""
                      }
                      required
                      minLength={10}
                      maxLength={600}
                    ></textarea>

                    {errores.mensaje && (
                      <p className="mensaje-error">{errores.mensaje}</p>
                    )}
                  </div>

                  <label className="checkbox-custom">
                    <input
                      type="checkbox"
                      checked={aceptaDatos}
                      onChange={(e) => setAceptaDatos(e.target.checked)}
                      required
                    />

                    <span>
                      Acepto el tratamiento de mis datos para recibir respuesta.
                    </span>
                  </label>

                  {errores.aceptaDatos && (
                    <p className="mensaje-error">{errores.aceptaDatos}</p>
                  )}

                  {mensajeSistema && (
                    <div className="mensaje-exito-form">
                      {mensajeSistema}
                    </div>
                  )}

                  <button type="submit" className="btn-contacto">
                    Enviar mensaje
                  </button>
                </form>
              </div>

              <aside className="contacto-info">
                <div className="info-box">
                  <span className="info-label">UBICACIÓN</span>

                  <h3>Vura Bazar Natural</h3>

                  <p>Copiapó, Región de Atacama, Chile</p>
                </div>

                <div className="info-box">
                  <span className="info-label">HORARIOS</span>

                  <p>Lunes a Viernes</p>

                  <strong>09:00 — 18:00</strong>
                </div>

                <div className="info-box">
                  <span className="info-label">CONTACTO</span>

                  <p>contacto@vura.cl</p>

                  <p>+56 9 1234 5678</p>
                </div>

                <div className="info-box redes-box">
                  <span className="info-label">REDES</span>

                  <div className="redes-links">
                    <a href="#">Instagram</a>
                    <a href="#">WhatsApp</a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mapa-section">
          <div className="container">
            <div className="mapa-header">
              <span>VISÍTANOS</span>

              <h2>Nuestro espacio natural</h2>
            </div>

            <div className="mapa-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1775888903721!6m8!1m7!1slm1T1Bug7ttdtABJ0w0PxQ!2m2!1d-27.37325056928993!2d-70.3230668236798!3f125.26825256874693!4f-12.695729682761922!5f0.7820865974627469"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa Vura"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contacto;