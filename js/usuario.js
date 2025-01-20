/*Formulario registro, estructura inicial del codigo que luego almacenara los datos en localstorage para ser utilizados en la pagina para realizar las compras en la pagina 
en esta seccion se utilizo sweet alert para cada alerta*/
const usuariosRegistrados = [];

// Registro
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    usuariosRegistrados.push({email, password });

    Swal.fire('¡Registro Exitoso!', 'Te has registrado correctamente.', 'success');
    this.reset();
});

// Inicio de Sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const usuario = usuariosRegistrados.find(user => user.email === loginEmail && user.password === loginPassword);

    if (usuario) {
        Swal.fire('¡Éxito!', 'Has iniciado sesión correctamente.', 'success');
    } else {
        Swal.fire('Atención', 'Debes registrarte primero para iniciar sesión.', 'warning');
    }

    this.reset();
});