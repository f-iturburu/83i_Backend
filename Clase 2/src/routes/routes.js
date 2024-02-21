import { Home } from "../views/Home";
import { Login } from "../views/Login";
import { SignUp } from "../views/SignUp";
import { Admin } from "../views/Admin";

export const routes = [
  {
    path: "/",
    Element: Home,
  },
  {
    path: "/login",
    Element: Login,
  },
  {
    path: "/signup",
    Element: SignUp,
  },
];

