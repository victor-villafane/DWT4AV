import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.ekoej.mongodb.net/")
const db = client.db("DWT4AV")

export async function getCines(){
    await client.connect()
    return db.collection("Cines").find().toArray()
}

export async function getCineId(id){
    await client.connect()
    const cine = await db.collection("Cines").findOne({ _id: ObjectId.createFromHexString(id) })
    return cine
}

export async function agregarCine(cine){
    await client.connect()
    await db.collection("Cines").insertOne(cine)
    return cine
}

export async function agregarPeliculaCine( idCine, idPelicula ){
    await client.connect()
    const pelicula = await db.collection("Peliculas").findOne({ _id: ObjectId.createFromHexString(idPelicula) })
    const resultado = await db.collection("Cines").updateOne(
        { _id: ObjectId.createFromHexString(idCine) },
        { $push: { peliculas: pelicula } }
    )
    return resultado.modifiedCount > 0 ? "Pelicula agregada" : "No se agregó la pelicula"
}