import { Router } from "express";
import * as controller from "../controllers/peliculas.controller.js"
import { validateMovie } from "../../middleware/movie.validate.middleware.js"
import { validateToken } from "../../middleware/token.validate.middleware.js"
const route = Router()

route.get( "/peliculas", [validateToken] , controller.getPeliculas )
route.get( "/peliculas/:id",[validateToken], controller.getPeliculaId )
route.post( "/peliculas", [validateMovie], controller.agregarPelicula )
route.put("/peliculas/:id",[validateToken], controller.reemplazarPelicula)      //Reemplaza
route.patch("/peliculas/:id",[validateToken], controller.actualizarPelicula)    //Actualiza
route.delete("/peliculas/:id",[validateToken] ,controller.borrarPelicula)    //Eliminar

export default route