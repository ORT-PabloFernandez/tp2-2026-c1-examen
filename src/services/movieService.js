import { findAllMovies, findMovieById, findAwardWinners, findLatestMovies } from "../data/movieData.js";

/**
 * Ejercicio 1: Obtiene todas las películas con soporte para paginación.
 * Se pasan los parámetros desestructurados al repositorio.
 */
export async function getAllMovies({ page, limit }) {
    const movies = await findAllMovies({ page, limit });
    return movies;
}

/**
 * Ejercicio 2: Obtiene una película específica por su ID.
 * Es importante que el repositorio se encargue de la conversión a ObjectId.
 */
export async function getMovieByID(id) {
    const movie = await findMovieById(id);
    return movie;
}

/**
 * Ejercicio 4: Obtiene las películas que han ganado premios.
 */
export async function getAwardWinners() {
    const winners = await findAwardWinners();
    return winners;
}

/**
 * Ejercicio 5: Obtiene las películas más recientes según su fecha de estreno.
 */
export async function getLatestMovies() {
    const latest = await findLatestMovies();
    return latest;
}