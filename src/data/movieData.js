import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

// TODO (ejercicio 1): implementar paginación igual que en findAllUsers (ver src/data/userData.js)
// Recibe { page, limit } y retorna el array de películas de esa página
export async function findAllMovies({ page = 1, limit = 20, genre } = {}) {
const db = getDb();
    const skip = (page - 1) * limit;
    const movies = await db.collection("movies")
        .find(genre ? { genres: genre  } : {})
        .skip(skip)
        .limit(limit)
        .toArray(); 
    return movies;
}

// TODO (ejercicio 2): buscar una película por su _id usando new ObjectId(id)
// Retornar null si no existe
export async function findMovieById(id) {
    const db = getDb();
    const movie = await db.collection("movies").findOne({_id: new ObjectId(id)});
    return movie;
}

// TODO (ejercicio 4): traer las películas que ganaron al menos 1 premio
// Filtrar por: { "awards.wins": { $gt: 0 } }
// Ordenar por awards.wins de mayor a menor: .sort({ "awards.wins": -1 })
// Limitar a los primeros 10 resultados
export async function findAwardWinners() {
const db = getDb();
    const movies = await db.collection("movies")
        .find({ "awards.wins": { $gt: 0 } })
        .sort({ "awards.wins": -1 })
        .limit(10)
        .toArray();
    return movies;  
}

// ✅ Ejercicio 5: ya implementada — no necesitás modificarla
export async function findLatestMovies() {
    const db = getDb();
    return await db.collection("movies").find({}).sort({ year: -1 }).limit(5).toArray();
}
