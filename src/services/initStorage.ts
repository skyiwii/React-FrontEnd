import { productosBase } from "../data/productosBase";

import {
  obtenerProductos,
  crearProducto
} from "./productosStorage";

import { crearAdminDefault } from "./authStorage";
import { crearCategoriasDemo } from "./categoriasStorage";

export async function inicializarStorage(): Promise<void> {

  const productos = await obtenerProductos();

  if (productos.length === 0) {

    for (const producto of productosBase) {

      const { id, ...datosProducto } = producto;

      await crearProducto(datosProducto);

    }

  }

  await crearAdminDefault();

  await crearCategoriasDemo();

}