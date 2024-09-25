import { MongoClient } from "mongodb"

const cliente = new MongoClient('mongodb://localhost:27017')

cliente.connect()
    .then( async () => {
        console.log("Me Conecte!")
        const db = cliente.db("Cine")
        const datos = await db.collection("Peliculas").find().toArray()
        const promociones = await db.collection("Promociones").find().toArray()

        console.log(datos)
    } )
    .catch( () => console.log("No me pude conectar") )
