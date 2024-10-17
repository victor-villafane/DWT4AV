import { movieSchema } from "../schemas/movie.validate.js"

export function validateMovie(req, res, next){
    movieSchema.validate(req.body)
        .then( () => next() )
        .catch( error => res.status(400).json({ message: error.message }) )
}