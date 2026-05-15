import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
// Importamos las rutas de películas (Ejercicio 4)
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Registro de Rutas (Endpoints)
app.use("/api/users", userRoutes);
// Registro de la ruta base para películas (Ejercicio 4)
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

export default app;