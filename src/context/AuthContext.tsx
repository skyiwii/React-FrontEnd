import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import type { Usuario } from "../types/Usuario";

import {
  obtenerSesion,
  iniciarSesion,
  cerrarSesionStorage
} from "../services/authStorage";

interface AuthContextType {
  usuario: Usuario | null;

  login: (
    correo: string,
    password: string
  ) => Promise<{
    ok: boolean;
    mensaje?: string;
  }>;

  logout: () => void;

  actualizarUsuarioContexto: (
    usuario: Usuario
  ) => void;

  estaLogueado: boolean;

  esAdmin: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  useEffect(() => {

    const sesion =
      obtenerSesion();

    if (sesion) {

      setUsuario(
        sesion
      );

    }

  }, []);

  async function login(
    correo: string,
    password: string
  ) {

    const resultado =
      await iniciarSesion(
        correo,
        password
      );

    if (
      resultado.ok &&
      resultado.usuario
    ) {

      setUsuario(
        resultado.usuario
      );

    }

    return {
      ok: resultado.ok,
      mensaje: resultado.mensaje
    };

  }

  function logout() {

    cerrarSesionStorage();

    setUsuario(null);

  }

  function actualizarUsuarioContexto(
    usuarioActualizado: Usuario
  ) {

    setUsuario(
      usuarioActualizado
    );

  }

  return (

    <AuthContext.Provider

      value={{

        usuario,

        login,

        logout,

        actualizarUsuarioContexto,

        estaLogueado:
          usuario !== null,

        esAdmin:
          usuario?.rol === "admin"

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth debe usarse dentro de AuthProvider"
    );

  }

  return context;

}