document.addEventListener('DOMContentLoaded',function(){

mostrarPropiedades();
});

function mostrarPropiedades() {

    const respuesta = fetch('/Proyecto-Practicas-main/backend/propiedades/mostrarPropiedades.php')
    
    //parsea la respuesta del query del archivo de php 

    .then(respuesta => respuesta.text())
    .then(resTexto => {                                        
    let jsonTexto = JSON.parse(resTexto);


    
    const {htmlapi} = jsonTexto 
        document.getElementById('mostrarPropiedades').innerHTML = htmlapi
        .map (item => 

            `<li>
                
    <table border="1" cellpadding="5" cellspacing="0">
        <tr>
            <td>id_propiedad</td><td>${item.id_propiedad}</td>
            <td>calle</td><td>${item.calle}</td>
            <td>altura</td><td>${item.altura}</td>
        </tr>
        <tr>
            <td>precio</td><td>${item.precio}</td>
            <td>estado</td><td>${item.estado}</td>
            <td>tipo</td><td>${item.tipo}</td>
        </tr>
        <tr>
            <td>ambientes</td><td>${item.ambientes}</td>
            <td>garaje</td><td>${item.garaje}</td>
            <td>baños</td><td>${item.baños}</td>
        </tr>
        <tr>
            <td style="width: 120px;">descripcion</td>
            <td colspan="5" style="width: 400px;">${item.descripcion}</td>
        </tr>
        <tr>
            <td style="width: 120px;">fecha_publicacion</td>
            <td colspan="5" style="width: 250px;">${item.fecha_publicacion}</td>
        </tr>
        <tr>
            <td>id_ciudad</td><td>${item.id_ciudad}</td>
        </tr>
    </table>
    <br>

                    </li>`
            
        )
        

    })        
} 

