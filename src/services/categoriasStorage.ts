import type { Categoria } from "../types/Categoria";

const STORAGE_CATEGORIAS = "categorias";

export function obtenerCategorias(): Categoria[] {
  return JSON.parse(localStorage.getItem(STORAGE_CATEGORIAS) || "[]");
}

export function guardarCategorias(categorias: Categoria[]): void {
  localStorage.setItem(STORAGE_CATEGORIAS, JSON.stringify(categorias));
}

export function crearCategoria(nuevaCategoria: Categoria): void {
  const categorias = obtenerCategorias();
  categorias.push(nuevaCategoria);
  guardarCategorias(categorias);
}

export function eliminarCategoria(idCategoria: string): void {
  const categorias = obtenerCategorias();

  const categoriasActualizadas = categorias.filter(
    categoria => categoria.id !== idCategoria
  );

  guardarCategorias(categoriasActualizadas);
}

export function editarCategoria(
  idCategoria: string,
  datosActualizados: Partial<Categoria>
): void {
  const categorias = obtenerCategorias();

  const categoriasActualizadas = categorias.map(categoria => {
    if (categoria.id === idCategoria) {
      return {
        ...categoria,
        ...datosActualizados
      };
    }

    return categoria;
  });

  guardarCategorias(categoriasActualizadas);
}

export function crearCategoriasDemo(): void {
  const categorias = obtenerCategorias();

  if (categorias.length > 0) {
    return;
  }

  const categoriasDemo: Categoria[] = [
    {
      id: crypto.randomUUID(),
      nombre: "Aromaterapia"
    },
    {
      id: crypto.randomUUID(),
      nombre: "Cosmética Natural"
    },
    {
      id: crypto.randomUUID(),
      nombre: "Bienestar"
    },
    {
      id: crypto.randomUUID(),
      nombre: "Té Natural"
    }
  ];

  guardarCategorias(categoriasDemo);
}