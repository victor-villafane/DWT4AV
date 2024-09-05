import { readFile,writeFile } from "fs/promises"
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
function agregarPelicula(pelicula){

    return getPeliculas().then( async peliculas => {
        const nuevaPelicula = {
            id: peliculas.length + 1,
            ...pelicula
        }
        peliculas.push(nuevaPelicula)
        await writeFile("./data/productos.json", JSON.stringify(peliculas))
        return nuevaPelicula
    })
}
export {
    getPeliculaId,
    getPeliculas,
    agregarPelicula
}
