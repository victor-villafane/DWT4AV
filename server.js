import express from "express"
import peliculasRoute from "./routes/peliculas.routes.js"
const app = express()
// let contador = 0

// app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )

app.use(peliculasRoute)

app.listen(2025, () => console.log("Servidor funcionando"))