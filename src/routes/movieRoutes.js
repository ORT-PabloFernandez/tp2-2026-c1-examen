import express from "express";
import {
     getAllMoviesController, 
     getMovieController, 
     getAwardWinnersController, 
     getLatestMoviesController } from "../controllers/movieController.js";

// TODO (ejercicio 1): importar getAllMoviesController desde movieController.js
// TODO (ejercicio 2): importar getMovieController
// TODO (ejercicio 4): importar getAwardWinnersController
// TODO (ejercicio 5): importar getLatestMoviesController

const router = express.Router();

// TODO (ejercicio 1): GET /  → getAllMoviesController
router.get("/", getAllMoviesController);
router.get("/winners", getAwardWinnersController);
router.get("/latest", getLatestMoviesController);
router.get("/:id", getMovieController);         

// TODO (ejercicio 4): GET /winners → getAwardWinnersController  ⚠️ debe ir ANTES de /:id
// TODO (ejercicio 5): GET /latest → getLatestMoviesController    ⚠️ debe ir ANTES de /:id
// TODO (ejercicio 2): GET /:id → getMovieController
//
// ⚠️ IMPORTANTE: las rutas con path fijo (/winners, /search) deben definirse
//    ANTES de la ruta dinámica (/:id), porque Express las evalúa en orden.
//    Si /:id se define primero, "winners" y "latest" serán interpretados como un id.

export default router;
