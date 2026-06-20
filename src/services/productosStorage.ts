import type { Producto } from "../types/Producto";

const STORAGE_PRODUCTOS = "productos";

export function obtenerProductos(): Producto[] {
  return JSON.parse(localStorage.getItem(STORAGE_PRODUCTOS) || "[]");
}

export function guardarProductos(productos: Producto[]): void {
  localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(productos));
}

export function crearProducto(nuevoProducto: Producto): void {
  const productos = obtenerProductos();
  productos.push(nuevoProducto);
  guardarProductos(productos);
}

export function eliminarProducto(idProducto: string | number): void {
  const productos = obtenerProductos();

  const productosActualizados = productos.filter(
    producto => String(producto.id) !== String(idProducto)
  );

  guardarProductos(productosActualizados);
}

export function obtenerProductoPorId(idProducto: string | number): Producto | undefined {
  const productos = obtenerProductos();

  return productos.find(
    producto => String(producto.id) === String(idProducto)
  );
}

export function editarProducto(
  idProducto: string | number,
  datosActualizados: Partial<Producto>
): void {
  const productos = obtenerProductos();

  const productosActualizados = productos.map(producto => {
    if (String(producto.id) === String(idProducto)) {
      return {
        ...producto,
        ...datosActualizados
      };
    }

    return producto;
  });

  guardarProductos(productosActualizados);
}