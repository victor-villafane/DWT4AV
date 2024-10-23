import { usuarioSchema, loginSchema } from "../schemas/usuario.validate.js"

export async function validateUser(req, res, next){
    try {
        const datoValidados = await usuarioSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datoValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}

export async function login( req, res, next ){
    try {
        const datosValidados = await loginSchema.validate( req.body, { abortEarly: false, stripUnknown: true })
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json( { message: error.errors } )
    }
}