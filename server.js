import express from "express"
import path from "path"
import { readFile } from "fs/promises"
import { crearListadoPeliculas, crearPagina, crearDetallePelicula } from "./utils/utils.js"
const app = express()
// let contador = 0

// app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )

function getPeliculas(){
    return readFile(path.resolve("data/productos.json"), { encoding: 'utf8' })
        .then( (peliculas) => JSON.parse(peliculas) )
        .catch( () => [] )
}

function getPeliculaId(id){
    return getPeliculas().then( peliculas => {
        return peliculas.find( pelicula => pelicula.id == id ) || {}
    } )
}

app.get("/",(req, res)=>{
    getPeliculas()
        .then(productos => {
            res.send(crearPagina("Listado de peliculas", crearListadoPeliculas(productos)))
        })
})

app.get("/peliculas/:id", (req, res) => {
    console.log(req.params.id)
    getPeliculaId(req.params.id)
        .then( pelicula => res.send( crearPagina("detalle", crearDetallePelicula(pelicula)) ) )
}) // localhost:2025/peliculas/1

app.listen(2025, () => console.log("Servidor funcionando"))