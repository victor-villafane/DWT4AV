import * as service from '../../services/actores.service.js'

export function getActoresPelicula(req, res){
    const idPelicula = req.params.idPelicula
    service.getActoresPelicula(idPelicula)
        .then( actores => res.status(200).json(actores) )
        .catch( error => res.status(404).json({error: error}) )
}

export function agregarActoresPelicula(req, res){
    const idPelicula = req.params.idPelicula
    const actores = req.body
    service.agregarActoresPelicula(idPelicula, actores)
        .then( result => res.status(201).json(result) )

}