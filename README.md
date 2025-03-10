# README - Función `pagarCompra`
### Elementos Clave

- **Título de la pagina**:El rey de la hamburguesa.
- **Descripción**: Eccomerce de venta de hamburguesas .
- **Desarrollado**: Cristian Alderete.
- **Comisión**: 75040: .
- **Matería**: JavaScript flex.

## Introducción

La función `pagarCompra`(simula una compra) es un componente esencial de una aplicación web de comercio electrónico que gestiona el proceso de pago. Esta función permite a los usuarios seleccionar un método de pago, confirmar su pedido y proporcionar los detalles de su tarjeta de crédito de manera interactiva y segura. Utiliza la biblioteca **SweetAlert** para mostrar diálogos atractivos que mejoran la experiencia del usuario.

## Objetivo

El objetivo de esta función es simplificar y asegurar el proceso de compra, garantizando que los usuarios completen todos los pasos necesarios antes de realizar un pago. Esto incluye la validación de datos y la visualización de mensajes de confirmación y error.

## Flujo de Trabajo

### 1. Obtención de Datos del Usuario

La función comienza obteniendo los datos ingresados por el usuario en un formulario, que incluye:

- Método de pago
- Nombre completo
- Dirección de entrega
- Descripción del pedido
- Correo electrónico

### 2. Validación del Método de Pago

Se verifica si el usuario ha seleccionado un método de pago. Si no lo ha hecho, se muestra un mensaje de error utilizando SweetAlert, pidiendo al usuario que seleccione un método.

### 3. Confirmación del Pedido

Si se ha seleccionado un método de pago, se presenta un cuadro de diálogo de confirmación que muestra un resumen de la información ingresada, incluyendo el total de la compra. El usuario debe confirmar que desea proceder con el pago.

### 4. Ingreso de Datos de la Tarjeta

Al confirmar el pedido, se solicita al usuario que ingrese los detalles de su tarjeta de crédito:

- Nombre del titular de la tarjeta
- Número de tarjeta
- Fecha de vencimiento
- Código de seguridad

### 5. Validación de Datos de la Tarjeta

Antes de procesar el pago, se valida que todos los campos de la tarjeta estén completos. Si falta algún dato, se muestra un mensaje de error.

### 6. Procesamiento del Pago

La función simula el procesamiento del pago. Se muestra una barra de progreso que indica al usuario que su pago está siendo procesado. Esto se hace utilizando un intervalo que actualiza el ancho de la barra en tiempo real.

### 7. Mensaje de Éxito

Una vez que se completa el procesamiento, se muestra un mensaje de éxito agradeciendo al usuario por su compra. Este mensaje también proporciona información sobre el estado del pago.