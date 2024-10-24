import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { crearToken } from "./token.service.js"
const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.ekoej.mongodb.net/")
const db = client.db("DWT4AV")
const usuarios = db.collection("usuarios")

export async function createUser(usuario){
    await client.connect()

    const existe = await usuarios.findOne({ email: usuario.email })

    if( existe ) throw new Error( "cuenta ya existe" )

    const nuevoUsuario = { ...usuario, passwordConfirm: undefined } //Hago una copia

    nuevoUsuario.password = await bcrypt.hash( usuario.password, 10 )

    await usuarios.insertOne(nuevoUsuario)

    return {...nuevoUsuario, password: undefined}
}

export async function login(usuario){
    await client.connect()

    const existe = await usuarios.findOne({ email: usuario.email })
    console.log("existe")
    if( !existe ) throw new Error( "No se pudo loguear" )

    const esValido = await bcrypt.compare( usuario.password, existe.password )
    console.log("esValido")

    if( !esValido ) throw new Error( "No se pudo loguear" )

    const token = await crearToken(existe)
    
    return { ...existe, token: token, password: undefined, passwordConfirm: undefined }
}

