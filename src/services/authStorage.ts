import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import type { Usuario } from "../types/Usuario";

const coleccionUsuarios = collection(db, "usuarios");

const STORAGE_SESION = "sesionActiva";

export interface ResultadoAuth {
  ok: boolean;
  mensaje?: string;
  usuario?: Usuario;
}

export async function obtenerUsuarios(): Promise<Usuario[]> {

  const snapshot = await getDocs(coleccionUsuarios);

  return snapshot.docs.map(documento => ({
    id: documento.id,
    ...(documento.data() as Omit<Usuario, "id">)
  }));

}

export async function registrarUsuario(
  usuarioNuevo: Omit<Usuario, "id">
): Promise<ResultadoAuth> {

  const consulta = query(
    coleccionUsuarios,
    where("correo", "==", usuarioNuevo.correo)
  );

  const resultado = await getDocs(consulta);

  if (!resultado.empty) {

    return {
      ok: false,
      mensaje: "El correo ya está registrado"
    };

  }

  await addDoc(
    coleccionUsuarios,
    usuarioNuevo
  );

  return {
    ok: true
  };

}

export async function iniciarSesion(
  correo: string,
  password: string
): Promise<ResultadoAuth> {

  const consulta = query(
    coleccionUsuarios,
    where("correo", "==", correo)
  );

  const resultado = await getDocs(consulta);

  if (resultado.empty) {

    return {
      ok: false,
      mensaje: "Correo o contraseña incorrectos"
    };

  }

  const documento = resultado.docs[0];

  const usuario = {
    id: documento.id,
    ...(documento.data() as Omit<Usuario, "id">)
  };

  if (usuario.password !== password) {

    return {
      ok: false,
      mensaje: "Correo o contraseña incorrectos"
    };

  }

  localStorage.setItem(
    STORAGE_SESION,
    JSON.stringify(usuario)
  );

  return {
    ok: true,
    usuario
  };

}

export function obtenerSesion(): Usuario | null {

  return JSON.parse(
    localStorage.getItem(STORAGE_SESION) || "null"
  );

}

export function guardarSesion(usuario: Usuario): void {

  localStorage.setItem(
    STORAGE_SESION,
    JSON.stringify(usuario)
  );

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

export async function crearAdminDefault(): Promise<void> {

  const consulta = query(
    coleccionUsuarios,
    where("rol", "==", "admin")
  );

  const resultado = await getDocs(consulta);

  if (!resultado.empty) {

    return;

  }

  await addDoc(
    coleccionUsuarios,
    {
      nombre: "Administrador",
      correo: "admin@vura.cl",
      password: "Admin123",
      rol: "admin",
      favoritos: []
    }
  );

}

export async function actualizarUsuario(
  usuarioActualizado: Usuario
): Promise<void> {

  const { id, ...datos } = usuarioActualizado;

  await updateDoc(
    doc(db, "usuarios", id),
    datos
  );

  guardarSesion(usuarioActualizado);

}

export async function eliminarUsuario(
  id: string
): Promise<void> {

  await deleteDoc(
    doc(db, "usuarios", id)
  );

}