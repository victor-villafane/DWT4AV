import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.ekoej.mongodb.net/")
const db = client.db("DWT4AV")

async function getPeliculas(filtros = {}){
    const filterMongo = { eliminado: { $ne: true } }
    if(filtros.tematica !== undefined){
        filterMongo.tematica = {$eq : filtros.tematica}
    }
    if( filtros.puntuacionMayorQue !== undefined || filtros.puntuacionMenorQue !== undefined ){
        filterMongo.$and = [ {puntuacion: { $gt: parseInt(filtros.puntuacionMayorQue) }}, { puntuacion: { $lt: parseInt(filtros.puntuacionMenorQue) } } ]
    }
    if( filtros.descripcion !== undefined ){
        filterMongo.$text = { $search: filtros.descripcion }
    }
    await client.connect()
    return db.collection("Movies").find( filterMongo ).toArray()
}

async function getPeliculaId(id_ingresado){
    await client.connect()
    console.log("id recibido", id_ingresado)
    const datos = await db.collection("Movies").findOne( { _id: ObjectId.createFromHexString(id_ingresado) } )  
    return datos 
}

async function agregarPelicula(pelicula){

    // const nuevaPelicula = {
    //     rank: pelicula.rank,
    //     id: pelicula.id,
    //     name: pelicula.name,
    //     year: pelicula.year,
    //     imbd_votes: pelicula.imbd_votes,
    //     imdb_rating: pelicula.imdb_rating,
    //     certificate: pelicula.certificate, 
    //     duration: pelicula.duration,
    //     genre: pelicula.genre,
    //     cast_id: pelicula.cast_id,
    //     cast_name: pelicula.cast_name,
    //     director_id: pelicula.director_id,
    //     director_name: pelicula.director_name,
    //     writter_name: pelicula.writter_name,
    //     writter_id: pelicula.writter_id, 
    //     img_link: pelicula.img_link
    // }

    await client.connect()
    await db.collection("Movies").insertOne(pelicula)
    return pelicula
}

async function eliminarPelicula(id_ingresado){
    await client.connect()
    await db.collection("Movies").updateOne({ _id: ObjectId.createFromHexString(id_ingresado)}, { $set: {
        eliminado: true
    } })
    return id_ingresado
}
const modificarPelicula = async (id_ingresado, peliculaActualizada) => {
    await client.connect()
    await db.collection("Movies").replaceOne({ _id: ObjectId.createFromHexString(id_ingresado)}, peliculaActualizada)
    return peliculaActualizada
}

const actualizarPelicula = async (id, peliculaActualizada) => {
    await client.connect()
    const peliculaNueva = await db.collection("Movies").updateOne({_id: ObjectId.createFromHexString(id)}, { $set: peliculaActualizada })
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
