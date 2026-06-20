import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { validarCorreo } from "../../utils/validaciones";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState<Record<string, string>>({});

  function validarFormulario() {
    const nuevosErrores: Record<string, string> = {
      correo: validarCorreo(correo),
      password:
        password.trim() === ""
          ? "Ingresa tu contraseña"
          : password.trim().length < 6
          ? "La contraseña debe tener mínimo 6 caracteres"
          : ""
    };

    setErrores(nuevosErrores);

    return Object.values(nuevosErrores).every((error) => error === "");
  }

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      setMensaje("Corrige los campos marcados antes de iniciar sesión");
      return;
    }

    const resultado = login(
      correo.trim().toLowerCase(),
      password.trim()
    );

    if (!resultado.ok) {
      setMensaje(resultado.mensaje || "Correo o contraseña incorrectos");

      setErrores({
        correo: "Revisa el correo ingresado",
        password: "Revisa la contraseña ingresada"
      });

      return;
    }

    setMensaje("Inicio de sesión correcto");
    setErrores({});

    setTimeout(() => {
      const sesion = JSON.parse(
        localStorage.getItem("sesionActiva") || "null"
      );

      if (sesion?.rol === "admin") {
        navigate("/intranet/admin");
      } else {
        navigate("/intranet/cliente");
      }
    }, 700);
  }

  return (
    <>
      <Navbar />

      <main className="login-main">
        <section className="login-hero">
          <div className="overlay-login"></div>

          <div className="container">
            <div className="login-layout">
              <article className="login-info">
                <span className="login-tag">Comunidad Vura</span>

                <h1>Bienvenido Nuevamente</h1>

                <p>
                  Accede a tu cuenta para continuar explorando productos
                  naturales y futuras funciones personalizadas dentro de Vura.
                </p>
              </article>

              <section className="login-card card-base">
                <div className="login-header">
                  <h2>Iniciar Sesión</h2>
                  <p>Ingresa tus credenciales.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                      Correo Electrónico
                    </label>

                    <input
                      type="email"
                      id="correo"
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
                      <p className="mensaje-error">
                        {errores.correo}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>

                    <input
                      type="password"
                      id="password"
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
                          password:
                            e.target.value.trim() === ""
                              ? "Ingresa tu contraseña"
                              : e.target.value.trim().length < 6
                              ? "La contraseña debe tener mínimo 6 caracteres"
                              : ""
                        });
                      }}
                      maxLength={50}
                    />

                    {errores.password && (
                      <p className="mensaje-error">
                        {errores.password}
                      </p>
                    )}
                  </div>

                  {mensaje && (
                        <div
                            className={
                            mensaje === "Inicio de sesión correcto"
                                ? "mensaje-exito-form"
                                : "mensaje-error-form"
                            }
                        >
                            {mensaje}
                        </div>
                        )}

                  <button
                    type="submit"
                    className="btn btn-dark w-100 btn-login"
                  >
                    Ingresar
                  </button>

                  <p className="texto-registro">
                    ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
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

export default Login;