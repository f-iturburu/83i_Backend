import { body } from "express-validator";
import User from "../models/user.model.js";
import { passwordRegex } from "../helpers/passwordRegex.js";
import { comparePasswords } from "../helpers/comparePasswords.js";

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

const checkPassword = async (req) =>{
  const { email, password } = req;

  const user = await User.findOne({ email: email });

  const validPassword = await comparePasswords(user.password, password);

  if (!validPassword) {
    throw new Error(`El email o la contraseña son incorrectos`);
  }
}


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
    , 
    password: body()
    .not()
    .isEmpty()
    .withMessage("Ingrese una contraseña")
    .custom(checkPassword)
}