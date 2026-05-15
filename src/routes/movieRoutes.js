import express from "express";
// Importación de controladores (siguiendo los ejercicios planteados)
import { 
    getAllMoviesController, 
    getMovieController, 
    getAwardWinnersController, 
    getLatestMoviesController 
} from "../controllers/movieController.js"; // Ajustar la ruta según tu estructura de carpetas

const router = express.Router();

/**
 * Ejercicio 1: Listado general de películas (con paginación)
 * GET /api/movies/
 */
router.get("/", getAllMoviesController);

/**
 * Ejercicio 4: Películas ganadoras de premios
 * GET /api/movies/winners
 * Se define ANTES de /:id para evitar colisiones de rutas.
 */
router.get("/winners", getAwardWinnersController);

/**
 * Ejercicio 5: Últimas películas estrenadas
 * GET /api/movies/latest
 * Se define ANTES de /:id.
 */
router.get("/latest", getLatestMoviesController);

/**
 * Ejercicio 2: Obtener una película por su ObjectId
 * GET /api/movies/:id
 */
router.get("/:id", getMovieController);

export default router;