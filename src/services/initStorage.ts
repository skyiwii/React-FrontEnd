import { productosBase } from "../data/productosBase";
import { guardarProductos } from "./productosStorage";
import { crearAdminDefault } from "./authStorage";
import { crearCategoriasDemo } from "./categoriasStorage";

export function inicializarStorage(): void {
  const productosGuardados = localStorage.getItem("productos");

  if (!productosGuardados) {
    guardarProductos(productosBase);
  }

  crearAdminDefault();
  crearCategoriasDemo();
}