export function resolverImagen(ruta?: string): string {
  if (!ruta) {
    return "/media/logo.png";
  }

  if (
    ruta.startsWith("http") ||
    ruta.startsWith("data:")
  ) {
    return ruta;
  }

  const nombreArchivo = ruta.split("/").pop();

  return `/media/${nombreArchivo}`;
}