import { Router } from "express";
import { createProduct, getProducts, deleteById,getById, searchWithOptions, edit } from "../controllers/product.controllers.js";
const router = Router()

router.post("/product", createProduct)
router.get("/products", getProducts)
router.delete("/product/:id", deleteById)
router.get("/product/:id", getById )
router.get("/products/search", searchWithOptions)
router.patch("/product/:id", edit)
export default router