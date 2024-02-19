import { body } from "express-validator";
import User from "../models/user.model.js";
import { passwordRegex } from "../helpers/passwordRegex.js";

const existsEmail = async (email) => {
  const userFound = await User.findOne({ email: email });

  if (userFound) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }

  return false;
};

const existsEmailLogin = async (email) => {
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
        throw new Error(`El email o la contraseña son incorrectos`);
    }   
    
    return true;
};


export const userValidations = {
  email: body("email")
    .isEmail()
    .withMessage("Ingrese un email valido")
    .not()
    .isEmpty()
    .withMessage("Ingrese un email")
    .custom(existsEmail)
    ,

  password: body("password")
    .matches(passwordRegex)
    .withMessage("Ingrese una contraseña valida"),
};


export const loginValidations = {
    email: body("email")
    .isEmail()
    .withMessage("Ingrese un email valido")
    .not()
    .isEmpty()
    .withMessage("Ingrese un email")
    .custom(existsEmailLogin)
}