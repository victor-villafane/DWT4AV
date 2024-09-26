import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017")
const db = client.db("PeliculasDB")

async function getPeliculas(eliminardos = false){
    await client.connect()
    return db.collection("peliculas").find( { "eliminado": { "$ne": !eliminardos } } ).toArray()
}

async function getPeliculaId(id_ingresado){
    await client.connect()
    console.log("id recibido", id_ingresado)
    const datos = await db.collection("peliculas").findOne( { _id: ObjectId.createFromHexString(id_ingresado) } )  
    return datos 
}

async function agregarPelicula(pelicula){
    console.log(pelicula)
    await client.connect()
    await db.collection("peliculas").insertOne(pelicula)
    return pelicula
}

async function eliminarPelicula(id_ingresado){
    await client.connect()
    await db.collection("peliculas").updateOne({ _id: ObjectId.createFromHexString(id_ingresado)}, { $set: {
        eliminado: true
    } })
    return id_ingresado
}
const modificarPelicula = async (id_ingresado, peliculaActualizada) => {
    await client.connect()
    await db.collection("peliculas").replaceOne({ _id: ObjectId.createFromHexString(id_ingresado)}, peliculaActualizada)
    return peliculaActualizada
}

const actualizarPelicula = async (id, peliculaActualizada) => {
    await client.connect()
    const peliculaNueva = await db.collection("peliculas").updateOne({_id: ObjectId.createFromHexString(id)}, { $set: peliculaActualizada })
    return peliculaNueva
}

export {
    getPeliculaId,
    getPeliculas,
    agregarPelicula,
    eliminarPelicula,
    modificarPelicula,
    actualizarPelicula
}
