export type RolUsuario = "admin" | "cliente";

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  rol: RolUsuario;
  favoritos: Array<string | number>;
}