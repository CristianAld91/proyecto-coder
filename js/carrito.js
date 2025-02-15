/*Para esta entrega pense en comenzar con algo basico utilizando lo visto en clase y ademas de algunos conocimientos que tengo en js. Trabajare principalmente en el carrito agregando alertas al hacer click en el icono de compra.
Despues agregue una funcion que obtiene los datos de los productos y los convierte en array y mediante el uso del console.log se visualizan en la consola.
El local storage servira de base de datos para el guardado de producto y usuarios que luego daran sentido a la logica actual.
Mas avanzado el proyecto pensaba utilizar JSON para desarrollar los articulos y reemplazar los actuales divs.

*/

//para esta entrega ya esta agregado el json y ademas otras funciones que le dan mas funcionalidad a la pagina agregando los productos al carrito...
let productosDestacados = [];
let productosInfantil = [];
let productosMenu = [];
let bebidas = [];
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// Determina la ruta del archivo JSON segun la pagina actual
let jsonPath = './js/productos.json'; // por defecto

if (window.location.pathname.includes('menu.html')) {
    jsonPath = '../js/productos.json'; // Si estas en menu.html, usa esta ruta
} else if (window.location.pathname.includes('index.html')) {
    jsonPath = './js/productos.json'; // Si estas en index.html, usa esta ruta
}

fetch(jsonPath) //archivo JSON
    .then(response => response.json())
    .then(data => {
        productosDestacados = data.productosDestacados;
        productosInfantil = data.productosInfantil;
        productosMenu = data.productosMenu;
        bebidas = data.bebidas;

        cargarProductos();
    });

function cargarProductos() {
    mostrarProductos(productosDestacados, 'productos-lista');
    mostrarProductos(productosInfantil, 'productos-infantil');
    mostrarProductos(productosMenu, 'producto-menu');
    mostrarProductos(bebidas, 'producto-menu-bebidas');
    clickEnBoton();

}// esta funcion se encargada de cargar desde json los productos, primero hice varias funciones de mostrar producto y busque esta forma que creo quedo el codigo mas legible

function mostrarProductos(productos, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Limpia el contenedor antes de añadir nuevos productos

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        //const imageVistas = window.location.pathname.includes('menu.html') ? `./${producto.imagen}` : `../${producto.imagen}`;// operador ternario(error al cargar las imagenes, forma resumida)
        const imagenCarga = producto.imagen;
        productoDiv.innerHTML = `
            <div class="icono-compra" data-id="${producto.id}">
                <i class="fas fa-shopping-cart"></i>
            </div>
            <h2 class="title-menu">${producto.nombre}</h2>
            <img src="${imagenCarga}" alt="${producto.nombre}" onerror="this.onerror=null; this.src='img/default.png';">
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
        container.appendChild(productoDiv);
    });

}// en esta funcion se cargan los productos en pantalla

// Añadir producto al carrito
function agregarAlCarrito(id) {
    const producto = productosDestacados.concat(productosInfantil, productosMenu, bebidas).find(p => p.id == id);
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));// esta funcion agrega al carrito y al final llama a la funcion mostrarcarrito y ademas a la funcion click para que se vea en pantalla el alert
    mostrarCarrito();
    clickEnBoton(); 
}

function eliminarDelCarrito(id) { //agregue en esta funcion el uso de sweet alert para que al precionar el boton aparezca el msj de si desea borrar y confirmar
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esto eliminará el artículo del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = carrito.findIndex(p => p.id == id);
            if (index !== -1) {
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el localStorage
                mostrarCarrito(); // Actualiza la vista del carrito

                Swal.fire(
                    '¡Eliminado!',
                    'El artículo ha sido eliminado del carrito.',
                    'success'
                );
            }
        }
    });
}



//funcion de alert revisar(corregida)
function clickEnBoton() {
    const comprar = document.querySelectorAll('.icono-compra');
    comprar.forEach(botonComprar => {
        botonComprar.addEventListener('click', function () {
            const productoId = this.getAttribute('data-id');
            agregarAlCarrito(productoId);
            
            // Mensaje de SweetAlert
            Swal.fire({
                title: '¡Éxito!',
                text: 'Producto Agregado al carrito!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            
        });
    });
    
}

// Funcion para vaciar el carrito
function vaciarCarrito() {
    // Usar SweetAlert para confirmar la acción
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esto eliminará todos los artículos del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma se borra el carrito
            carrito.length = 0;
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el localStorage

            // Actualizar la vista del carrito
            mostrarCarrito();


            Swal.fire(
                '¡Vacío!',
                'Tu carrito ha sido vaciado.',
                'success'
            );
        }
    });
}

//muestra en el carrito las card y ademas con un acumulador el total de la compra hasta el momento(agregue acumulador para la suma de precio)
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito'); //div de card
    const totalDiv = document.getElementById('mostrar-resultado'); //div de resultado
    if (!carritoDiv || !totalDiv) return;
    carritoDiv.innerHTML = ''; // Limpiar el carrito
    let total = 0; //total inicia en 0

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        //const imageVistas = window.location.pathname.includes('menu.html') ? `../${producto.imagen}` : `./${producto.imagen}`;
        productoDiv.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.descripcion}</p>
            <div class="precio">
                <span>$${producto.precio.toLocaleString('es-CL')}</span>
            </div>
            <div class="button-compras">
                <button class="boton-comprar">
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        carritoDiv.appendChild(productoDiv);

        // acumulador
        total += producto.precio;
    });

    // muestra la suma trayendo solo precio.producto
    totalDiv.innerHTML = `Total de la compra: $${total.toLocaleString('es-CL')}`;
}


//vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
//mostrar carrito
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('carrito.html')) {
        mostrarCarrito();// este if/else es para corregir un error de carga que tenia al momento de mostar en pantalla
        clickEnBoton();
        
    } else {
        cargarProductos(); 
        clickEnBoton();
    }
});
