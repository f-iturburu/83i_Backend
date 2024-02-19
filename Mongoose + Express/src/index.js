import express from "express";
import cors from "cors"
import morgan from "morgan";
import "./db.js"
import { PORT } from "./config/config.js";
import ProductRoutes from "./routes/product.Routes.js";
import UserRoutes from "./routes/user.Routes.js";
const app = express()

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(ProductRoutes)
app.use(UserRoutes)

app.listen(PORT, async()=>{
    console.log(`La app esta escuchando el puerto ${PORT}`);
})