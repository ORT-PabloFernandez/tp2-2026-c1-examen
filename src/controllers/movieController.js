import { getAllMovies, getMovieByID, getAwardWinners, getLatestMovies } from "../services/movieService.js";

// Ejercicio 1: Listado con paginación
export async function getAllMoviesController(req, res) {
    try {
        // Parseamos los query params (con valores por defecto por si vienen vacíos)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const movies = await getAllMovies({ page, limit });
        
        // Enviamos la respuesta al cliente
        res.json(movies);
    } catch (error) {
        console.error("Error en getAllMoviesController: ", error);
        res.status(500).json({ message: "Error interno al obtener películas" });
    }
}

// Ejercicio 2: Obtener por ID
export async function getMovieController(req, res) {
    try {
        const movie = await getMovieByID(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Película no encontrada" });
        }
        res.json(movie);
    } catch (error) {
        console.error("Error en getMovieController: ", error);
        res.status(500).json({ message: "Error interno al buscar la película" });
    }
}

// Ejercicio 4: Ganadoras de premios
export async function getAwardWinnersController(req, res) {
    try {
        const movies = await getAwardWinners();
        res.json(movies);
    } catch (error) {
        console.error("Error en getAwardWinnersController: ", error);
        res.status(500).json({ message: "Error al obtener ganadoras" });
    }
}

// Ejercicio 5: Últimas películas
export async function getLatestMoviesController(req, res) {
    try {
        const movies = await getLatestMovies();
        res.json(movies);
    } catch (error) {
        console.error("Error en getLatestMoviesController: ", error);
        res.status(500).json({ message: "Error al obtener últimas películas" });
    }
}