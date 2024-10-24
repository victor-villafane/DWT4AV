import { Router } from "express";
import * as controller from "../controllers/actores.controller.js"
import { validateToken } from "../../middleware/token.validate.middleware.js"

const route = Router()

route.get("/pelicula/:idPelicula/actores", [validateToken], controller.getActoresPelicula)
route.post("/pelicula/:idPelicula/actores",[validateToken], controller.agregarActoresPelicula)

export default route