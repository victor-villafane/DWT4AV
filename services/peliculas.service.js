import { readFile,writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017")
const db = client.db("Cine")

async function getPeliculas(eliminardos = false){
    await client.connect()
    return db.collection("Peliculas").find( { "eliminado": { "$ne": !eliminardos } } ).toArray()
    // return readFile(resolve("data/productos.json"), { encoding: 'utf8' })
    //     .then( (peliculas) => eliminardos ? JSON.parse(peliculas) : JSON.parse(peliculas).filter( pelicula => !pelicula.eliminado ) )
    //     .catch( () => [] )
}

async function getPeliculaId(id_ingresado){
    await client.connect()
    console.log("id recibido", id_ingresado)
    const datos = await db.collection("Peliculas").findOne( { _id: ObjectId.createFromHexString(id_ingresado) } )
    return datos
    // return getPeliculas().then( peliculas => {
    //     return peliculas.find( pelicula => pelicula.id == id ) || {}
    // } )
}
async function agregarPelicula(pelicula){
    console.log(pelicula)
    // return getPeliculas().then( async peliculas => {
    //     const nuevaPelicula = {
    //         id: peliculas.length + 1,
    //         ...pelicula
    //     }
    //     peliculas.push(nuevaPelicula)
    //     await writeFile("./data/productos.json", JSON.stringify(peliculas))
    //     return nuevaPelicula
    // })
    await client.connect()
    await db.collection("Peliculas").insertOne(pelicula)
    return pelicula
}

async function eliminarPelicula(id_ingresado){
    // return getPeliculas(true)
    //     .then( async peliculas => {

    //         const peliculasActualizadas = peliculas.map( pelicula =>  {
    //             if( pelicula.id == id ) {
    //                 return {
    //                     ...pelicula,
    //                     eliminado: true
    //                 }
    //             }else{
    //                 return pelicula
    //             } 
    //         } )  

    //         await writeFile("./data/productos.json", JSON.stringify(peliculasActualizadas))
    //         return id
    //     } )
    await client.connect()
    await db.collection("Peliculas").deleteOne({ _id: ObjectId.createFromHexString(id_ingresado)})
    return id_ingresado
}
const modificarPelicula = async (id_ingresado, peliculaActualizada) => {
    await client.connect()
    await db.collection("Peliculas").replaceOne({ _id: ObjectId.createFromHexString(id_ingresado)}, peliculaActualizada)
    return peliculaActualizada
    // return getPeliculas(true)
    //     .then( async peliculas => {
    //         let peliculaActualiza = null
    //         const peliculasActualizadas = peliculas.map( pelicula => {
    //             if( pelicula.id == id ){
    //                 peliculaActualiza = {
    //                     id: id,
    //                     ...peliculaActualizada
    //                 }
    //                 return peliculaActualiza
    //             }else{
    //                 return pelicula
    //             }
    //         } )
    //         await writeFile("./data/productos.json", JSON.stringify(peliculasActualizadas))
    //         return peliculaActualiza
    //     } )
}

const actualizarPelicula = (id, peliculaActualizada) => {
    return getPeliculas(true)
        .then( async peliculas => {
            let peliculaActualiza = null
            const peliculasActualizadas = peliculas.map( pelicula => {
                if( pelicula.id == id ){
                    peliculaActualiza = {
                        id: id,
                        titulo: peliculaActualizada.titulo ? peliculaActualizada.titulo : pelicula.titulo,
                        tematica: peliculaActualizada.tematica ? peliculaActualizada.tematica : pelicula.tematica, 
                        fecha_estreno: peliculaActualizada.fecha_estreno ? peliculaActualizada.fecha_estreno : pelicula.fecha_estreno, 
                        puntuacion: peliculaActualizada.puntuacion ? peliculaActualizada.puntuacion : pelicula.puntuacion, 
                        categoria: peliculaActualizada.categoria ? peliculaActualizada.categoria : pelicula.categoria, 
                        descripcion: peliculaActualizada.descripcion ? peliculaActualizada.descripcion : pelicula.descripcion, 
                    }
                    return peliculaActualiza
                }else{
                    return pelicula
                }
            } )
            await writeFile("./data/productos.json", JSON.stringify(peliculasActualizadas))
            return peliculaActualiza
        } )
}

export {
    getPeliculaId,
    getPeliculas,
    agregarPelicula,
    eliminarPelicula,
    modificarPelicula,
    actualizarPelicula
}
