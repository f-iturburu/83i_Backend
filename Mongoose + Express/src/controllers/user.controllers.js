import User from "../models/user.model.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { comparePasswords } from "../helpers/comparePasswords.js";

export const create = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = User({
      email: email,
      password: password,
    });

    newUser.password = await hashPassword(password);
    await newUser.save();

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const validPassword = await comparePasswords(user.password, password);

  if (!validPassword) {
    return res.status(401).json({ message: "Email o contraseña incorrectos" });
  }

  return res
    .status(200)
    .json({ message: "El usuario se ha logeado exitosamente" });
};
