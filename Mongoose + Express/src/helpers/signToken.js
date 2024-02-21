import Jwt from "jsonwebtoken"
import { SECRET } from "../config/config.js"

export const signToken = (user) =>{
   const token = Jwt.sign({
    id: user._id,
    role: user.role
   }, SECRET)

   return token
}