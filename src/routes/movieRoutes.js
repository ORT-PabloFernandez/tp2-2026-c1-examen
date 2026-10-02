import express from "express";
// TODO (ejercicio 1): importar getAllMoviesController desde movieController.js
// TODO (ejercicio 2): importar getMovieController y authMiddleware
// TODO (ejercicio 4): importar getAwardWinnersController
// TODO (ejercicio 5): importar searchMoviesController

import {
    getAllMoviesController,
    getMovieController,
    getAwardWinnersController,
    searchMoviesController
} from "../controllers/movieController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllMoviesController);
router.get("/winners", getAwardWinnersController);
router.get("/search", searchMoviesController);
router.get("/:id", authMiddleware, getMovieController);

export default router;
