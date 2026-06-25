# TECNOLOGÍAS DE PROGRAMACIÓN 2 — Simulación de Parcial

## Instrucciones de resolución

Es tu primer día en [cinestream.io](http://cinestream.io) y tu Líder Técnico ya te tiene asignada tu primera tarea crítica 💪

> Bienvenid@! Menos mal que llegaste, teníamos que salir a producción la semana pasada con esto.
> El equipo anterior dejó la API a medias — la autenticación de usuarios está completa pero la parte de películas no tiene nada. Necesito que la implementes siguiendo la misma arquitectura que ya tiene el proyecto (capas de datos, servicios y controladores). No te preocupes por los usuarios, eso ya funciona.

> En el presente repositorio encontrarás un proyecto de Node.js con Express y MongoDB que ya tiene código base. Seguí los siguientes pasos para armar tu entorno:

> 1. Realizar un Fork del presente repositorio
> 2. Realizar un clone del repositorio en tu cuenta de GitHub
> 3. Instalar las dependencias con `npm install`
> 4. Crear un archivo `.env` en la raíz del proyecto basándote en `.env.example`. Se te proveerá el valor de `MONGODB_URI` y `JWT_SECRET` al inicio del parcial.
> 5. Levantar el servidor con `npm run dev`
> 6. La base de datos es **MongoDB Atlas** con la base **sample_mflix**, colección **movies**. Tiene miles de películas.
> 7. Ya están implementados y funcionando los siguientes endpoints de usuarios:
>    - `POST /api/users/register` → body: `{ name, email, password }`
>    - `POST /api/users/login` → body: `{ email, password }` — devuelve un JWT token
>    - `GET /api/users` *(requiere token)* → lista todos los usuarios
>    - `GET /api/users/:id` → detalle de un usuario

> ### TUS TAREAS SON LAS SIGUIENTES POR ORDEN DE PRIORIDAD

> 1. **Listado de películas con paginación** — Implementar el pipeline completo para `GET /api/movies?page=1&limit=20`.
>    - **Referencia**: la función `findAllUsers` en `src/data/userData.js` ya implementa paginación con skip/limit — usala como modelo.
>    - `src/data/movieData.js` → completar `findAllMovies({ page, limit })` consultando la colección `movies`.
>    - `src/services/movieService.js` → completar `getAllMovies({ page, limit })`.
>    - `src/controllers/movieController.js` → completar `getAllMoviesController` leyendo `page` y `limit` de `req.query`.
>    - `src/routes/movieRoutes.js` → definir `GET /` y registrar las rutas en `src/app.js` (hay un TODO comentado).
>    - Al terminar: `GET /api/movies?page=2&limit=5` debe devolver las películas 6 a 10.

> 2. **Detalle de película** — Implementar `GET /api/movies/:id`.
>    - `src/data/movieData.js` → completar `findMovieById(id)` buscando por `_id` con `new ObjectId(id)`.
>    - `src/services/movieService.js` → completar `getMovieByID(id)`.
>    - `src/controllers/movieController.js` → completar `getMovieController`: responder 404 si no existe.
>    - `src/routes/movieRoutes.js` → agregar `GET /:id`.
>    - Al terminar: con un id válido debe devolver la película; con un id que no existe debe responder 404.

> 3. **Filtro por género** — Modificar el endpoint `GET /api/movies` para que acepte un query param opcional `genre`.
>    - Si se recibe `genre`, agregar un filtro a la consulta de MongoDB: `{ genres: genre }` (el campo `genres` es un array en la colección).
>    - Si no se recibe, devolver todas las películas sin filtro (comportamiento actual).
>    - Ejemplo: `GET /api/movies?genre=Action&limit=5` debe devolver solo películas de acción.

> 4. **Películas ganadoras de premios** — Implementar `GET /api/movies/winners`.
>    - Completar `findAwardWinners` en `movieData.js`: filtrar películas con `awards.wins > 0`, ordenar por `awards.wins` de mayor a menor, limitar a 10.
>    - Completar el servicio, controlador y agregar la ruta en `movieRoutes.js`.
>    - ⚠️ Esta ruta debe definirse **antes** de `GET /:id` en el router. Si no, Express interpretará "winners" como un id. Hay una advertencia en el archivo.
>    - Al terminar: `GET /api/movies/winners` debe devolver las 10 películas con más premios ganados.

> 5. **Películas más recientes** — Implementar `GET /api/movies/latest`.
>    - `src/data/movieData.js` → `findLatestMovies()` ya está implementada — no necesitás modificarla.
>    - `src/services/movieService.js` → completar `getLatestMovies()`: llamar a `findLatestMovies()` y retornar el resultado.
>    - `src/controllers/movieController.js` → completar `getLatestMoviesController`: llamar a `getLatestMovies()` y responder con el array en JSON. Manejar errores con status 500.
>    - `src/routes/movieRoutes.js` → agregar `GET /latest` **antes de** `GET /:id`.
>    - Al terminar: `GET /api/movies/latest` debe devolver las 5 películas con el año más alto.

> Desde ya muchas gracias! Como te comenté en la entrevista, me importa mucho que respetes la arquitectura en capas — no pongas lógica de MongoDB en los controladores. Si terminás antes, dejame una nota en el README con cualquier decisión que hayas tomado.

---

## Instrucciones para la entrega

Si ya terminaste, o son las 10:00, asegurate de seguir los siguientes pasos para la entrega:

1. Completar el listado de endpoints implementados más abajo en este mismo archivo.
2. Realizar un **commit** a tu repositorio con un mensaje que incluya tu **nombre completo**.
3. Realizar un **push** a tu repositorio.
4. Realizar un **pull request** al repositorio original.

## Listado de endpoints implementados


| Método | Endpoint | Parámetros | Requiere token | Descripción |
|--------|----------|------------|----------------|-------------|
| POST | `/api/users/register` | body: `name`, `email`, `password` | No | Registro de usuario |
| POST | `/api/users/login` | body: `email`, `password` | No | Login — devuelve JWT |
| GET | `/api/users` | — | Sí | Lista todos los usuarios |
| GET | `/api/users/:id` | `id` (ObjectId) | No | Detalle de un usuario |
| GET | `/api/movies` | `page`, `limit`, `genre` (opcional) | No | Listado de películas paginado |
| GET | `/api/movies/winners` | — | No | Top 10 películas con más premios |
| GET | `/api/movies/latest` | — | No | Las 5 películas más recientes |
| GET | `/api/movies/:id` | `id` (ObjectId) | No | Detalle de una película |
|GET  |/api/movies |page, limit, genre (opcional) |No | Listado de películas paginado
|GET | /api/movies/winners | -|NO|  Listado de peliculas ganadoras
|GET |/api/movies/latest | - | NO | Las ultimas 5 peiculas 
GET | /api/movies/:id | ID OBJECTID | NO | detalle de peli
