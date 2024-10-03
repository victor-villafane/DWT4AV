import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.ekoej.mongodb.net/")
const db = client.db("DWT4AV")

export async function getActoresPelicula(idPelicula){
    await client.connect()
    const pelicula = await db.collection("Peliculas").findOne( { _id: ObjectId.createFromHexString(idPelicula) } )
    console.log(pelicula.actores)
    return pelicula.actores
}

// export async function agregarActoresPelicula(idPelicula, actores){
//     await client.connect()
//     const pelicula = await db.collection("Peliculas").findOne( { _id: ObjectId.createFromHexString(idPelicula) } )
//     if( pelicula.actores === undefined ){
//         pelicula.actores = []
//     }    
//     pelicula.actores.push(...actores)

//     const resultado = await db.collection("Peliculas").replaceOne({ _id: ObjectId.createFromHexString(idPelicula)}, pelicula)

//     return resultado.modifiedCount > 0 ? "Actores agregados" : "No se agregaron actores"
// } 
export async function agregarActoresPelicula(idPelicula, actores){
    await client.connect()
    const resultado = await db.collection("Peliculas").updateOne(
        { _id: ObjectId.createFromHexString(idPelicula) },
        { $push: {actores: { $each: actores }} }
    )
    return resultado.modifiedCount > 0 ? "Actores agregados" : "No se agregaron actores"
} 