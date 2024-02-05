import { Router } from "express";
const router = Router();
import {
  getAll,
  getById,
  sortByPrice,
  sortByCategory,
  searchByName,
  create,
  edit,
  findByIdAndDelete,
  searchWithOptions
} from "../controllers/product.Controllers.js";

router.get("/products", getAll);
router.get("/product/id/:id", getById);
router.get("/product/order/:order", sortByPrice);
router.get("/product/category/:category", sortByCategory);
router.get("/product/name/:searchQuery", searchByName);
router.get("/products/search", searchWithOptions)

router.post("/product", create);

router.patch("/product/:id", edit);

router.delete("product/:id", findByIdAndDelete);

export default router;
