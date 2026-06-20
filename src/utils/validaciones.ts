export function validarNombre(nombre: string): string {
  const nombreLimpio = nombre.trim();
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (nombreLimpio.length < 3) {
    return "El nombre debe tener mínimo 3 caracteres";
  }

  if (!regexNombre.test(nombreLimpio)) {
    return "El nombre solo puede contener letras";
  }

  return "";
}

export function validarCorreo(correo: string): string {
  const correoLimpio = correo.trim();
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (correoLimpio === "") {
    return "Ingresa un correo electrónico";
  }

  if (!regexCorreo.test(correoLimpio)) {
    return "Ingresa un correo válido";
  }

  return "";
}

export function validarTelefono(telefono: string): string {
  const telefonoLimpio = telefono.trim();

  const regexTelefono =
    /^(\+56\s?9\s?[0-9]{4}\s?[0-9]{4}|9[0-9]{8})$/;

  if (telefonoLimpio === "") {
    return "Ingresa un número telefónico";
  }

  if (!regexTelefono.test(telefonoLimpio)) {
    return "Ingresa un teléfono chileno válido";
  }

  return "";
}

export function validarMensaje(mensaje: string): string {
  const mensajeLimpio = mensaje.trim();

  if (mensajeLimpio.length < 10) {
    return "El mensaje debe tener mínimo 10 caracteres";
  }

  return "";
}

export function validarRut(rut: string): string {
  const rutLimpioInput = rut.trim();

  const regexRut =
    /^[0-9]{7,8}-[0-9kK]{1}$/;

  if (rutLimpioInput === "") {
    return "Ingresa un RUT";
  }

  if (!regexRut.test(rutLimpioInput)) {
    return "Formato inválido. Usa 12345678-9";
  }

  const rutLimpio =
    rutLimpioInput.replace("-", "");

  const cuerpo =
    rutLimpio.slice(0, -1);

  const dv =
    rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;

    multiplo++;

    if (multiplo > 7) {
      multiplo = 2;
    }
  }

  let dvEsperado: string | number =
    11 - (suma % 11);

  if (dvEsperado === 11) {
    dvEsperado = "0";
  } else if (dvEsperado === 10) {
    dvEsperado = "K";
  } else {
    dvEsperado = dvEsperado.toString();
  }

  if (dv !== dvEsperado) {
    return "El RUT no es válido";
  }

  return "";
}

export function validarPasswordSegura(password: string): string {
  const passwordLimpia = password.trim();

  if (passwordLimpia.length < 8) {
    return "La contraseña debe tener mínimo 8 caracteres";
  }

  if (!/[A-Z]/.test(passwordLimpia)) {
    return "Debe incluir al menos una letra mayúscula";
  }

  if (!/[a-z]/.test(passwordLimpia)) {
    return "Debe incluir al menos una letra minúscula";
  }

  if (!/[0-9]/.test(passwordLimpia)) {
    return "Debe incluir al menos un número";
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(passwordLimpia)) {
    return "Debe incluir al menos un símbolo";
  }

  return "";
}

export function obtenerRequisitosPassword(password: string) {
  return {
    largo: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    minuscula: /[a-z]/.test(password),
    numero: /[0-9]/.test(password),
    simbolo: /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password)
  };
}