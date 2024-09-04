import { readFile } from "fs/promises"
import path from "path"
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

export {
    getPeliculaId,
    getPeliculas
}
