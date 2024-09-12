import { readFile,writeFile } from "fs/promises"
import { resolve } from "path"
function getPeliculas(eliminardos = false){
    return readFile(resolve("data/productos.json"), { encoding: 'utf8' })
        .then( (peliculas) => eliminardos ? JSON.parse(peliculas) : JSON.parse(peliculas).filter( pelicula => !pelicula.eliminado ) )
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

function eliminarPelicula(id){
    return getPeliculas(true)
        .then( async peliculas => {

            const peliculasActualizadas = peliculas.map( pelicula =>  {
                if( pelicula.id == id ) {
                    return {
                        ...pelicula,
                        eliminado: true
                    }
                }else{
                    return pelicula
                } 
            } )  

            await writeFile("./data/productos.json", JSON.stringify(peliculasActualizadas))
            return id
        } )
}
const modificarPelicula = (id, peliculaActualizada) => {
    return getPeliculas(true)
        .then( async peliculas => {
            const peliculasActualizadas = peliculas.map( pelicula => {
                if( pelicula.id == id ){
                    return {
                        id: id,
                        ...peliculaActualizada
                    }
                }else{
                    return pelicula
                }
            } )
            await writeFile("./data/productos.json", JSON.stringify(peliculasActualizadas))
        } )
}
export {
    getPeliculaId,
    getPeliculas,
    agregarPelicula,
    eliminarPelicula,
    modificarPelicula
}
