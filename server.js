import express from "express"
import peliculasRoute from "./routes/peliculas.routes.js"
import apiPeliculas from "./api/routes/peliculas.routes.js"
import apiActores from "./api/routes/actores.routes.js"
const app = express()
// let contador = 0

// app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

app.use("/api",apiPeliculas)
app.use("/api", apiActores)
app.use(peliculasRoute)

app.listen(2025, () => console.log("Servidor funcionando"))

/**
 * 1. URL -> URI
 * La URL no hace referencia a la locacion, sino que identifica un recurso
 * 
 *  /productos
 *  /peliculas
 *  /usuarios
 *  /usuarios/perfil
 * 
 *  /usuarios/nuevo           X     NO!
 * 
 * 2. La accion se define con los verbos http
 * 
 *      GET -> Obtener un recurso
 *      POST -> CREAR UN RECURSO
 *      PUT -> REEMPLAZAR UN RECURSO
 *      PATCH -> ACTUALIZAR
 *      DELETE -> ELIMINAR
 * 
 * 3. Los datos de los recursos son transportados utilizando el formato JSON o xml
 * 
 * 4. Los estados de las peticiones son definidas con http status code
 * 
 * 1xx -> informacion de estado de servio
 * 2xx -> OK
 * 3xx -> redireccion
 * 4xx -> errores del usuario
 * 5xx -> errores del servidor
 */