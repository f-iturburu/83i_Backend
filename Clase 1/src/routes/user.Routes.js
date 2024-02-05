import { Router } from "express";
const router = Router()
import { login, create, findByIdAndelete } from "../controllers/user.Controllers.js";

router.post("/login", login)
router.post("/user", create)
router.delete("/user/:id", findByIdAndelete)

export default router