// Minimo de 8 caracteres, maximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales.

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/