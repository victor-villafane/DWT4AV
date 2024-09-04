function crearListadoPeliculas(peliculas){
    let html = ""
    html+="<h1>Peliculas</h1>"
    html+="<table>"
    html+="<tr>"
    html+="<th>ID</th>"
    html+="<th>titulo</th>"
    html+="<th>tematica</th>"
    html+="<th>fecha_estreno</th>"
    html+="<th>puntuacion</th>"
    html+="<th>categoria</th>"
    html+="<th>descripcion</th>"
    html+="<th>ver mas</th>"
    html+="</tr>"
    html+="<tr>"
    if( peliculas.length === 0 ){
        html+="<td colspan='7'>No hay peliculas</td>"
    }else{
        peliculas.forEach(producto => {
            html+="<tr>"
            html+="<td>" + producto.id + "</td>"
            html+="<td>" + producto.titulo + "</td>"
            html+="<td>" + producto.tematica + "</td>"
            html+="<td>" + producto.fecha_estreno + "</td>"
            html+="<td>" + producto.puntuacion + "</td>"
            html+="<td>" + producto.categoria + "</td>"
            html+="<td>" + producto.descripcion + "</td>"
            html+=`<td> <a href='/peliculas/${producto.id}' >ver</a> </td>`
            html+="</tr>"
        })
    }

    html+="</tr>"
    return html
}
function crearPagina(titulo, contenido){
    let html = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${titulo}</title>
        </head>
        <body>
            ${contenido}
        </body>
    </html>
    `
    return html
}

function crearDetallePelicula(pelicula){
    let html = ""
    html+="<h1>Pelicula</h1>"
    html+="<table>"
    html+="<tr>"
    html+="<th>ID</th>"
    html+="<th>titulo</th>"
    html+="<th>tematica</th>"
    html+="<th>fecha_estreno</th>"
    html+="<th>puntuacion</th>"
    html+="<th>categoria</th>"
    html+="<th>descripcion</th>"
    html+="</tr>"
    html+="<tr>"
    html+="<tr>"
    html+="<td>" + pelicula.id + "</td>"
    html+="<td>" + pelicula.titulo + "</td>"
    html+="<td>" + pelicula.tematica + "</td>"
    html+="<td>" + pelicula.fecha_estreno + "</td>"
    html+="<td>" + pelicula.puntuacion + "</td>"
    html+="<td>" + pelicula.categoria + "</td>"
    html+="<td>" + pelicula.descripcion + "</td>"
    html+= "<td>" + "<img src="+ pelicula.portada + ">" + "</td>"
    html+="</tr>"    
    html+="</tr>"
    html+="<a href='/peliculas' >atras</a>"
    return html    
}

export default {
    crearPagina,
    crearListadoPeliculas,
    crearDetallePelicula
}
export {
    crearPagina,
    crearListadoPeliculas,
    crearDetallePelicula
}