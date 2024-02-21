import User from "../models/user.model.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { comparePasswords } from "../helpers/comparePasswords.js";
import { signToken } from "../helpers/signToken.js";

export const create = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = User({
      email: email,
      password: password,
    });

    newUser.password = await hashPassword(password);
    await newUser.save();
    const token = signToken(newUser)

    res.status(201).json({ token:token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({email:email})
  const token = signToken(user)
  
  return res
    .status(200)
    .json({ token: token });
};

