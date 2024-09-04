import express from "express"
import * as controllerPelicula from "../controllers/peliculas.controller.js"

const route = express.Router()
route.get("/peliculas", controllerPelicula.getPeliculas)
route.get("/peliculas/nuevo", controllerPelicula.nuevaPelicula)
route.get("/peliculas/:id", controllerPelicula.getPeliculaId) // localhost:2025/peliculas/1

export default route