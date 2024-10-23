import { movieSchema } from "../schemas/movie.validate.js"

export async function validateMovie(req, res, next){
    try {
        const datoValidados = await movieSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datoValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
        // .then( () => next() )
        // .catch( error => res.status(400).json({ message: error.errors }) )
}