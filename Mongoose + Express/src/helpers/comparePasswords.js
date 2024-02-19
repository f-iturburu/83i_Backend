import bcrypt from "bcrypt"

export const comparePasswords = async (userPassword, reqPassword) =>{
    const checkPasswords = await bcrypt.compare(reqPassword, userPassword)
    return checkPasswords
}