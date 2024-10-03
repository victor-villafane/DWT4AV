import { Router } from "express";
import * as controller from "../controllers/actores.controller.js"

const route = Router()

route.get("/pelicula/:idPelicula/actores", controller.getActoresPelicula)
route.post("/pelicula/:idPelicula/actores", controller.agregarActoresPelicula)

export default route