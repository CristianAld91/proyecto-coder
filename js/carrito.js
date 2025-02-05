/*Para esta entrega pense en comenzar con algo basico utilizando lo visto en clase y ademas de algunos conocimientos que tengo en js. Trabajare principalmente en el carrito agregando alertas al hacer click en el icono de compra.
Despues agregue una funcion que obtiene los datos de los productos y los convierte en array y mediante el uso del console.log se visualizan en la consola.
El local storage servira de base de datos para el guardado de producto y usuarios que luego daran sentido a la logica actual.
Mas avanzado el proyecto pensaba utilizar JSON para desarrollar los articulos y reemplazar los actuales divs.

*/

const productosLista = document.getElementById('productos-lista'); // crea la constante productosLista para luego mostrar en pantalla los datos del archivo JSON
fetch('../js/productos.json') //archivo JSON
    .then(response => response.json()) 
    .then(data => {
        data.productosDestacados.forEach(producto => { // llama solo a los productos destacados
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            const imageVistas = window.location.pathname.includes('menu.html') ? `../${producto.imagen}` : `./${producto.imagen}`;// cree una constante para que la imagen se vea en las dos paginas
            const clickBotonMenu = window.location.pathname.includes('menu.html') ? `../${producto.id}` : `./${producto.id}`;
            productoDiv.innerHTML = `
                <div class="icono-compra" data-id="${clickBotonMenu}">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2 class="title-menu">${producto.nombre}</h2>
                <img src="${imageVistas}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <div class="precio">
                    <span>$${producto.precio.toLocaleString('es-CL')}</span>
                </div>
                <div class="calificacion">
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                </div>
            `;

            productosLista.appendChild(productoDiv);
        });
        
        clickEnBoton();
    });

const productoInfantil = document.getElementById('productos-infantil'); //repeti la funcion para que sirva con otro producto guardado en json
fetch('../js/productos.json')
.then(response => response.json())
.then(data=> {
    data.productosInfantil.forEach(producto =>{
        const productoDivInfantil = document.createElement('div');
        productoDivInfantil.classList.add('producto');

        productoDivInfantil.innerHTML = `
                <div class="icono-compra" data-id="${producto.id}">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2 class="title-menu">${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <div class="precio">
                    <span>$${producto.precio.toLocaleString('es-CL')}</span>
                </div>
                <div class="calificacion">
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                    <span class="estrella">&#9733;</span>
                </div>
            `;

            productoInfantil.appendChild(productoDivInfantil);
        });
        clickEnBoton();
    });
    

// Selecciona todos los productos del index
function obtenerProductos() {
    const productosDivs = document.querySelectorAll('.producto');

    // Convierte los productos en array
    return Array.from(productosDivs).map(producto => {
        return {
            nombre: producto.querySelector('.title-menu').textContent.trim(),
            imagen: producto.querySelector('img').src,
            descripcion: producto.querySelector('p').textContent.trim(),
            precio: parseInt(producto.querySelector('.precio span').textContent.replace('$', '')).toFixed(3)//agrega decimales
        };
        
    });
}


// Los muestra en la consola
let productosArray = obtenerProductos();
console.log(productosArray);

let contadorClick = 0;//incializa en 0 para que cada vez que se haga click se guenden en array 
let clickArray = [];//guarda los clicks

// Función para agregar evento en el boton click y sweetalert
function clickEnBoton() {
    const comprar = document.querySelectorAll('.icono-compra');

    // Evento click
    comprar.forEach(botonComprar => {

        botonComprar.addEventListener('click', function () {
            // Incrementa el contador
            contadorClick++;

            clickArray.push(contadorClick);
            // Muestra el contador en consola
            console.log('Numero de clics: ', clickArray);
            //mensaje de sweetalert
            Swal.fire({
                title: '¡Éxito!',
                text: 'Producto Agregado al carrito!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        });
    });

}

// Llama a la funcion
document.addEventListener('DOMContentLoaded', function () {
    clickEnBoton();
});
