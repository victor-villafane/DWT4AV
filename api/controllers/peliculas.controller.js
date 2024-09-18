import * as service from "../../services/peliculas.service.js"

function getPeliculas(req, res){
    service.getPeliculas()
        .then( (peliculas) => res.status(200).json(peliculas) )
}

function agregarPelicula( req, res ){
    service.agregarPelicula(req.body)
        .then( (pelicula) => res.status(201).json(pelicula) )
}
function reemplazarPelicula(req, res){
    const id = req.params.id
    service.modificarPelicula(id, req.body)
        .then(pelicula => res.status(201).json(pelicula))
}

function actualizarPelicula(req, res){
    const id = req.params.id
    service.actualizarPelicula(id, req.body)
        .then(pelicula => {
            if( pelicula ){
                res.status(201).json(pelicula)
            }else{
                res.status(404).json({error: { message: "No se encuentra la pelicula" }})
            }
        })
}

function borrarPelicula(req, res){
    const id = req.params.id
    service.eliminarPelicula(id)
        .then( (id) => res.status(202).json({id: id}) )
}

export {
    getPeliculas,
    agregarPelicula,
    reemplazarPelicula,
    actualizarPelicula,
    borrarPelicula
}