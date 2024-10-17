import yup from 'yup'

export const movieSchema = yup.object({
    rank: yup.number().required(),
    id: yup.string().required(),
    name: yup.string().required(),
    year: yup.number().required().min(1800, "El año como minimo debe ser 1800").max(2030, "El año como maximo puede ser 2030"),
    imbd_votes: yup.number(),
    imdb_rating: yup.number(),
    certificate: yup.string(), 
    duration: yup.number(),
    genre: yup.string(),
    cast_id: yup.string(),
    cast_name: yup.string(),
    director_id: yup.string(),
    director_name: yup.string(),
    writter_name: yup.string(),
    writter_id: yup.string(), 
    img_link: yup.string().url()
})