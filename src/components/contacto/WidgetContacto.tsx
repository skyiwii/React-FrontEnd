import { useEffect, useState } from "react";

import { crearContacto } from "../../services/contactosStorage";

import {
  validarNombre,
  validarRut,
  validarCorreo,
  validarTelefono,
  validarMensaje
} from "../../utils/validaciones";

function WidgetContacto() {
  const [visible, setVisible] = useState(false);

  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensajeSistema, setMensajeSistema] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(
  evento: React.FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();

    const nuevosErrores: Record<string, string> = {
      nombre: validarNombre(nombre),
      rut: validarRut(rut),
      correo: validarCorreo(correo),
      telefono: validarTelefono(telefono),
      mensaje: validarMensaje(mensaje)
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
        origen: "Widget Inicio",
        nombre: nombre.trim(),
        rut: rut.trim(),
        correo: correo.trim().toLowerCase(),
        telefono: telefono.trim(),
        asunto: "Consulta desde widget",
        mensaje: mensaje.trim(),
        fecha: new Date().toLocaleString("es-CL"),
        estado: "pendiente"
    });

    setMensajeSistema("Consulta enviada correctamente");

    setNombre("");
    setRut("");
    setCorreo("");
    setTelefono("");
    setMensaje("");
    setErrores({});

    setTimeout(() => {
      setMensajeSistema("");
      setVisible(false);
    }, 1400);
  }

  return (
    <aside
      id="notificacion-contacto"
      className={`contacto-flotante ${visible ? "visible" : "oculto"}`}
      aria-hidden={!visible}
    >
      <div className="card shadow-lg p-3 position-relative">
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Cerrar notificación"
          onClick={() => setVisible(false)}
        ></button>

        <h6 className="text-center mb-3">¿Tienes dudas?</h6>

        <form className="formulario-widget" onSubmit={handleSubmit}>
          <input
            type="text"
            className={`form-control mb-2 ${
              errores.nombre
                ? "input-error"
                : nombre.length > 0
                ? "input-ok"
                : ""
            }`}
            placeholder="Tu nombre"
            maxLength={60}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          {errores.nombre && (
            <p className="mensaje-error">{errores.nombre}</p>
          )}

          <input
            type="text"
            className={`form-control mb-2 ${
              errores.rut
                ? "input-error"
                : rut.length > 0
                ? "input-ok"
                : ""
            }`}
            placeholder="RUT: 12345678-9"
            maxLength={10}
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />

          {errores.rut && (
            <p className="mensaje-error">{errores.rut}</p>
          )}

          <input
            type="email"
            className={`form-control mb-2 ${
              errores.correo
                ? "input-error"
                : correo.length > 0
                ? "input-ok"
                : ""
            }`}
            placeholder="Tu email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          {errores.correo && (
            <p className="mensaje-error">{errores.correo}</p>
          )}

          <input
            type="tel"
            className={`form-control mb-2 ${
              errores.telefono
                ? "input-error"
                : telefono.length > 0
                ? "input-ok"
                : ""
            }`}
            placeholder="+56 9 1234 5678"
            maxLength={15}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          {errores.telefono && (
            <p className="mensaje-error">{errores.telefono}</p>
          )}

          <textarea
            className={`form-control mb-3 ${
              errores.mensaje
                ? "input-error"
                : mensaje.length > 0
                ? "input-ok"
                : ""
            }`}
            rows={3}
            placeholder="¿En qué te ayudamos?"
            minLength={10}
            maxLength={300}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          ></textarea>

          {errores.mensaje && (
            <p className="mensaje-error">{errores.mensaje}</p>
          )}

          {mensajeSistema && (
            <div className="mensaje-exito-form">
              {mensajeSistema}
            </div>
          )}

          <button type="submit" className="btn btn-dark">
            Enviar
          </button>
        </form>
      </div>
    </aside>
  );
}

export default WidgetContacto;