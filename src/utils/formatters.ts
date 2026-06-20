export function formatearPrecio(precio: number): string {
  return `$${Number(precio).toLocaleString("es-CL")}`;
}