import { getAllMovies, getMovieByID, getAwardWinners, getLatestMovies } from "../services/movieService.js";

// TODO (ejercicio 1): leer page y limit de req.query (ver ejemplo en userController.js)
// Llamar a getAllMovies y responder con el array. Manejar errores con status 500.
export async function getAllMoviesController(req, res) {
    
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const genre = req.query.genre;

        const movies = await getAllMovies({page,limit,genre});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// TODO (ejercicio 2): leer req.params.id, llamar a getMovieByID
// Responder 404 si no existe, o la película en JSON si existe. Manejar errores con status 500.
export async function getMovieController(req, res) {
    try{
        const {id}= req.params;
        const movie = await getMovieByID(id)

        if(!movie){
        res.status(404).json({message:"Pelicula no encontrada"});
        }
        return res.json(movie);



    }catch(error){
        res.status(500).json({message:error.message});
    }


}

// TODO (ejercicio 4): llamar a getAwardWinners y responder con el array en JSON
// Manejar errores con status 500
export async function getAwardWinnersController(req, res) {
    try {
        const movies = await getAwardWinners();
        res.json(movies);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

// TODO (ejercicio 5): llamar a getLatestMovies y responder con el array en JSON. Manejar errores con status 500.
export async function getLatestMoviesController(req, res) {

    try {

        const movies = await getLatestMovies();
        res.json(movies);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }    

}
