export function crearListadoPeliculas(peliculas){
    let html = ""
    html += "<a href='/peliculas/nuevo' >Agregar pelicula</a>"
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
    html+="<th>Eliminar</th>"

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
            html+=`<td> <a href='/peliculas/modificar/${producto.id}' >Modificar</a> </td>`
            html+=`<td> <a href='/peliculas/eliminar/${producto.id}' >Eliminar</a> </td>`
            html+="</tr>"
        })
    }

    html+="</tr>"
    return html
}
export function crearPagina(titulo, contenido){
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

export function crearDetallePelicula(pelicula){
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

export function nuevaPelicula(){
    let html = "<h1>Agregar Nueva Pelicula</h1>"
    html += "<form action='/peliculas/nuevo' method='post'>"
    html += "<label for='titulo'>Titulo</label>"
    html += "<input type='text' name='titulo' required>"
    html += "<br>"
    html += "<label for='tematica'>Tematica</label>"
    html += "<input type='text' name='tematica' required>"
    html += "<br>"
    html += "<label for='fecha_estreno'>Fecha de estreno</label>"
    html += "<input type='date' name='fecha_estreno' required>"
    html += "<br>"
    html += "<label for='puntuacion'>Puntuacion</label>"
    html += "<input type='number' name='puntuacion' required>"
    html += "<br>"
    html += "<label for='categoria'>Categoria</label>"
    html += "<input type='text' name='categoria' required>"
    html += "<br>"
    html += "<label for='descripcion'>Descripcion</label>"
    html += "<input type='text' name='descripcion' required>"
    html += "<br>"
    html += "<button type='submit' >Agregar</button>"
    html += "</form>"
    return html
}

export function modificarForm(pelicula){
    let html = "<h1>Agregar Nueva Pelicula</h1>"
    html += `<form action='/peliculas/modificar/${pelicula.id}' method='post'>`
    html += "<label for='titulo'>Titulo</label>"
    html += `<input type='text' name='titulo' value="${pelicula.titulo}" required>`
    html += "<br>"
    html += "<label for='tematica'>Tematica</label>"
    html += `<input type='text' name='tematica' value="${pelicula.tematica}" required>`
    html += "<br>"
    html += "<label for='fecha_estreno'>Fecha de estreno</label>"
    html += `<input type='date' name='fecha_estreno' value="${pelicula.fecha_estreno}" required>`
    html += "<br>"
    html += "<label for='puntuacion'>Puntuacion</label>"
    html += `<input type='number' name='puntuacion' value="${pelicula.puntuacion}" required> `
    html += "<br>"
    html += "<label for='categoria'>Categoria</label>"
    html += `<input type='text' name='categoria' value="${pelicula.categoria}" required>`
    html += "<br>"
    html += "<label for='descripcion'>Descripcion</label>"
    html += `<input type='text' name='descripcion' value="${pelicula.descripcion}" required>`
    html += "<br>"
    html += "<button type='submit' >Agregar</button>"
    html += "</form>"
    return html    
}