import type { Usuario } from "../types/Usuario";

const STORAGE_USUARIOS = "usuarios";
const STORAGE_SESION = "sesionActiva";

export interface ResultadoAuth {
  ok: boolean;
  mensaje?: string;
  usuario?: Usuario;
}

export function obtenerUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem(STORAGE_USUARIOS) || "[]");
}

export function guardarUsuarios(usuarios: Usuario[]): void {
  localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));
}

export function registrarUsuario(usuarioNuevo: Usuario): ResultadoAuth {
  const usuarios = obtenerUsuarios();

  const existeUsuario = usuarios.some(
    usuario => usuario.correo === usuarioNuevo.correo
  );

  if (existeUsuario) {
    return {
      ok: false,
      mensaje: "El correo ya está registrado"
    };
  }

  usuarios.push(usuarioNuevo);
  guardarUsuarios(usuarios);

  return {
    ok: true
  };
}

export function iniciarSesion(
  correo: string,
  password: string
): ResultadoAuth {
  const usuarios = obtenerUsuarios();

  const usuarioEncontrado = usuarios.find(
    usuario => usuario.correo === correo && usuario.password === password
  );

  if (!usuarioEncontrado) {
    return {
      ok: false,
      mensaje: "Correo o contraseña incorrectos"
    };
  }

  localStorage.setItem(STORAGE_SESION, JSON.stringify(usuarioEncontrado));

  return {
    ok: true,
    usuario: usuarioEncontrado
  };
}

export function obtenerSesion(): Usuario | null {
  return JSON.parse(localStorage.getItem(STORAGE_SESION) || "null");
}

export function guardarSesion(usuario: Usuario): void {
  localStorage.setItem(STORAGE_SESION, JSON.stringify(usuario));
}

export function obtenerUsuarioActual(): Usuario | null {
  return obtenerSesion();
}

export function usuarioLogueado(): boolean {
  return obtenerSesion() !== null;
}

export function cerrarSesionStorage(): void {
  localStorage.removeItem(STORAGE_SESION);
}

export function esAdmin(): boolean {
  const sesion = obtenerSesion();

  if (!sesion) {
    return false;
  }

  return sesion.rol === "admin";
}

export function crearAdminDefault(): void {
  const usuarios = obtenerUsuarios();

  const existeAdmin = usuarios.some(
    usuario => usuario.rol === "admin"
  );

  if (existeAdmin) {
    return;
  }

  const admin: Usuario = {
    id: crypto.randomUUID(),
    nombre: "Administrador",
    correo: "admin@vura.cl",
    password: "Admin123",
    rol: "admin",
    favoritos: []
  };

  usuarios.push(admin);
  guardarUsuarios(usuarios);
}

export function actualizarUsuario(usuarioActualizado: Usuario): void {
  const usuarios = obtenerUsuarios();

  const usuariosActualizados = usuarios.map(usuario => {
    if (String(usuario.id) === String(usuarioActualizado.id)) {
      return usuarioActualizado;
    }

    return usuario;
  });

  guardarUsuarios(usuariosActualizados);
  guardarSesion(usuarioActualizado);
}