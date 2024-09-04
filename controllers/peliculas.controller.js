import * as peliculaService from "../services/peliculas.service.js"
import * as peliculaView from "../views/peliculas.view.js"
const getPeliculas = (req, res)=>{
    peliculaService.getPeliculas()
        .then(productos => {
            res.send(peliculaView.crearPagina("Listado de peliculas", peliculaView.crearListadoPeliculas(productos)))
        })
}

const getPeliculaId = (req, res) => {
    console.log(req.params.id)
    peliculaService.getPeliculaId(req.params.id)
        .then( pelicula => res.send( peliculaView.crearPagina("detalle", peliculaView.crearDetallePelicula(pelicula)) ) )
}

export {
    getPeliculaId,
    getPeliculas
}