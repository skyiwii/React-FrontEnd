export type EstadoContacto = "pendiente" | "respondido" | "archivado";

export interface Contacto {
  id: string;
  origen: string;
  nombre: string;
  rut: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  fecha: string;
  estado: EstadoContacto;
}