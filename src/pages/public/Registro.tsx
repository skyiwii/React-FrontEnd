import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registrarUsuario } from "../../services/authStorage";
import type { Usuario } from "../../types/Usuario";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  validarNombre,
  validarCorreo,
  validarPasswordSegura,
  obtenerRequisitosPassword
} from "../../utils/validaciones";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState<Record<string, string>>({});

  const requisitosPassword = obtenerRequisitosPassword(password);

  function validarFormulario() {
    const nuevosErrores: Record<string, string> = {
      nombre: validarNombre(nombre),
      correo: validarCorreo(correo),
      password: validarPasswordSegura(password),
      confirmarPassword:
        confirmarPassword.trim() === ""
          ? "Confirma tu contraseña"
          : password !== confirmarPassword
          ? "Las contraseñas no coinciden"
          : ""
    };

    setErrores(nuevosErrores);

    return Object.values(nuevosErrores).every((error) => error === "");
  }

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      setMensaje("Corrige los campos marcados antes de continuar");
      return;
    }

    const nuevoUsuario: Usuario = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      password: password.trim(),
      rol: "cliente",
      favoritos: []
    };

    const resultado = await registrarUsuario(nuevoUsuario);

    if (!resultado.ok) {
      setMensaje(resultado.mensaje || "No se pudo registrar");
      return;
    }

    setMensaje("Cuenta creada correctamente");

    setNombre("");
    setCorreo("");
    setPassword("");
    setConfirmarPassword("");
    setErrores({});

    setTimeout(() => {
      navigate("/login");
    }, 900);
  }

  return (
    <>
      <Navbar />

      <main className="registro-main">
        <section className="registro-hero">
          <div className="overlay-registro"></div>

          <div className="container">
            <div className="registro-layout">
              <article className="registro-info">
                <span className="registro-tag">Bienestar Natural</span>

                <h1>Únete a Vura</h1>

                <p>
                  Crea tu cuenta y descubre productos naturales,
                  recomendaciones personalizadas y futuras funciones exclusivas
                  para nuestra comunidad.
                </p>
              </article>

              <section className="registro-card card-base">
                <div className="registro-header">
                  <h2>Crear Cuenta</h2>
                  <p>Completa tus datos para registrarte.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="registro-nombre" className="form-label">
                      Nombre Completo
                    </label>

                    <input
                      type="text"
                      id="registro-nombre"
                      className={`form-control ${
                        errores.nombre
                          ? "input-error"
                          : nombre.length > 0
                          ? "input-ok"
                          : ""
                      }`}
                      value={nombre}
                      onChange={(e) => {
                        setNombre(e.target.value);
                        setErrores({
                          ...errores,
                          nombre: validarNombre(e.target.value)
                        });
                      }}
                      maxLength={60}
                    />

                    {errores.nombre && (
                      <p className="mensaje-error">{errores.nombre}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registro-email" className="form-label">
                      Correo Electrónico
                    </label>

                    <input
                      type="email"
                      id="registro-email"
                      className={`form-control ${
                        errores.correo
                          ? "input-error"
                          : correo.length > 0
                          ? "input-ok"
                          : ""
                      }`}
                      value={correo}
                      onChange={(e) => {
                        setCorreo(e.target.value);
                        setErrores({
                          ...errores,
                          correo: validarCorreo(e.target.value)
                        });
                      }}
                      maxLength={100}
                    />

                    {errores.correo && (
                      <p className="mensaje-error">{errores.correo}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registro-password" className="form-label">
                      Contraseña
                    </label>

                    <input
                      type="password"
                      id="registro-password"
                      className={`form-control ${
                        errores.password
                          ? "input-error"
                          : password.length > 0
                          ? "input-ok"
                          : ""
                      }`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrores({
                          ...errores,
                          password: validarPasswordSegura(e.target.value),
                          confirmarPassword:
                            confirmarPassword.length > 0 &&
                            e.target.value !== confirmarPassword
                              ? "Las contraseñas no coinciden"
                              : ""
                        });
                      }}
                      maxLength={50}
                    />

                    {errores.password && (
                      <p className="mensaje-error">{errores.password}</p>
                    )}

                    <div className="ayuda-password">
                      <span
                        className={`requisito-password ${
                          requisitosPassword.largo
                            ? "requisito-ok"
                            : "requisito-error"
                        }`}
                      >
                        {requisitosPassword.largo ? "✓" : "•"} Mínimo 8
                        caracteres
                      </span>

                      <span
                        className={`requisito-password ${
                          requisitosPassword.mayuscula
                            ? "requisito-ok"
                            : "requisito-error"
                        }`}
                      >
                        {requisitosPassword.mayuscula ? "✓" : "•"} Una
                        mayúscula
                      </span>

                      <span
                        className={`requisito-password ${
                          requisitosPassword.minuscula
                            ? "requisito-ok"
                            : "requisito-error"
                        }`}
                      >
                        {requisitosPassword.minuscula ? "✓" : "•"} Una
                        minúscula
                      </span>

                      <span
                        className={`requisito-password ${
                          requisitosPassword.numero
                            ? "requisito-ok"
                            : "requisito-error"
                        }`}
                      >
                        {requisitosPassword.numero ? "✓" : "•"} Un número
                      </span>

                      <span
                        className={`requisito-password ${
                          requisitosPassword.simbolo
                            ? "requisito-ok"
                            : "requisito-error"
                        }`}
                      >
                        {requisitosPassword.simbolo ? "✓" : "•"} Un símbolo
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="registro-confirmar-password"
                      className="form-label"
                    >
                      Confirmar Contraseña
                    </label>

                    <input
                      type="password"
                      id="registro-confirmar-password"
                      className={`form-control ${
                        errores.confirmarPassword
                          ? "input-error"
                          : confirmarPassword.length > 0
                          ? "input-ok"
                          : ""
                      }`}
                      value={confirmarPassword}
                      onChange={(e) => {
                        setConfirmarPassword(e.target.value);
                        setErrores({
                          ...errores,
                          confirmarPassword:
                            e.target.value !== password
                              ? "Las contraseñas no coinciden"
                              : ""
                        });
                      }}
                      maxLength={50}
                    />

                    {errores.confirmarPassword && (
                      <p className="mensaje-error">
                        {errores.confirmarPassword}
                      </p>
                    )}
                  </div>

                  {mensaje && (
                    <div
                      className={
                        mensaje.includes("correctamente")
                          ? "mensaje-exito-form"
                          : "mensaje-error-form"
                      }
                    >
                      {mensaje}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-dark w-100 btn-registro"
                  >
                    Crear Cuenta
                  </button>

                  <p className="texto-login">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                  </p>
                </form>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Registro;