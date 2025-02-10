/*Para esta entrega pense en comenzar con algo basico utilizando lo visto en clase y ademas de algunos conocimientos que tengo en js. Trabajare principalmente en el carrito agregando alertas al hacer click en el icono de compra.
Despues agregue una funcion que obtiene los datos de los productos y los convierte en array y mediante el uso del console.log se visualizan en la consola.
El local storage servira de base de datos para el guardado de producto y usuarios que luego daran sentido a la logica actual.
Mas avanzado el proyecto pensaba utilizar JSON para desarrollar los articulos y reemplazar los actuales divs.

*/
/*
para esta entrega ya esta agreagdo el json y ademas otrsa funciones que le dan ms funcionalidad a la pagina agregando los productos al carrito*/
let productosDestacados = [];
let productosInfantil = [];
let productosMenu = [];
let bebidas = [];
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

fetch('../js/productos.json') //archivo JSON
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

}

function mostrarProductos(productos, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos productos

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        const imageVistas = window.location.pathname.includes('menu.html') ? `../${producto.imagen}` : `./${producto.imagen}`;
        productoDiv.innerHTML = `
            <div class="icono-compra" data-id="${producto.id}">
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
        container.appendChild(productoDiv);
    });

}

// Añadir producto al carrito
function agregarAlCarrito(id) {
    const producto = productosDestacados.concat(productosInfantil, productosMenu, bebidas).find(p => p.id == id);
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    clickEnBoton(); 
}
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id == id);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}


//funcion de alert revisar
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

// Función para vaciar el carrito
function vaciarCarrito() {
    // Vaciar el arreglo del carrito
    carrito.length = 0; // Esto vacía el arreglo del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el localStorage

    // Actualizar la vista del carrito
    mostrarCarrito();
}



// Mostrar productos en carrito.html
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    if (!carritoDiv) return;
    carritoDiv.innerHTML = '';

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        const imageVistas = window.location.pathname.includes('index.html') ? `./${producto.imagen}` : `../${producto.imagen}`;
        productoDiv.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${imageVistas}" alt="${producto.nombre}">
            <div class="precio">
                <span>$${producto.precio.toLocaleString('es-CL')}</span>
            </div>
            <div class="button-menu">
                <button class="boton-comprar">Comprar</button>
                <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar">Eliminar</button>
            </div>
        `;
        carritoDiv.appendChild(productoDiv);
    });
}

//vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
//mostrar carrito
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('carrito.html')) {
        mostrarCarrito();
        clickEnBoton();
        
    } else {
        cargarProductos(); 
        clickEnBoton();
    }
});
