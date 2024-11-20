import express from "express"
import peliculasRoute from "./routes/peliculas.routes.js"
import apiPeliculas from "./api/routes/peliculas.routes.js"
import apiActores from "./api/routes/actores.routes.js"
import apiCines from "./api/routes/cines.routes.js"
import apiUsuario from "./api/routes/usuarios.routes.js"
import cors from "cors"
import { Server as SocketIO } from "socket.io"
import http from "http"
import multer from "multer"
import sharp from "sharp"

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
})
const users = {}
io.on("connection", (socket) => {
    /**------------------ */
    console.log("Cliente conectado")
    io.emit("respuesta", "Conectado al servidor")

    socket.on("disconnect", () => {
        console.log("Cliente desconectado")
    })

    socket.on("chat mensaje", (mensaje) => {
        console.log(mensaje)
        io.emit("chat mensaje", "ECHO: " + mensaje)
    })
    /**------------------ */
    socket.on("nuevo usuario", (username) => {
        users[username] = socket.id;
        socket.broadcast.emit('user connected', username);
        socket.username = username; // Guardamos el nombre de usuario en el socket para uso posterior
        console.log(`${username} se ha conectado.`);
    })

    socket.on('chat message', ({ message, to }) => {
        if (users[to]) {
            socket.to(users[to]).emit('chat message', { message, from: socket.username });
        } else {
            // Si quieres, puedes emitir un mensaje al mismo usuario indicando que el destinatario no está disponible
            socket.emit('chat message', { message: 'Usuario no disponible', from: 'Servidor' });
        }
    });
})

// let contador = 0

// app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

const corsOptions = {
    origin: "http://localhost:5173",    // Permite solicites solo desde esta URL
    methods: "GET,POST,PUT,DELETE",      // Metodos permitidos
}

app.use( cors(corsOptions) )

app.use("/api",apiPeliculas)
app.use("/api", apiActores)
app.use("/api", apiCines)
app.use("/api", apiUsuario)
app.use(peliculasRoute)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb( null, "./uploads" )
    },
    filename: function(req, file, cb){
        cb( null, file.originalname.trim().replace(/\s/g, "_") )
    }
})

const fileFilter = (req, file, cb) => {
    if( file.mimetype === "application/x-zip-compressed" ){
        cb(null, true)
    }else{
        cb( new Error("Solo se permiten archivos zip", false) )
    }
}

async function resizeImage(req, res, next){
    return sharp(req.file.path)
        .resize(1500)
        .webp()
        .rotate(90)
        .greyscale()
        .toFile( "uploads/" + ( new Date().getTime() ) + ".webp" )
        .then( () => {
            console.log("Imagen redimencionada")
            next()
        } )
        .catch( err => res.status(500).json({ "error": err }) )
    }

const upload = multer(
    { 
        "storage": storage, 
        // "fileFilter": fileFilter 
    })

app.post( "/upload",[upload.single("file"), resizeImage], (req, res) => {
    console.log(req.file)
    res.status(200).json( {} )
} )

// app.listen(2025, () => console.log("Servidor funcionando"))
server.listen(2025, () => console.log("Servidor funcionando"))

/**
 * 1. URL -> URI
 * La URL no hace referencia a la locacion, sino que identifica un recurso
 * 
 *  /productos
 *  /peliculas
 *  /usuarios
 *  /usuarios/perfil
 * 
 *  /usuarios/nuevo           X     NO!
 * 
 * 2. La accion se define con los verbos http
 * 
 *      GET -> Obtener un recurso
 *      POST -> CREAR UN RECURSO
 *      PUT -> REEMPLAZAR UN RECURSO
 *      PATCH -> ACTUALIZAR
 *      DELETE -> ELIMINAR
 * 
 * 3. Los datos de los recursos son transportados utilizando el formato JSON o xml
 * 
 * 4. Los estados de las peticiones son definidas con http status code
 * 
 * 1xx -> informacion de estado de servio
 * 2xx -> OK
 * 3xx -> redireccion
 * 4xx -> errores del usuario
 * 5xx -> errores del servidor
 */