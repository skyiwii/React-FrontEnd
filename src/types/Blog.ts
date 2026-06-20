export interface BlogReacciones {
  love: number;
  like: number;
  neutral: number;
  dislike: number;
}

export interface BlogComentario {
  id: number;
  avatar: string;
  nombre: string;
  tiempo: string;
  timestamp?: number;
  texto: string;
  likes: number;
  dislikes: number;
  respuestas?: BlogComentario[];
  esNuevo?: boolean;
}

export interface BlogSeccion {
  tipo: "h3" | "ul" | "ol" | "blockquote" | "p";
  texto?: string;
  items?: string[];
}

export interface BlogNavegacion {
  id: number;
  titulo: string;
}

export interface BlogPost {
  id: number;
  titulo: string;
  subtitulo: string;
  resumen: string;
  categoria: string;
  categoriaLabel: string;
  fecha: string;
  lectura: string;
  autor: string;
  imagen: string;
  imagenAlt: string;
  vistas: string;
  comentariosCount: number;
  reacciones: BlogReacciones;
  contenido: {
    introduccion: string;
    secciones: BlogSeccion[];
  };
  comentarios: BlogComentario[];
  anterior: BlogNavegacion | null;
  siguiente: BlogNavegacion | null;
}