import type { Contacto } from "../types/Contacto";

const STORAGE_CONTACTOS = "contactos";

export function obtenerContactos(): Contacto[] {
  return JSON.parse(localStorage.getItem(STORAGE_CONTACTOS) || "[]");
}

export function guardarContactos(contactos: Contacto[]): void {
  localStorage.setItem(STORAGE_CONTACTOS, JSON.stringify(contactos));
}

export function crearContacto(nuevoContacto: Contacto): void {
  const contactos = obtenerContactos();
  contactos.push(nuevoContacto);
  guardarContactos(contactos);
}

export function editarContacto(
  idContacto: string,
  datosActualizados: Partial<Contacto>
): void {
  const contactos = obtenerContactos();

  const contactosActualizados = contactos.map(contacto => {
    if (contacto.id === idContacto) {
      return {
        ...contacto,
        ...datosActualizados
      };
    }

    return contacto;
  });

  guardarContactos(contactosActualizados);
}

export function eliminarContacto(idContacto: string): void {
  const contactos = obtenerContactos();

  const contactosActualizados = contactos.filter(
    contacto => contacto.id !== idContacto
  );

  guardarContactos(contactosActualizados);
}

export function marcarContactoRespondido(idContacto: string): void {
  editarContacto(idContacto, {
    estado: "respondido"
  });
}

export function archivarContacto(idContacto: string): void {
  editarContacto(idContacto, {
    estado: "archivado"
  });
}