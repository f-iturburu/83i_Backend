import { Schema, model } from "mongoose";
import { imageRegex } from "../helpers/imageURLRegex.js";

const productSchema = new Schema(
  {
    userId : {
      type: Schema.Types.ObjectId
    },
    name: {
      type: String,
      required: [true, "Debe ingresar un nombre"],
      unique: true,
      minLength: 5,
      maxLength: 80,
    },
    price: {
      type: Number,
      required: [true, "Debe ingresar un precio"],
      min: 1,
      max: 5_000_000,
    },
    discountPercentage: {
      type: Number,
      min: 1,
      max: 99,
    },
    category: {
      type: String,
      required: [true, "Debe ingresar una categoria"],
      enum: {
        values: ["mug", "notepad", "keychain", "hat", "bottle", "shirt"],
        message: "{VALUE} no es una categoria valida",
      },
    },
    visible: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      match: [imageRegex, "La imagen ingresada es invalida"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
