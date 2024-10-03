import { Router } from "express";
import * as controller from "../controllers/cines.controller.js"

const route = Router()

route.get( "/cines", controller.getcines )
route.get( "/cines/:id", controller.getCineId )
route.post( "/cines", controller.agregarCine )
// route.put("/cines/:id", controller.reemplazarPelicula)      //Reemplaza
// route.patch("/cines/:id", controller.actualizarPelicula)    //Actualiza
// route.delete("/cines/:id", controller.borrarPelicula)    //Eliminar
route.post( "/cines/pelicula", controller.agregarPeliculaCine )

export default route