import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { blogs } from "../../data/blogsData";

function BlogPost() {
  const { id } = useParams();

  const post = blogs.find(
    (blog) => String(blog.id) === String(id)
  );

  if (!post) {
    return (
      <>
        <Navbar />

        <main className="contenedor-articulo">
          <div className="text-center py-5 mt-5">
            <h2>Artículo no encontrado</h2>

            <Link to="/blogs" className="btn btn-outline-dark mt-3">
              Volver al blog
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="contenedor-articulo">
        <section className="post-hero seccion-animada">
          <div className="container">
            <nav className="breadcrumb-custom">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <Link to="/blogs">Blog</Link>
              <span>/</span>
              <span>{post.categoria}</span>
            </nav>

            <div className="post-categoria">
              {post.categoriaLabel}
            </div>

            <h1>{post.titulo}</h1>

            <p className="post-subtitulo">
              {post.subtitulo}
            </p>

            <div className="meta-data">
              <span>{post.fecha}</span>
              <span>•</span>
              <span>{post.lectura}</span>
              <span>•</span>
              <span>{post.autor}</span>
            </div>
          </div>
        </section>

        <section className="post-imagen-principal seccion-animada">
          <img
            src={post.imagen}
            className="img-fluid"
            alt={post.imagenAlt}
          />
        </section>

        <section className="post-contenido seccion-animada">
          <p
            className="introduccion"
            dangerouslySetInnerHTML={{
              __html: post.contenido.introduccion
            }}
          />

          {post.contenido.secciones.map((seccion, index) => {
            if (seccion.tipo === "h3") {
              return <h3 key={index}>{seccion.texto}</h3>;
            }

            if (seccion.tipo === "ul") {
              return (
                <ul key={index}>
                  {seccion.items?.map((item) => (
                    <li
                      key={item}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              );
            }

            if (seccion.tipo === "ol") {
              return (
                <ol key={index}>
                  {seccion.items?.map((item) => (
                    <li
                      key={item}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ol>
              );
            }

            if (seccion.tipo === "blockquote") {
              return (
                <blockquote key={index}>
                  {seccion.texto}
                </blockquote>
              );
            }

            return (
              <p key={index}>
                {seccion.texto}
              </p>
            );
          })}
        </section>

        <section className="interaccion-blog seccion-animada">
          <div className="post-estadisticas">
            <div className="estadistica-item">
              👁️ <span>{post.vistas}</span> lecturas
            </div>

            <div className="estadistica-item">
              💬 <span>{post.comentariosCount}</span> comentarios
            </div>
          </div>

          <div className="reacciones-post">
            <h3>¿Qué te pareció este artículo?</h3>

            <div className="reacciones-grid">
              <button type="button" className="reaccion-btn">
                ❤️ <span>{post.reacciones.love}</span>
              </button>

              <button type="button" className="reaccion-btn">
                👍 <span>{post.reacciones.like}</span>
              </button>

              <button type="button" className="reaccion-btn">
                😐 <span>{post.reacciones.neutral}</span>
              </button>

              <button type="button" className="reaccion-btn">
                👎 <span>{post.reacciones.dislike}</span>
              </button>
            </div>
          </div>

          <div className="comentarios-seccion">
            <div className="comentarios-header">
              <h3>Comentarios</h3>

              <select className="orden-comentarios">
                <option value="recientes">Más recientes</option>
                <option value="valorados">Más valorados</option>
              </select>
            </div>

            <form className="form-comentario">
              <div className="comentario-top-form">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre o apodo"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Comparte tu opinión... (mínimo 10 caracteres)"
                  maxLength={500}
                ></textarea>
              </div>

              <div className="comentario-opciones">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Notificarme si alguien responde
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Publicar comentario
              </button>
            </form>

            <div className="lista-comentarios">
              {post.comentarios.map((comentario) => (
                <article className="comentario-item" key={comentario.id}>
                  <div className="comentario-header">
                    <div className="comentario-user">
                      <div className="avatar">
                        {comentario.avatar}
                      </div>

                      <div>
                        <strong>{comentario.nombre}</strong>
                        <span>{comentario.tiempo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="comentario-body">
                    <p>{comentario.texto}</p>
                  </div>

                  <div className="comentario-acciones">
                    <button type="button">
                      👍 <span>{comentario.likes}</span>
                    </button>

                    <button type="button">
                      👎 <span>{comentario.dislikes}</span>
                    </button>

                    <button type="button">
                      Responder
                    </button>
                  </div>

                  {comentario.respuestas?.map((respuesta) => (
                    <article
                      className="comentario-item respuesta"
                      key={respuesta.id}
                    >
                      <div className="comentario-header">
                        <div className="comentario-user">
                          <div className="avatar">
                            {respuesta.avatar}
                          </div>

                          <div>
                            <strong>{respuesta.nombre}</strong>
                            <span>{respuesta.tiempo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="comentario-body">
                        <p>{respuesta.texto}</p>
                      </div>
                    </article>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="post-navegacion seccion-animada">
          <div className="fila">
            <div className="anterior">
              {post.anterior && (
                <>
                  <span>Artículo anterior</span>
                  <p>
                    <Link to={`/blogs/${post.anterior.id}`}>
                      {post.anterior.titulo}
                    </Link>
                  </p>
                </>
              )}
            </div>

            <div className="siguiente">
              {post.siguiente && (
                <>
                  <span>Siguiente artículo</span>
                  <p>
                    <Link to={`/blogs/${post.siguiente.id}`}>
                      {post.siguiente.titulo}
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default BlogPost;