import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

// TODO (ejercicio 1): implementar paginación igual que en findAllUsers
export async function findAllMovies({ page = 1, limit = 20 } = {}) {
    const db = getDb();
    const skip = (page - 1) * limit;
    
    // Aplicamos el pipeline: find -> skip -> limit -> toArray
    return await db.collection("movies")
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();
}

// TODO (ejercicio 2): buscar una película por su _id usando new ObjectId(id)
export async function findMovieById(id) {
    const db = getDb();
    // Es buena práctica verificar que el ID sea válido antes de instanciar ObjectId
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    
    return movie || null;
}

// TODO (ejercicio 4): traer las películas que ganaron al menos 1 premio
export async function findAwardWinners() {
    const db = getDb();
    
    return await db.collection("movies")
        .find({ "awards.wins": { $gt: 0 } }) // Filtro por cuantificador mayor a 0
        .sort({ "awards.wins": -1 })         // Orden descendente (Big-O eficiente con índice)
        .limit(10)                           // Top 10
        .toArray();
}

// ✅ Ejercicio 5: ya implementada
export async function findLatestMovies() {
    const db = getDb();
    return await db.collection("movies").find({}).sort({ year: -1 }).limit(5).toArray();
}