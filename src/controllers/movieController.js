import {
  getAllMovies,
  getMovieByID,
  getAwardWinners,
  getLatestMovies,
} from "../services/movieService.js";

import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MSG_INTERNAL_SERVER_ERROR,
  MSG_MOVIE_NOT_FOUND,
} from "../constants/index.js";

// TODO (ejercicio 1): leer page y limit de req.query (ver ejemplo en userController.js)
// Llamar a getAllMovies y responder con el array. Manejar errores con status 500.
export async function getAllMoviesController(req, res) {
  try {
    const page = parseInt(req.query.page) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
    const genre = req.query.genre;
    const movies = await getAllMovies({ page, limit, genre });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies: ", error);
    res.status(500).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
}

// TODO (ejercicio 2): leer req.params.id, llamar a getMovieByID
// Responder 404 si no existe, o la película en JSON si existe. Manejar errores con status 500.
export async function getMovieController(req, res) {
  try {
    const movie = await getMovieByID(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: MSG_MOVIE_NOT_FOUND });
    }
    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie: ", error);
    res.status(500).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
}

// TODO (ejercicio 4): llamar a getAwardWinners y responder con el array en JSON
// Manejar errores con status 500
export async function getAwardWinnersController(req, res) {
  try {
    const awardWinners = await getAwardWinners();
    res.json(awardWinners);
  } catch (error) {
    console.error("Error fetching award winners: ", error);
    res.status(500).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
}

// TODO (ejercicio 5): llamar a getLatestMovies y responder con el array en JSON. Manejar errores con status 500.
export async function getLatestMoviesController(req, res) {
  try {
    const latestMovies = await getLatestMovies();
    res.json(latestMovies);
  } catch (error) {
    console.error("Error fetching latest movies: ", error);
    res.status(500).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
}
