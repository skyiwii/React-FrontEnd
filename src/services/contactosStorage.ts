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

import type { Contacto } from "../types/Contacto";

const COLECCION = "contactos";

export async function obtenerContactos(): Promise<Contacto[]> {
  const snapshot = await getDocs(collection(db, COLECCION));

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...(documento.data() as Omit<Contacto, "id">)
  }));
}

export async function crearContacto(
  nuevoContacto: Contacto
): Promise<void> {

  const { id, ...datos } = nuevoContacto;

  await addDoc(
    collection(db, COLECCION),
    datos
  );

}

export async function editarContacto(
  idContacto: string,
  datosActualizados: Partial<Contacto>
): Promise<void> {

  await updateDoc(
    doc(db, COLECCION, idContacto),
    datosActualizados
  );

}

export async function eliminarContacto(
  idContacto: string
): Promise<void> {

  await deleteDoc(
    doc(db, COLECCION, idContacto)
  );

}

export async function marcarContactoRespondido(
  idContacto: string
): Promise<void> {

  await editarContacto(idContacto, {
    estado: "respondido"
  });

}

export async function archivarContacto(
  idContacto: string
): Promise<void> {

  await editarContacto(idContacto, {
    estado: "archivado"
  });

}

export async function buscarContactoPorCorreo(
  correo: string
): Promise<Contacto | null> {

  const consulta = query(
    collection(db, COLECCION),
    where("correo", "==", correo)
  );

  const snapshot = await getDocs(consulta);

  if (snapshot.empty) {
    return null;
  }

  const documento = snapshot.docs[0];

  return {
    id: documento.id,
    ...(documento.data() as Omit<Contacto, "id">)
  };

}