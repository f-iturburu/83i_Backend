// Expresión regular que cumple los reglas especificadas en el estandar RFC5322
// https://datatracker.ietf.org/doc/html/rfc5322
// https://es.wikipedia.org/wiki/Protocolo_para_transferencia_simple_de_correo

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
