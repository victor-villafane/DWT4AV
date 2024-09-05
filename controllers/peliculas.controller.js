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
const nuevaPelicula = (req, res) => {
    res.send( peliculaView.crearPagina("Nueva pelicula", peliculaView.nuevaPelicula() ) )
}

const agregarPelicula = (req, res) => {
    peliculaService.agregarPelicula(req.body)
    .then( ( pelicula ) => res.send( peliculaView.crearPagina("Nueva pelicula", `<p>id: ${pelicula.id} <br> Titulo: ${pelicula.titulo}</p>`  ) ) )
    .catch( (err) => res.send(peliculaView.crearPagina("Error Al agregar una pelicula", `<p>${err}</p>`)) )
}

const eliminarPelicula = (req, res) => {
    peliculaService.eliminarPelicula(req.params.id)
        // .then( ( pelicula ) => res.send( peliculaView.crearPagina("Pelicula Eliminada", `<p>id: ${pelicula.id} <br> Titulo: ${pelicula.titulo}</p>`  ) ) )
        .then( ( id ) => res.redirect("/peliculas") )
        .catch( (err) => res.send(peliculaView.crearPagina("Error Al eliminar una pelicula", `<p>${err}</p>`)) )
}


export {
    getPeliculaId,
    getPeliculas,
    nuevaPelicula,
    agregarPelicula,
    eliminarPelicula
}