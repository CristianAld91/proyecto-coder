// Selecciona todos los productos del index
function obtenerProductos() {
    const productosDivs = document.querySelectorAll('.producto, .producto-menu');

    // Convierte los productos en array
    return Array.from(productosDivs).map(producto => {
        return {
            nombre: producto.querySelector('.title-menu').textContent.trim(),
            imagen: producto.querySelector('img').src,
            descripcion: producto.querySelector('p').textContent.trim(),
            precio: parseFloat(producto.querySelector('.precio span').textContent.replace('$', '')).toFixed(3)
        };
    });
}

// Los muestra en local storage
let productosArray = obtenerProductos();
console.log(productosArray);

// Función para agregar evento en el boton click y sweetalert
function clickEnBoton() {
    const comprar = document.querySelectorAll('.icono-compra');

    // Evento click
    comprar.forEach(botonComprar => {

        botonComprar.addEventListener('click', function () {
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
