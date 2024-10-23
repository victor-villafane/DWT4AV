import { Router } from "express";
import * as controller from "../controllers/peliculas.controller.js"
import { validateMovie } from "../../middleware/movie.validate.middleware.js"
const route = Router()

// route.get("/", controller.getHealth)
route.get( "/", controller.getPeliculas )
route.get( "/:id", controller.getPeliculaId )
route.post( "/", controller.agregarPelicula )
route.put("/:id", controller.reemplazarPelicula)      //Reemplaza
route.patch("/:id", controller.actualizarPelicula)    //Actualiza
route.delete("/:id", controller.borrarPelicula)    //Eliminar

export default route