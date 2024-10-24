import { Router } from "express";
import * as controller from "../controllers/cines.controller.js"
import { validateToken } from "../../middleware/token.validate.middleware.js"

const route = Router()

route.get( "/cines",[validateToken], controller.getcines )
route.get( "/cines/:id",[validateToken], controller.getCineId )
route.post( "/cines", [validateToken],controller.agregarCine )
// route.put("/cines/:id", controller.reemplazarPelicula)      //Reemplaza
// route.patch("/cines/:id", controller.actualizarPelicula)    //Actualiza
// route.delete("/cines/:id", controller.borrarPelicula)    //Eliminar
route.post( "/cines/pelicula",[validateToken] ,controller.agregarPeliculaCine )

export default route