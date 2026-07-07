import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import type { Producto } from "../types/Producto";

const coleccionProductos = collection(db, "productos");

export async function obtenerProductos(): Promise<Producto[]> {
  const snapshot = await getDocs(coleccionProductos);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...(documento.data() as Omit<Producto, "id">)
  }));
}

export async function obtenerProductoPorId(
  id: string
): Promise<Producto | undefined> {
  const documento = await getDoc(doc(db, "productos", id));

  if (!documento.exists()) {
    return undefined;
  }

  return {
    id: documento.id,
    ...(documento.data() as Omit<Producto, "id">)
  };
}

export async function crearProducto(
  nuevoProducto: Omit<Producto, "id">
): Promise<void> {
  await addDoc(coleccionProductos, nuevoProducto);
}

export async function eliminarProducto(
  id: string
): Promise<void> {
  await deleteDoc(doc(db, "productos", id));
}

export async function editarProducto(
  id: string,
  datos: Partial<Producto>
): Promise<void> {
  await updateDoc(
    doc(db, "productos", id),
    datos
  );
}