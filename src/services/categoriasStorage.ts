import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import type { Categoria } from "../types/Categoria";

const coleccionCategorias = collection(db, "categorias");

export async function obtenerCategorias(): Promise<Categoria[]> {
  const snapshot = await getDocs(coleccionCategorias);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...(documento.data() as Omit<Categoria, "id">)
  }));
}

export async function crearCategoria(
  nuevaCategoria: Categoria
): Promise<void> {
  await addDoc(coleccionCategorias, {
    nombre: nuevaCategoria.nombre
  });
}

export async function eliminarCategoria(
  idCategoria: string
): Promise<void> {
  const referencia = doc(db, "categorias", idCategoria);

  await deleteDoc(referencia);
}

export async function editarCategoria(
  idCategoria: string,
  datosActualizados: Partial<Categoria>
): Promise<void> {
  const referencia = doc(db, "categorias", idCategoria);

  await updateDoc(referencia, {
    ...datosActualizados
  });
}

export async function crearCategoriasDemo(): Promise<void> {
  const categorias = await obtenerCategorias();

  if (categorias.length > 0) {
    return;
  }

  const categoriasDemo = [
    { nombre: "Aromaterapia" },
    { nombre: "Cosmética Natural" },
    { nombre: "Bienestar" },
    { nombre: "Té Natural" }
  ];

  for (const categoria of categoriasDemo) {
    await addDoc(coleccionCategorias, categoria);
  }
}