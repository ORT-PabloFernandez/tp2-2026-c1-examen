import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

/**
 * Retorna los USUARIOS con paginación.
 */
export async function findAllUsers({ page = 1, limit = 10 } = {}) {
    const db = getDb();
    const skip = (page - 1) * limit;

    try {
        // CAMBIO IMPORTANTE: La colección debe ser "users"
        const users = await db.collection("users")
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();

        return users;
    } catch (error) {
        throw new Error("Error al recuperar los usuarios desde la base de datos");
    }
}

// Asegúrate de tener también estos exports para que userService no falle:
export async function findUserById(id) {
    const db = getDb();
    return await db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function registerUser(user) {
    const db = getDb();
    return await db.collection("users").insertOne(user);
}

export async function findByCredentials(email, password) {
    const db = getDb();
    const user = await db.collection("users").findOne({ email });
    // Aquí faltaría la lógica de bcrypt.compare que tenías al principio
    return user; 
}