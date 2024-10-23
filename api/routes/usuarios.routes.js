import { Router } from "express";
import * as controller from "../controllers/usuarios.controller.js"
import { validateUser, login } from "../../middleware/usuario.validate.middleware.js"

const route = Router()

route.post( "/usuarios",[validateUser], controller.createUser )
route.post( "/usuarios/login",[login], controller.login )


export default route