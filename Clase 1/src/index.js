import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, async () => {
  console.clear()
  console.log(`La app esta escuchando en el puerto: ${PORT}`);
});
