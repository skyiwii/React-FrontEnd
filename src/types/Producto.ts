export interface Producto {
  id: string | number;
  nombre: string;
  precio: number;
  categoria: string;
  zona: string;
  descripcion: string;
  imagen: string;
  miniaturas?: string[];
  info?: string[];
  uso?: string;
}