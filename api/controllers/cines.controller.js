import * as service from "../../services/cines.service.js"

export function getcines(req, res){
    service.getCines()
        .then( cines => res.status(200).json(cines) )
        .catch( error => res.status(404).json({error: error}) )
}

export function getCineId(req, res){
    const id  = req.params.id
    service.getCineId(id)
        .then( cine => res.status(200).json(cine) )
        .catch( error => res.status(404).json({error: error}) )
}

export function agregarCine(req, res){
    const cine = req.body
    service.agregarCine(cine)
        .then( result => res.status(201).json(result) )
        .catch( error => res.status(404).json({error: error}) )
}

//faltan algunos mas

export function agregarPeliculaCine(req, res){
    const idCine = req.body.idCine
    const idPelicula = req.body.idPelicula
    service.agregarPeliculaCine(idCine, idPelicula)
        .then( result => res.status(201).json(result) )
        .catch( error => res.status(404).json({error: error}) )
}