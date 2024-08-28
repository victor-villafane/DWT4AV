import express from "express"
import path from "path"
const app = express()
// let contador = 0

app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )

app.get("/",(request, response)=>{
    //response.send("Hoola desde express")
    console.log("Ruta: " + path.resolve("public/index.html") )
    response.sendFile(path.resolve("public/index.html"))
})
app.get("/saludo", (req, res) => {
    console.log(req.query.mensaje);
} )
app.post("/saludo", (req, res)=> {
    console.log(req.body)
})
// app.get("/contador",(request, response)=>{
//     response.send(`<h1>${contador++}</h1>`)
// })
app.listen(2024, () => console.log("Servidor funcionando"))