import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        lowercase : true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default:"user"
    }
},{
    timestamps: true
})

export default model ("User", userSchema)